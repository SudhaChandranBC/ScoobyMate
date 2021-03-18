//
//  PetProfileScreen.js
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
  ScrollView,
  ImageBackground,
  Dimensions,
  Alert,
  Modal,
  ActivityIndicator,
  TouchableOpacity,
  Platform
} from "react-native";
import PhotoUpload from 'react-native-photo-upload'
import { Item, Picker, Icon, Button, Text,} from 'native-base'
import { DatePicker } from 'react-native-woodpicker'
import API, { baseURL } from "../APIs/API";
import Helpers from "../APIs/Helpers";
import { RkTextInput, RkButton, RkAvoidKeyboard } from 'react-native-ui-kitten';
import IconI from 'react-native-vector-icons/Ionicons';
import IconE from 'react-native-vector-icons/EvilIcons';
import IconM from 'react-native-vector-icons/MaterialCommunityIcons';

const SCREEN_WIDTH = Dimensions.get('window').width;
const moment = require('moment');

var Breed ={
  "1": "Labrador Retriever",
  "2": "German Shepherd",
  "3": "Golden Retriever",
  "4": "Beagle",
  "5": "Bulldog",
}
var Gender ={
  "1": "Male",
  "2": "Female",
}

class PetProfileScreen extends Component {
  static navigationOptions = ({
    navigation
  }) => ({
    title: 'Dog\'s Profile',
  });

  constructor(props, context) {
    super(props, context);
    const {
      navigation
    } = this.props;
    const isEdit = navigation.getParam('isEditing', false);
    const detailData = navigation.getParam('detailInfo', false);

    this.state = {
      isEditing: isEdit,
      name: '',
      dob: null,
      gender: null,
      isDetailView: false,
      certificate: '',
      breed: null,
      petInfo: undefined,
      loading: false,
      detailInfo: detailData,
      profilePicSource: null,
      aboutMe: ''
    };
  }

  componentWillMount() {
    if (Helpers.isLoggedIn) {
      const {
        detailInfo
      } = this.state;
      if (detailInfo) {
        this.setState({ petInfo: detailInfo })
      } else {
        this.setState({ loading: true })
        this.getPetInfo()
      }
    }
  }

  getPetInfo() {
    let self = this;

    if (Helpers.ownersPet) {
      this.setState({ petInfo: Helpers.ownersPet })
      this.setState({ loading: false })
    } else {
      API.getOwnersPetProfile({ user_id: Helpers.loggedInUserId })
        .then(function (response) {
          self.setState({ petInfo: response })
          self.setState({ loading: false })
        })
        .catch(function (error) {
          Alert.alert('error')
          self.setState({ loading: false })
          return null
        });
    }
  }
  
  setBreed(value) {
    this.setState({
      breed: value
    });
  }

  setDOB = date => {
    this.setState({
      dob: moment(date).format('DD-MM-YYYY')
    });
  };

  setGender(value) {
    this.setState({
      gender: value
    });
  };

  setAboutMe(value) {
    this.setState({
      aboutMe: value
    });
  };

  isValid() {
    const {
      name,
      breed,
      dob,
      gender,
      aboutMe
    } = this.state;
    let valid = false;

    if (name.length === 0) {
      this.setState({
        error: 'Please enter name'
      });
    } else if (dob === null) {
      this.setState({
        error: 'Please enter Date Of Birth'
      });
    } else if (gender === null) {
      this.setState({
        error: 'Please select Gender'
      });
    } else if (breed === null) {
      this.setState({
        error: 'Please select Breed'
      });
    } else if (aboutMe === null) {
      this.setState({
        error: 'Please enter about dog'
      });
    } else {
      this.setState({
        error: ''
      });
      valid = true
    }

    return valid;
  }

