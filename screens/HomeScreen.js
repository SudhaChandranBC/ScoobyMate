//
//  HomeScreen.js
//  ScoobyMate
//
//  Created by Chandran, Sudha | SDTD.
//  Copyright © 2018 Sudha Chandran BC All rights reserved.
//

import React, { Component } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
  Modal,
  ActivityIndicator
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import { Text, Card, CardItem, Thumbnail, Left, Body } from 'native-base';
import API, { baseURL } from "../APIs/API"
import Helpers from "../APIs/Helpers";

const SCREEN_WIDTH = Dimensions.get('window').width;
const moment = require('moment');

export default class HomeScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      dogs: [],
      loading: false,
      error: '',
    }
  }

  componentWillMount() {
    if (Helpers.ownersPet) {
      this.setState({ loading: true })
      this.getDogsList()
    }
  }
  
  getDogsList() {
    let self = this;
    
    API.getMatchedPets({ dog_id: Helpers.ownersPet.dog_id, user_id: Helpers.loggedInUserId }).then(function (response) {
      self.setState({ dogs: response })
      self.setState({ loading: false })
    })
      .catch(function (error) {
        Alert.alert(error.message)
        self.setState({ error: error.message })
        self.setState({ loading: false })
      });
  }

  wishlistDog(item) {
    var params = {
      user_id: Helpers.loggedInUserId,
      dog_id: item.dog_id
    }
    if (item.wished == 1) {
      API.disLikePet(params)
    } else {
      API.likePet(params)
    }
    this.setState({ loading: true })
    this.setState({ dogs: [] })
    this.getDogsList()
  }

  extractItemKey = (item) => `${item.dog_id}`;
  
  onItemPressed = (item) => {
    this.props.navigation.navigate('PetProfile', {
      detailInfo: item,
    })
  }

  Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  generateRandomNum() {
    const min = 1;
    const max = 5;
    const rand = Math.round(min + Math.random() * (max - min));
    return rand
  }

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
              <Text note>{item.pet_breed} | {moment().diff(moment(item.birth_date, "DD-MM-YYYY"), 'years')} Year | {this.Capitalize(item.gender)}</Text>
              <Text note>{this.generateRandomNum()} kms </Text>
            </Body>
            <TouchableOpacity style={styles.buttons} onPress={() => this.wishlistDog(item)}>
              <Icon name={item.wished === 1 ? 'heart' : 'heart-o'} size={30} color="red" />
            </TouchableOpacity>
          </Left>
        </CardItem>
              
        <CardItem cardBody>
          <Body>
            <Image
              source={item.pet_image ? { uri: baseURL + '/' + item.pet_image } : require('../assets/defaultCover.png')} style={styles.dogProfileImage} />
            <Text style={styles.aboutMe}>{item.my_desc}</Text>
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
    backgroundColor: 'white',
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
  container: {
    backgroundColor: 'white',
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  card: {
    marginVertical: 8,
  },
  footer: {
    paddingTop: 16,
  },
  time: {
    marginTop: 5,
  },
  aboutMe: {
    flex: 1,
    margin: 15,
    color: 'black',
    textAlign: 'left',
    fontSize: 15,
    paddingTop: -15
  },
  dogProfileImage: {
    resizeMode: 'contain',
    height: 200,
    width: SCREEN_WIDTH - 65,
    margin: 15,
    alignItems: 'center',
  },
})

