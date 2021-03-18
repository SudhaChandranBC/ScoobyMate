//
//  OwnerProfileScreen.js
//  ScoobyMate
//
//  Created by Chandran, Sudha | SDTD.
//  Copyright © 2018 Sudha Chandran BC All rights reserved.
//

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  ImageBackground,
  Dimensions,
  Alert,
  Modal,
  ActivityIndicator,
  Platform
} from "react-native";
import {
  Button,
  Text,
  Icon
} from 'native-base'
import IconI from 'react-native-vector-icons/Ionicons';
import IconE from 'react-native-vector-icons/Entypo';
import IconM from 'react-native-vector-icons/MaterialIcons';

import PhotoUpload from 'react-native-photo-upload'
import API, {baseURL} from "../APIs/API"
import Helpers from "../APIs/Helpers"


const SCREEN_WIDTH = Dimensions.get('window').width;

class OwnerProfileScreen extends Component {
    
  static navigationOptions = ({
    navigation
  }) => ({
    title: 'Owner\'s Profile',
  })
  
  constructor(props, context) {
    super(props, context);
    this.state = {
      userId: null,
      name: '',
      phone: '',
      address: '',
      city: '',
      profilePic: null,
      error: null,
      loading: false,
      ownerInfo: null,
      profilePicSource: null,
      lat: null,
      lan: null
    }
  }

  componentWillMount() {
    if (Helpers.isLoggedIn) {
      this.setState({ loading: true })
      this.getOwnerInfo()
    }
  }

  getOwnerInfo() {
    let self = this;
    var params = {
      "user_id": Helpers.loggedInUserId
    }

    API.getOwnerProfile(params).then(function (response) {
      self.setState({ ownerInfo: response })
      self.setState({ loading: false })
    })
      .catch(function (error) {
        Alert.alert('error')
        self.setState({ loading: false })
        return null
      });
  }