  savePetInfo = () => {
    const {
      name,
      breed,
      dob,
      gender,
      profilePicSource,
      aboutMe
    } = this.state;
    let self = this;

    const petData = new FormData()
    if (profilePicSource) {
      petData.append('pet_image', {
        uri: profilePicSource,
        name: 'ProfilePicture.jpg',
        type: 'image/jpeg'
      })
    }
    petData.append('user_id', Helpers.loggedInUserId)
    petData.append('pet_name', name)
    petData.append('birth_date', dob ? dob : '')
    petData.append('pet_breed', breed ? Breed[breed] : '')
    petData.append('gender', gender ? Gender[gender].toLowerCase() : '')
    petData.append('my_desc', aboutMe)

    if (this.isValid()) {
      API.addDogProfile(petData).then(function (result) {
        if (result.code == 200) {
          API.getOwnersPetProfile({ user_id: Helpers.loggedInUserId }).then(function (response) {
            Alert.alert('Successfully Added!', 'Dog added!', [{
              text: 'OK', onPress: () => { self.props.navigation.navigate('UploadCertificate') }
            }])
          })
        } else {
          Alert.alert('Dog Info update failed!')
          return null
        }
      }).catch(function (error) {
        Alert.alert('Dog Info update failed!')
        return null
      })
    }

    //DEMO
    // Alert.alert('Success!', 'Dog added!', [{
    //   text: 'OK', onPress: () => { this.props.navigation.navigate('UploadCertificate') }
    // }])
  }

  renderContactHeader = () => {
    const {
      petInfo,
    } = this.state;
    return (
      <View style={styles.coverContainer}>
        <ImageBackground
          style={styles.headerBackgroundImage}
          blurRadius={10}
          source={require('../assets/DogCover.jpg')}
        >
          <View style={styles.headerColumn}>
          <Image source={petInfo.pet_image ? { uri: baseURL + '/' + petInfo.pet_image } : require('../assets/defaultProfilePic.jpg')} style={styles.userImage} />
            <Text style={styles.coverName}>{petInfo.pet_name}</Text>
            <View style={styles.userAddressRow}>
              <View style={styles.userCityRow}>
                <Text style={styles.userCityText}>
                {petInfo.pet_breed} |  {moment().diff(moment(petInfo.birth_date, "DD-MM-YYYY"), 'years')} Year | {petInfo.gender}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>

      
    )
  }

  renderDescription = () => {
    const {
      petInfo,
    } = this.state;
    return (
      <View>
        <IconI name={'ios-contact'} size={25} color="#4298E3">
          <Text style={styles.detailText}>  {petInfo.user_name}</Text>
        </IconI>
        <IconE name={'location'} size={25} color="#4298E3">
          <Text style={styles.detailText}> Distance: 3 kms</Text>
        </IconE>
        <IconI name={'ios-information-circle-outline'} size={25} color="#4298E3">
          <Text style={styles.detailText}>{petInfo.my_desc}</Text>
        </IconI>
      </View>
    )
  }

  renderDetail = () => {
    const { navigation } = this.props;
    const itemId = navigation.getParam('name', 'def');
    return (
      <View>
        {/* <Text style={styles.detailText}>Owner Name: Hello</Text>
        <Text style={styles.detailText}>Distance: 5 km</Text>
        <Text style={styles.detailText}>About Me: {petInfo.my_desc}</Text> */}
                {/* <Text style={styles.subDetailText}>{itemId}</Text> */}
      </View>
    )
  }

