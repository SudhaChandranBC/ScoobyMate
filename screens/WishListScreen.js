//
//  WishListScreen.js
//  ScoobyMate
//
//  Created by Chandran, Sudha | SDTD.
//  Copyright © 2018 Sudha Chandran BC All rights reserved.
//

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  ActivityIndicator,
  FlatList,
  Dimensions
} from "react-native";
import { Text, Card, CardItem, Left, Body } from 'native-base';
import API, { baseURL } from "../APIs/API";
import Helpers from "../APIs/Helpers";
const SCREEN_WIDTH = Dimensions.get('window').width;


export default class WishListScreen extends Component {
  static navigationOptions = ({ navigation }) => ({

  });
  
  constructor(props) {
    super(props);

    this.state = {
      dogs: [],
      loading: false,
      error: '',
    };
  }

  componentWillMount() {
    this.setState({ loading: true })
    this.getWishListedDogs()
  }

  getWishListedDogs() {
    let self = this;
    API.getWishList({ user_id: Helpers.loggedInUserId }).then(function (response) {
      self.setState({ dogs: response })
      self.setState({ loading: false })
    })
      .catch(function (error) {
        Alert.alert(error.message)
        self.setState({ error: error.message })
        self.setState({ loading: false })
      }); 
  }

  onItemPressed = (item) => {
    console.log(item)
    this.props.navigation.navigate('PetProfile', {
      detailInfo: item,
    })
  }
  extractItemKey = (item) => `${item.dog_id}`;
    
  renderItem = ({ item }) => (
    <TouchableOpacity
      delayPressIn={70}
      activeOpacity={0.8}
      onPress={() => { this.onItemPressed(item) }}>
      <Card>
        <CardItem>
          <Left>
            <Body>
              <Text>{item.pet_name}</Text>
              <Text note>{item.pet_breed} | {item.birth_date} | {item.gender}</Text>
            </Body>
          </Left>
        </CardItem>     
        <CardItem cardBody>
          <Body>
          <Image
            source={item.pet_image ? { uri: baseURL + '/' + item.pet_image } : require('../assets/defaultCover.png')} style={styles.dogProfileImage} />
          </Body>
        </CardItem>
      </Card>
    </TouchableOpacity>
  ) 

  render() {
    const {
      dogs,
      loading,
      error,
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
              <ActivityIndicator
                animating={loading} />
            </View>
          </View>
        </Modal>
      )
    }
    console.log(dogs.length)
    if (dogs.length > 0) {
      return (
        <FlatList
          data={dogs}
          renderItem={this.renderItem}
          keyExtractor={this.extractItemKey}
          style={styles.container}
        />
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  buttons: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40
  },
  buttonSmall: {
    width: 50,
    height: 50,
    borderWidth: 10,
    borderColor: '#e7e7e7',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25
  },
  card: {
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: '#e3e3e3',
    width: 350,
    height: 420,
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
  dogProfileImage: {
    resizeMode: 'contain',
    height: 200,
    width: SCREEN_WIDTH - 65,
    margin: 15,
    alignItems: 'center',
  },
})
  