  isValid() {
    const {
      name,
      phone,
      address,
      city
    } = this.state;
    let valid = false;
  
    if (name.length === 0) {
      this.setState({
        error: 'You must enter name'
      });
    } else if (phone.length === 0) {
      this.setState({
        error: 'You must enter phone number'
      });
    } else if (address.length === 0) {
      this.setState({
        error: 'You must enter address'
      });
    } else if (city.length === 0) {
      this.setState({
        error: 'Please enter city'
      });
    } else {
      if (phone.length < 10) {
        this.setState({
          error: 'Not a valid phone number'
        });
      }
      else {
        this.setState({
          error: ''
        });
        valid = true
      }
    }
    return valid;
  }

  
  saveOwnerInfo = () => {
    let self = this;
    const {
      name,
      phone,
      address,
      city,
      profilePicSource,
      lat,
      lan
    } = this.state;

    const ownerData = new FormData()
    if (profilePicSource) {
      ownerData.append('profile_pic', {
        uri: profilePicSource,
        name: 'ProfilePicture.jpg',
        type: 'image/jpeg'
      })
    }
    ownerData.append('user_id', Helpers.loggedInUserId)
    ownerData.append('user_name', name)
    ownerData.append('user_phone', phone)
    ownerData.append('street', address)
    ownerData.append('suite', '')
    ownerData.append('city', city)
    ownerData.append('zipcode', '')
    ownerData.append('lat', 0)
    ownerData.append('lng', 0)

    if (this.isValid()) {
      API.updateOwnerProfile(ownerData).then(function (result) {
        console.log(result)
        if (result.code == 200) {
          Alert.alert('Successfully updated!', result.msg, [{
            text: 'OK', onPress: () => {
              Helpers.hasUserDetails = true
              if (!Helpers.hasDogDetails) {
                self.props.navigation.navigate('DogMandate')
              } else {
                self.props.navigation.navigate('PetProfile', {
                  isEditing: true,
                })
              }
            }
          }])
        } else {
          Alert.alert('Owner Info update failed!')
          return null
        }
      }).catch(function (error) {
        Alert.alert('Owner Info update failed!')
        return null
      })
    }
    
    //DEMO
    // this.props.navigation.navigate('PetProfile', {
    //   isEditing: true
    // })
  }
  
  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.setState({ lat: position.coords.latitude });
        this.setState({ lan: position.coords.longitude  });
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  renderContactHeader = () => {
    const {
      ownerInfo,
    } = this.state;

    return (
      <View style={styles.coverContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={require('../assets/OwnerCover.jpg')}
        >
          <View style={styles.headerColumn}>
            <Image
              style={styles.userImage}
              source={ownerInfo.profile_pic ? { uri: baseURL + '/' + ownerInfo.profile_pic } : require('../assets/defaultProfilePic.jpg')}
            />
            <Text style={styles.coverName}>{ownerInfo.user_name}</Text>
          </View>
        </ImageBackground>
      </View>
    )
  }

  renderDescription = () => {
    const {
      ownerInfo,
    } = this.state;
    return (
      <View style={styles.detailBlock}>
        <IconE name={'location'} size={30} color="#4298E3"></IconE>
          <Text style={styles.priceText}>{ownerInfo.user_name}</Text>
          <Text style={styles.descriptionText}>{ownerInfo.street}</Text>
          <Text style={styles.descriptionText}>{ownerInfo.city}</Text> 
      </View>
    )
  }

  renderDetail = () => {
    const {
      ownerInfo,
    } = this.state;
    return (
      <View>
        <IconI name={'ios-mail'} size={25} color="#4298E3">
          <Text style={styles.detailText}>   {ownerInfo.user_email}</Text>
        </IconI>
        <IconI name={'ios-call'} size={25} color="#4298E3">
          <Text style={styles.detailText}>   {ownerInfo.user_phone}</Text>
        </IconI>
        <IconM name={'pets'} size={25} color="#4298E3">
          <Text style={styles.detailText}>  {ownerInfo.pet_name}</Text>
        </IconM>
      </View>
    )
  }
      
  render() {
    const {
      ownerInfo,
      loading
    } = this.state;

    if (loading) {
      return (
        <Modal
          transparent={true}
          animationType={'none'}
          visible={loading}
          onRequestClose={() => { }}>
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator
                animating={loading} />
            </View>
          </View>
        </Modal>
      )
    }

    if (Helpers.hasUserDetails) {
      if (ownerInfo) {
        return (
          <ScrollView style={styles.scroll}>
            <View style={[styles.container, { paddingTop: 0 }]}>
              <View style={styles.cardContainer}>
                {this.renderContactHeader()}
                <View style={styles.productRow}>{this.renderDescription()}</View>
                <View style={styles.productRow}>{this.renderDetail()}</View>
              </View>
            </View>
          </ScrollView>
        )
      }
      return (
        <View style={styles.empty}>
          <View style={styles.errorBox}>
            <Text style={styles.errorMessage}>No records found!</Text>
          </View>
        </View>
      )
    }

    return (
      <KeyboardAvoidingView behaviour='padding' style={Helpers.isRegistered ? styles.containerModal : styles.container } >
        <ScrollView keyboardShouldPersistTaps='never' >
          <View style={styles.logoContainer}>
            <PhotoUpload onResponse={response => { this.setState({ profilePicSource: response.uri }) }}>
              <Image source={require('../assets/defaultProfilePic.jpg')} style={styles.profileImage} />
            </PhotoUpload>
          </View>
          <View style={styles.formContainer}>
          <Text style={styles.error}>{Helpers.isRegistered ? this.state.error : 'Please Add Owner Info!!'}</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              autoCapitalize="none"
              returnKeyType='next'
              autoCorrect={false}
              ref={input => this.nameInput = input}
              onSubmitEditing={() => this.phoneInput.focus()}
              onChangeText={(name) => this.setState({ name })}
              underlineColorAndroid="#fff"
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              autoCapitalize="none"
              returnKeyType='next'
              keyboardType='number-pad'
              blurOnSubmit={true}
              autoCorrect={false}
              ref={input => this.phoneInput = input}
              onSubmitEditing={() => this.AddressInput.focus()}
              onChangeText={(phone) => this.setState({ phone })}
              containerStyle={{ marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)' }}
              underlineColorAndroid="#fff"
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              autoCapitalize="none"
              returnKeyType='next'
              blurOnSubmit={true}
              autoCorrect={false}
              ref={input => this.AddressInput = input}
              onSubmitEditing={() => this.cityInput.focus()}
              onChangeText={(address) => this.setState({ address })}
              containerStyle={{ marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)' }}
              underlineColorAndroid="#fff"
            />
            <TextInput
              style={styles.input}
              placeholder="City"
              autoCapitalize="none"
              returnKeyType='done'
              blurOnSubmit={true}
              autoCorrect={false}
              ref={input => this.cityInput = input}
              onChangeText={(city) => this.setState({ city })}
              containerStyle={{ marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)' }}
              underlineColorAndroid="#fff"
            />
          </View>
          {/* <Button bordered primary onPress={this.findCoordinates} style={{ margin: 30, alignSelf: 'center' }}>
            <Text>Select Location</Text>
          </Button> */}
          <Button bordered primary onPress={this.saveOwnerInfo} style={{ margin: 30, alignSelf: 'center' }}>
            <Text>SAVE</Text>
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

export default OwnerProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 20
  },
  containerModal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 60
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  productRow: {
    margin: 25,
  },
  detailBlock: {
    margin: 0,
  },
  detailText: {
    marginBottom: 4,
    color: '#434647',
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: 0.5,
    textAlignVertical: 'center'
  },
  subDetailText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '100',
    lineHeight: 28,
    letterSpacing: 0.5,
  },
  input: {
    width: SCREEN_WIDTH - 80,
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 1,
    margin: 10,
    textAlign: 'left',
    fontSize: 15
  },
  inputDD: {
    width: SCREEN_WIDTH - 70,
    height: 40,
    margin: 10,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  inputPlaceholder: {
    color: 'lightgrey',
    textAlign: 'left',
    fontSize: 15,
  },
  inputPlaceholderValue: {
    color: 'black',
    textAlign: 'left',
    fontSize: 15,
  },
  tabContainer: {
    flex: 1,
    marginBottom: 12,
    marginTop: -45,
    position: 'relative',
    zIndex: 10,
    backgroundColor: 'transparent',
    marginBottom: 30,
    marginLeft: 140,
    marginRight: 15,
  },
  ddText: {
    textAlign: 'left',
    fontSize: 15,
    marginLeft: -15
  },
  formContainer: {
    alignItems: 'center',
  },
  error: {
    alignItems: 'center',
    margin: 10,
    color: 'red',
  },
  coverBio: {
    color: 'black',
    fontSize: 15,
    fontWeight: '600',
  },
  coverContainer: {
    marginBottom: 55,
    position: 'relative',
  },
  coverImage: {
    height: Dimensions.get('window').width * (3 / 4),
    width: Dimensions.get('window').width,
  },
  coverMetaContainer: {
    backgroundColor: 'transparent',
    paddingBottom: 10,
    paddingLeft: 135,
  },
  coverName: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    paddingBottom: 2,
  },
  coverTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  coverTitleContainer: {
    backgroundColor: 'transparent',
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 45,
  },
  headerContainer: {
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  profileImage: {
    borderColor: '#FFF',
    borderRadius: 55,
    borderWidth: 3,
    height: 110,
    width: 110,
  },
  profileImageContainer: {
    bottom: 0,
    left: 10,
    position: 'absolute',
  },
  scroll: {
    backgroundColor: '#FFF',
  },
  descriptionText: {
    marginBottom: 4,
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: 1,
  },
  productRow: {
    paddingTop: -50,
    margin: 25,
  },
  priceText: {
    marginBottom: 5,
    letterSpacing: 1,
    color: 'black',
    fontSize: 30,
    fontWeight: '400',
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    height: 100,
    width: 100,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  empty: {
    backgroundColor: 'white',
    height: Helpers.SCREEN_HEIGHT,
    alignItems: 'center',

  },
  errorBox: {
    backgroundColor: '#FCC8C4',
    height: 40,
    alignSelf: 'center',
    alignItems: 'center',
    marginTop: 30,
    width: Helpers.SCREEN_WIDTH - 40,
    borderRadius: 10,
  },
  errorMessage: {
    flex: 1,
    margin: 10,
    color: '#F9200E',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 15,
  },
  headerBackgroundImage: {
    paddingBottom: 0,
    paddingTop: 35,
    height: Dimensions.get('window').width * (3 / 4),
    width: Dimensions.get('window').width,
  },
  headerColumn: {
    backgroundColor: 'transparent',
    ...Platform.select({
      ios: {
        alignItems: 'center',
        elevation: 1,
        marginTop: -1,
      },
      android: {
        alignItems: 'center',
      },
    }),
  },
  userImage: {
    borderColor: 'white',
    borderRadius: 85,
    borderWidth: 3,
    height: 170,
    marginBottom: 15,
    width: 170,
  },
  userNameText: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 8,
    textAlign: 'center',
  },
  userAddressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
})