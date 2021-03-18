//
//  SignUpScreen.js
//  ScoobyMate
//
//  Created by Chandran, Sudha | SDTD.
//  Copyright © 2018 Sudha Chandran BC All rights reserved.
//

import React, {
  Component
} from "react";
import {
  View,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Dimensions,
  Alert
} from "react-native";
import {
  Button,
  Text
} from 'native-base'
import API from "../APIs/API";
import Helpers from "../APIs/Helpers";

const SCREEN_WIDTH = Dimensions.get('window').width;

class SignUpScreen extends Component {
  static navigationOptions = ({
    navigation
  }) => ({
    title: 'Create Account',

  });

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      isLoading: false,
      error: null,
    };
  }

  signupUser = () => {
    const {
      email,
      password,
    } = this.state;
    this.setState({ isLoading: true });
    let self = this;
    var params = {
      "useremail": email,
      "password": password
    }

    if (this.isValid()) {
      API.registerUser(params).then((result) => {
        if (result.code == 200) {
          self.props.navigation.navigate('OwnerProfile')
        } else {
          Alert.alert(
            'Register Failed!',
            result.errMsg,
          )
        }
      }).catch((error) => {
        Alert.alert(error.message)
      });
    }

    //DEMO
    // const email = 'su@a.com'
    // const password = '11111111'
    // Helpers.loggedInUserId = 74
    // this.props.navigation.navigate('OwnerProfile')
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  isValid() {
    const {
      email,
      password,
      confirmPassword
    } = this.state;
    let valid = false;

    if (email.length === 0) {
      this.setState({
        error: 'You must enter an email address'
      });
    } else if (password.length === 0) {
      this.setState({
        error: 'You must enter a password'
      });
    } else if (confirmPassword.length === 0) {
      this.setState({
        error: 'Please confirm the password'
      });
    } else {
      if (!this.validateEmail(email)) {
        this.setState({
          error: 'Email not valid'
        });
      } else if (password.length < 8) {
        this.setState({
          error: 'Password must be 8 characters length'
        });
      }
      else if (password != confirmPassword) {
        this.setState({
          error: 'Passwords do not match'
        });
      } else {
        this.setState({
          error: ''
        });
        valid = true
      }
    }
    return valid;
  }

  render() {
    return (
      <KeyboardAvoidingView behaviour='padding' style={styles.container} >
        <ScrollView keyboardShouldPersistTaps='never' >
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
              returnKeyType='next'
              secureTextEntry={true}
              blurOnSubmit={true}
              autoCorrect={false}
              ref={input => this.passwordInput = input}
              onSubmitEditing={() => this.confirmPasswordInput.focus()}
              onChangeText={(password) => this.setState({ password })}
              containerStyle={{ marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)' }}
              underlineColorAndroid="#fff"
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              autoCapitalize="none"
              returnKeyType='done'
              secureTextEntry={true}
              blurOnSubmit={true}
              autoCorrect={false}
              ref={input => this.confirmPasswordInput = input}
              onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
              containerStyle={{ marginTop: 16, borderBottomColor: 'rgba(0, 0, 0, 0.38)' }}
              underlineColorAndroid="#fff"
            />
          </View>
          <Button bordered primary onPress={this.signupUser} style={{ margin: 30, alignSelf: 'center' }}>
            <Text>SIGN UP</Text>
          </Button>
        </ScrollView>
      </KeyboardAvoidingView>
    )
  }
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 20
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
    marginTop: 10
  },
  error: {
    alignItems: 'center',
    color: 'red',
  },
})
