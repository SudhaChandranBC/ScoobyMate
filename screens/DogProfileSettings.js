//
//  DogProfileSettings.js
//  ScoobyMate
//
//  Created by Chandran, Sudha | SDTD.
//  Copyright © 2018 Sudha Chandran BC All rights reserved.
//

import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  Image
} from 'react-native';
import {
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet,
  RkPicker
} from 'react-native-ui-kitten';
import Users from "../helpers/Users";
import _ from 'lodash';
import { Button, Text, Picker, Icon } from 'native-base';
import DatePicker from 'react-native-woodpicker/components/DatePicker';
import Helpers from '../APIs/Helpers';
import PhotoUpload from 'react-native-photo-upload';

var Gender ={
  "1": "Male",
  "2": "Female",
}

var Breed ={
  "1": "Labrador Retriever",
  "2": "German Shepherd",
  "3": "Golden Retriever",
  "4": "Beagle",
  "5": "Bulldog",
}

var Hearing ={
  "1": "+/+",
  "2": "+/-",
  "3": "-/+",
  "4": "-/-",
}

export class DogProfileSettings extends React.Component {
  static navigationOptions = {
    title: 'Dog Profile'.toUpperCase(),
  };

  getUser(id = 1) {
    return _.find(Users, x => x.id === id);
  }
  
  user = this.getUser();
  
  state = {
    name: this.user.firstName,
    gender: this.user.phone,
    breed: this.user.email,
    dob: this.user.city,
    profilePicSource: false,
    hearing: null,
    weight: null,
    aboutMe: '',
  };

  onGenderPickerConfirm = (gender) => {
    this.setState({ gender: gender });
  };

  onBreedPickerConfirm = (breed) => {
    this.setState({ breed: breed });
  };

  onDatePickerConfirm = (date) => {
    this.setState({ dob: date });
  };

  onHearingPickerConfirm = (hearing) => {
    this.setState({ hearing: hearing });
  };
  
  render = () => (
    <ScrollView style={styles.root}>
      <RkAvoidKeyboard
        style={styles.screen}
        onStartShouldSetResponder={() => true}
        onResponderRelease={() => Keyboard.dismiss()}>
        <View style={styles.header}>
          <PhotoUpload onResponse={response => { this.setState({ profilePicSource: response.uri }) }}>
            <Image source={require('../assets/defaultProfilePic.jpg')} style={styles.profileImage} />
          </PhotoUpload>
        </View>
        <View style={[styles.formContent]}>
          <View>
            <View style={[styles.content]}>
              <View style={[styles.textRow]}>
                <RkText rkType='subtitle'> </RkText>
              </View>
              <RkTextInput
                rkType='topLabel'
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                style={styles.input}
              />
            </View>
            <View style={[styles.content]}>
              <View style={[styles.textRow]}>
                <RkText rkType='subtitle'></RkText>
              </View>
              <Picker
                mode="dialog"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={styles.input}
                textStyle={styles.ddText}
                placeholder="Gender"
                selectedValue={this.state.gender}
                onValueChange={this.onGenderPickerConfirm.bind(this)}>
                {Object.keys(Gender).map((key) => {
                  return (<Picker.Item label={Gender[key]} value={key} key={key} />)
                })}
              </Picker>
            </View>
            <View style={[styles.content]}>
              <View style={[styles.textRow]}>
                <RkText rkType='subtitle'></RkText>
              </View>
              <Picker
                mode="dialog"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={styles.input}
                textStyle={styles.ddText}
                placeholder="Breed"
                selectedValue={this.state.breed}
                onValueChange={this.onBreedPickerConfirm.bind(this)}>
                {Object.keys(Breed).map((key) => {
                  return (<Picker.Item label={Breed[key]} value={key} key={key} />)
                })}
              </Picker>
            </View>
            <View style={[styles.content]}>
              <View style={[styles.textRow]}>
                <RkText rkType='subtitle'></RkText>
              </View>
              <DatePicker
                onDateChange={this.onDatePickerConfirm}
                value={this.state.dob}
                placeholderStyle={this.state.dob ? styles.inputPlaceholderValue : styles.inputPlaceholder}
                style={styles.datePicker}
                placeholder={this.state.dob ? this.state.dob.toDateString() : 'Date Of Birth'}
              />
            </View>
            <View style={[styles.content]}>
              <View style={[styles.textRow]}>
                <RkText rkType='subtitle'></RkText>
              </View>
              <Picker
                mode="dialog"
                iosIcon={<Icon name="ios-arrow-down-outline" />}
                style={styles.input}
                textStyle={styles.ddText}
                placeholder="+/+"
                selectedValue={this.state.hearing}
                onValueChange={this.onHearingPickerConfirm.bind(this)}>
                {Object.keys(Hearing).map((key) => {
                  return (<Picker.Item label={Hearing[key]} value={key} key={key} />)
                })}
              </Picker>
            </View>
            <View style={[styles.content]}>
              <View style={[styles.textRow]}>
                <RkText rkType='subtitle'></RkText>
              </View>
              <RkTextInput
                rkType='topLabel'
                placeholder="Weight"
                onChangeText={(weight) => this.setState({ weight })}
                value={this.state.weight}
                style={styles.input}
              />
            </View>
            <View style={[styles.content]}>
              <RkTextInput
                rkType='topLabel'
                style={styles.input}
                multiline={true}
                numberOfLines={4}
                placeholder="About Me"
                onChangeText={(aboutMe) => this.setState({ aboutMe })}
                inputStyle={{ height: 80 }}/>
            </View>
            <Button primary onPress={this.saveOwnerInfo} style={{ margin: 30, alignSelf: 'center' }}>
              <Text>   SAVE   </Text>
            </Button>
          </View>
        </View>
      </RkAvoidKeyboard>
    </ScrollView>
  );
}

const styles = RkStyleSheet.create(theme => ({
  screen: {
    padding: 15,
    flex: 1,
    backgroundColor: theme.colors.screen.base,
  },
  content: {
    marginTop: 10,
  },
  input: {
    width: Helpers.SCREEN_WIDTH - 40,
    borderColor: '#e5e5e5',
    borderBottomWidth: 1,
  },
  inputPlaceholder: {
    color: '#e5e5e5',
    textAlign: 'left',
    fontSize: 15,
    padding:15,
  },
  inputPlaceholderValue: {
    color: 'black',
    textAlign: 'left',
    fontSize: 15,
  },
  datePicker: {
    width: Helpers.SCREEN_WIDTH - 40,
    height: 50,
    borderColor: '#e5e5e5',
    borderBottomWidth: 1,
  },
  profileImage: {
    borderColor: '#FFF2',
    borderRadius: 55,
    borderWidth: 3,
    height: 110,
    width: 110,
    paddingTop: 20,
  },
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  header: {
    backgroundColor: theme.colors.screen.neutral,
    paddingVertical: 25,
  },
  formContent: {
    justifyContent: 'space-between',
    flexDirection: 'column',
    flex: 1,
  },
  textRow: {
    marginLeft: 20,
  },
  expireDateBlock: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  expireDateInput: {
    flex: 0.48,
    marginVertical: 10,
  },
  expireDateInnerInput: {
    textAlign: 'center',
  },
  expireDateDelimiter: {
    flex: 0.04,
  },
  balloon: {
    maxWidth: 250,
    padding: 15,
    borderRadius: 100,
    borderWidth: 0.5,
    borderColor: theme.colors.border.solid,
  },
}));