  render() {
    const {
      petInfo,
      loading
    } = this.state;
    if (loading) {
      return (
        <Modal
          transparent={true}
          animationType={'none'}
          visible={loading}
          onRequestClose={() => { console.log('close modal') }}>
          <View style={styles.modalBackground}>
            <View style={styles.activityIndicatorWrapper}>
              <ActivityIndicator animating={loading} />
            </View>
          </View>
        </Modal>
      )
    }

    if (Helpers.hasDogDetails) {
      if (this.state.petInfo) {
        return (
          <ScrollView style={styles.scroll}>
            <View style={[styles.container, { paddingTop: 0 }]}>
              <View style={styles.cardContainer}>
                {this.renderContactHeader()}
                <View style={styles.buttons}>
                  <RkButton style={styles.button} rkType='outline rounded'>SHARE</RkButton>
                  <RkButton style={styles.button} rkType='outline rounded' onPress={() => this.props.navigation.navigate('Message')}>MESSAGE</RkButton>
                </View>
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
      <RkAvoidKeyboard style={Helpers.isRegistered ? styles.container : styles.containerModal}>
          <ScrollView keyboardShouldPersistTaps='never' >
            <View style={styles.logoContainer}>
              <PhotoUpload onResponse={response => { this.setState({ profilePicSource: response.uri }) }}>
                <Image source={require('../assets/defaultProfilePic.jpg')} style={styles.profileImage} />
              </PhotoUpload>
            </View>
            <View style={styles.formContainer}>
              <Text style={styles.error}>{Helpers.isRegistered ? this.state.error : 'Please Add Dog Info!!'}</Text>
              <TextInput
                style={styles.input}
                placeholder="Name"
                autoCapitalize="none"
                returnKeyType='next'
                autoCorrect={false}
                ref={input => this.nameInput = input}
                onChangeText={(name) => this.setState({ name })}
                underlineColorAndroid="#fff"
              />
              <DatePicker
                onDateChange={this.setDOB}
                value={this.state.dob}
                placeholderStyle={this.state.dob ? styles.inputPlaceholderValue : styles.inputPlaceholder}
                style={styles.input}
                placeholder={this.state.dob ? this.state.dob : 'Date Of Birth'}
              />
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={styles.inputDD}
                  textStyle={styles.ddText}
                  placeholder="Breed"
                  placeholderStyle={styles.inputPlaceholder}
                  selectedValue={this.state.breed}
                  onValueChange={this.setBreed.bind(this)}>
                  {Object.keys(Breed).map((key) => {
                    return (<Picker.Item label={Breed[key]} value={key} key={key} />)
                  })}
                </Picker>
              </Item>
            
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="ios-arrow-down-outline" />}
                  style={styles.inputDD}
                  textStyle={styles.ddText}
                  placeholder="Gender"
                  placeholderStyle={styles.inputPlaceholder}
                  selectedValue={this.state.gender}
                  onValueChange={this.setGender.bind(this)}>
                  {Object.keys(Gender).map((key) => {
                    return (<Picker.Item label={Gender[key]} value={key} key={key} />)
                  })}
                </Picker>
              </Item>
              <View style={[styles.content]}>
                <RkTextInput
                  rkType='topLabel'
                  style={styles.inputTextBox}
                  multiline={true}
                  numberOfLines={4}
                  placeholder="About Me"
                  returnKeyType='done'
                  onChangeText={(aboutMe) => this.setState({ aboutMe })}
                  inputStyle={{ height: 80 }} />
              </View>
              <Button bordered primary onPress={this.savePetInfo} style={{ margin: 30, alignSelf: 'center' }}>
                <Text>SAVE</Text>
              </Button>
            </View>
          </ScrollView>
      </RkAvoidKeyboard>
    );
  }
}
export default PetProfileScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 20
  },
  userAddressRow: {
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
    alignContent: 'center'
  },
  userCityRow: {
    backgroundColor: 'transparent',
    alignItems: 'center'
  },
  userCityText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
    textAlign: 'center',
    alignSelf: 'center'
  },
  containerModal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 100
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: SCREEN_WIDTH - 75,
    height: 60,
    borderColor: '#e5e5e5',
    borderBottomWidth: 1,
    margin: 10,
    textAlign: 'left',
    fontSize: 15
  },
  inputDD: {
    width: SCREEN_WIDTH - 90,
    height: 50,
    margin: 10,
  },
  inputTextBox: {
    width: SCREEN_WIDTH - 75,
    borderColor: '#e5e5e5',
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
  ddPlaceholder: {
    marginLeft: -15
  },
  tabContainer: {
    flex: 1,
    marginBottom: 12,
    marginTop: -45,
    position: 'relative',
    zIndex: 10,
    backgroundColor: 'transparent',
    marginBottom: 30,
    marginLeft: 130,
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
  headerBackgroundImage: {
    paddingBottom: 0,
    paddingTop: 35,
    height: Dimensions.get('window').width * (3 / 4),
    width: Dimensions.get('window').width,
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
    margin: 25,
  },
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  detailText: {
    marginBottom: 4,
    color: '#434647',
    fontSize: 18,
    fontWeight: '400',
    letterSpacing: 0.5,
    textAlignVertical: 'center',
    margin:10,
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
  buttons: {
    flexDirection: 'row',
    paddingVertical: 0,
  },
  button: {
    flex: 1,
    alignSelf: 'center',
  },
})

