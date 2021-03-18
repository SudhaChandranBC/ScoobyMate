//
//  OwnerProfileSettings.js
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
  Image
} from 'react-native';
import {
  RkText,
  RkTextInput,
  RkAvoidKeyboard,
  RkTheme,
  RkStyleSheet,
} from 'react-native-ui-kitten';
import Users from "../helpers/Users";
import _ from 'lodash';
import { Button, Text } from 'native-base';
import PhotoUpload from 'react-native-photo-upload';


export class OwnerProfileSettings extends React.Component {
    static navigationOptions = {
        title: 'My Profile'.toUpperCase(),
    };

    getUser(id = 1) {
      return _.find(Users, x => x.id === id);
    }
  
  user = this.getUser();
  
  state = {
    userName: this.user.firstName,
    phone: this.user.phone,
    address: this.user.email,
    city: this.user.city,
    password: this.user.password,
    newPassword: this.user.newPassword,
    confirmPassword: this.user.confirmPassword,
    profilePicSource: null,
  };

  onFirstNameInputChanged = (text) => {
    this.setState({ firstName: text });
  };

  onAddressInputChanged = (text) => {
    this.setState({ address: text });
  };

  onPhoneInputChanged = (text) => {
    this.setState({ phone: text });
  };

  onCityInputChanged = (text) => {
    this.setState({ city: text });
  };

  render = () => (
    <ScrollView style={styles.root}>
      <RkAvoidKeyboard>
      <View style={styles.header}>
        <PhotoUpload onResponse={response => { this.setState({ profilePicSource: response.uri }) }}>
              <Image source={require('../assets/defaultProfilePic.jpg')} style={styles.profileImage} />
            </PhotoUpload>
        </View>
        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <RkText rkType='header6 primary'>INFO</RkText>
          </View>
          {/* <View style={styles.row}> */}
            <RkTextInput
              placeholder='Name'
              label='Name'
              value={this.state.userName}
              rkType='topLabel'
              onChangeText={this.onFirstNameInputChanged}
          />
          <RkTextInput
              label='Phone'
              value={this.state.phone}
              onChangeText={this.onPhoneInputChanged}
              rkType='topLabel'
            />
            <RkTextInput
              label='Address'
              value={this.state.address}
              onChangeText={this.onAddressInputChanged}
              rkType='topLabel'
          />
          <RkTextInput
              label='City'
              value={this.state.city}
              onChangeText={this.onCityInputChanged}
              rkType='topLabel'
            />
        </View>
        <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <RkText rkType='primary header6'>CHANGE PASSWORD</RkText>
          </View>
          <View style={styles.row}>
            <RkTextInput
              label='Old Password'
              value={this.state.password}
              rkType='right clear'
              secureTextEntry
              onChangeText={this.onPasswordInputChanged}
            />
          </View>
          <View style={styles.row}>
            <RkTextInput
              label='New Password'
              value={this.state.newPassword}
              rkType='right clear'
              secureTextEntry
              onChangeText={this.onNewPasswordInputChanged}
            />
          </View>
          <View style={styles.row}>
            <RkTextInput
              label='Confirm Password'
              value={this.state.confirmPassword}
              rkType='right clear'
              secureTextEntry
              onChangeText={this.onConfirmPasswordInputChanged}
            />
          </View>
        </View>
        {/* <View style={styles.section}>
          <View style={[styles.row, styles.heading]}>
            <RkText rkType='primary header6'>CONNECT YOUR ACCOUNT</RkText>
          </View> */}
          {/* <View style={styles.row}>
            <SocialSetting name='Twitter' icon={FontAwesome.twitter} tintColor={RkTheme.current.colors.twitter} />
          </View>
          <View style={styles.row}>
            <SocialSetting name='Google' icon={FontAwesome.google} tintColor={RkTheme.current.colors.google} />
          </View>
          <View style={styles.row}>
            <SocialSetting name='Facebook' icon={FontAwesome.facebook} tintColor={RkTheme.current.colors.facebook} />
          </View> */}
        {/* </View> */}
        {/* <Button rkType='large' style={styles.button} text='SAVE' /> */}
        <Button primary onPress={this.saveOwnerInfo} style={{ margin: 30, alignSelf: 'center' }}>
            <Text>   SAVE   </Text>
          </Button>
      </RkAvoidKeyboard>
    </ScrollView>
  );
}

const styles = RkStyleSheet.create(theme => ({
  profileImage: {
    borderColor: '#FFF',
    borderRadius: 55,
    borderWidth: 3,
    height: 110,
    width: 110,
  },
  root: {
    backgroundColor: theme.colors.screen.base,
  },
  header: {
    backgroundColor: theme.colors.screen.neutral,
    paddingVertical: 25,
  },
  header: {
    backgroundColor: theme.colors.screen.neutral,
    paddingVertical: 25,
  },
  section: {
    marginVertical: 25,
  },
  heading: {
    paddingBottom: 12.5,
  },
  row: {
    flexDirection: 'row',
    paddingHorizontal: 17.5,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.border.base,
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 16,
    marginBottom: 32,
  },
}));