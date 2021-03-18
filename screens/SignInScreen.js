//
//  SignInScreen.js
//  ScoobyMate
//
//  Created by Chandran, Sudha | SDTD.
//  Copyright © 2018 Sudha Chandran BC All rights reserved.
//

import React, { Component } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  Image,
  Alert,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView
} from "react-native";
import { Button, Text } from 'native-base'
import API from "../APIs/API";
import Helpers from "../APIs/Helpers";

const SCREEN_WIDTH = Dimensions.get('window').width;

class SignInScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Sign In',
  });

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: null,
    }
    
  }

  signInUser = async () => {
    //DEMO
    // const email = 'su@a.com'
    // const password = '11111111'
    const { email, password } = this.state;
    let self = this;
    var params = {
      "username": email,
      "password": password
    }

    if (this.isValid()) {
      API.logInUser(params).then((result) => {
        if (result.code == 200) {
          API.getOwnersPetProfile({ user_id: Helpers.loggedInUserId }).then(function (response) {
            if (!Helpers.hasUserDetails) {
              self.props.navigation.navigate('OwnerMandate')
          } else {
              if (!Helpers.hasDogDetails) {
                  self.props.navigation.navigate('DogMandate')
              } else {
                self.props.navigation.navigate('App')
              }
          }
          })
        } else {
          Alert.alert(
            'Login Failed!',
            'Invalid Email Id or Password',
          )
        }
      }).catch((error) => {
        Alert.alert(error.message)
      });
    }
  }

  signUpUser = () => {
    this.props.navigation.navigate('SignUp')
  }

  isValid() {
    const { email, password } = this.state;
    let valid = false;

    if (email.length > 0 && password.length > 0) {
      this.setState({
        error: ''
      });
      valid = true;
    }

    if (email.length === 0) {
      this.setState({ error: 'You must enter an email address' });
    } else if (password.length === 0) {
      this.setState({ error: 'You must enter a password' });
    }

    return valid;
  }

  render() {
    return (
      <ScrollView style={styles.root}>
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.logoContainer}>
            <Image resizeMode="contain" style={styles.logo} source={require('../assets/logo.png')} />
            <Text style={styles.speakerBio}>ScoobyMate</Text>
          </View>
          <View style={styles.formContainer}>
            <Text style={styles.error}>{this.state.error}</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              returnKeyType='next'
              autoCorrect={false}
              keyboardType='email-address'
              ref={input => this.emailInput = input}
              onSubmitEditing={() => this.passwordInput.focus()}
              onChangeText={(email) => this.setState({ email })}
              underlineColorAndroid="#fff"
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              autoCapitalize="none"
              returnKeyType='done'
              secureTextEntry={true}
              blurOnSubmit={true}
              autoCorrect={false}
              ref={input => this.passwordInput = input}
              onChangeText={(password) => this.setState({ password })}
              containerStyle={{ marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)' }}
              underlineColorAndroid="#fff"
            />

          </View>
          <Button bordered primary onPress={this.signInUser} style={{ margin: 30, alignSelf: 'center' }}>
            <Text>SIGN IN</Text>
          </Button>

          <Button transparent primary onPress={this.signUpUser} style={{ margin: 0, alignSelf: 'center' }}>
            <Text>CREATE ACCOUNT</Text>
          </Button>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

export default SignInScreen;

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'white',
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 125,
    height: 125,
    alignSelf: 'center',
    resizeMode: 'contain',
    marginVertical: 20
  },
  speakerBio: {
    color: '#4298E3',
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
    justifyContent: 'center',
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
  formContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  error: {
    alignItems: 'center',
    margin: 10,
    color: 'red',
  },
})
