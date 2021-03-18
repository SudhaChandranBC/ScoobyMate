import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Dimensions,
  Image,
  Alert,
  Platform
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator, DrawerItems } from 'react-navigation'
import AuthLoadingScreen from './screens/AuthLoadingScreen'
import SignInScreen from './screens/SignInScreen'
import SignUpScreen from './screens/SignUpScreen'
import HomeScreen from './screens/HomeScreen'
import SettingsScreen from './screens/SettingsScreen'
import OwnerProfileScreen from './screens/OwnerProfileScreen'
import PetProfileScreen from "./screens/PetProfileScreen"
import WishListScreen from "./screens/WishListScreen";
import Messages from "./screens/Messages";
import DogCertificateScreen from "./screens/DogCertificateScreen";
import API from "./APIs/API";
import './APIs/Helpers'
import UploadDogsCertificate from "./screens/UploadDogsCertificate";
import { OwnerProfileSettings } from "./screens/OwnerProfileSettings";
import { DogProfileSettings } from "./screens/DogProfileSettings";
import { DetailedDogProfile } from "./screens/DetailedDogProfile";
import { InsurancePolicy } from "./screens/InsurancePolicy";

const {width} = Dimensions.get('window');


const CustomDrawerComponent = (props) =>
  (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: 150, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
        <TouchableOpacity style={styles.button} onPress={() => {
          props.navigation.navigate('PetProfile', {
            'isEditing': false, detailInfo: null
          })
        }}>
          <Image source={require('./assets/logo.png')} style={{ height: 120, width: 120, }} />
        </TouchableOpacity>
      </View>
    
      <ScrollView>
        <DrawerItems {...props} />
        <TouchableOpacity onPress={() =>
          Alert.alert(
            'Log out',
            'Do you want to logout?',
            [
              { text: 'Cancel', onPress: () => { return null } },
              {
                text: 'Confirm', onPress: () => {
                  API.logOutUser()
                  props.navigation.navigate('AuthLoading')
                }
              },
            ],
            { cancelable: false }
          )
        }>
          <Text style={{ margin: 16, fontWeight: 'bold', color: 'gray' }}>LOGOUT</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )

const AuthStackNavigator = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
}, {
    navigationOptions: ({ navigation }) => ({
      headerTitleStyle: {
        ...Platform.select({
          ios: { fontFamily: 'Arial', },
          android: { fontFamily: 'Roboto' },
        }),
      },
    })
  })

const HomeStackNavigator = createStackNavigator({
  Home: HomeScreen,
  Detail: PetProfileScreen,
})

const SettingsStackNavigator = createStackNavigator({
  Settings: SettingsScreen,
  EditOwner: OwnerProfileSettings,
  EditDog: DogProfileSettings,
}, {
    headerMode: 'none',
    navigationOptions: ({ navigation }) => ({
      headerTitleStyle: {
        ...Platform.select({
          ios: { fontFamily: 'Arial', },
          android: { fontFamily: 'Roboto' },
        }),
      }, 
    })
})

const ProfileMandatory = createStackNavigator({
  OwnerMandate: OwnerProfileScreen,
  DogMandate: PetProfileScreen,
}, {
  mode: 'modal',
  headerMode: 'none',
})

const DrawerStack = createDrawerNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      drawerLabel: 'Find Matches',
      title: 'Hi',
      drawerIcon: ({ tintColor }) => (
        <Icon name="ios-home" size={24} color={tintColor} />
      )
    }
  },
  Liked: {
    screen: WishListScreen,
    navigationOptions: {
      drawerLabel: 'My Wishlist',
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-heart" size={24} color={tintColor} />
      ),
    }
  },
  Message: {
    screen: Messages,
    navigationOptions: {
      // drawerLabel: 'Messages',
      // drawerIcon: ({ tintColor }) => (
      //   <Icon name="ios-text" size={24} color={tintColor} />
      // ),
      drawerLabel: () => null
    }
  },
  OwnerProfile: {
    screen: OwnerProfileScreen,
    navigationOptions: {
      drawerLabel: 'My Profile',
      drawerIcon: ({ tintColor }) => (
        <Icon name="ios-contact" size={24} color={tintColor} />
      )
    }
  },
  Certificate: {
    screen: DogCertificateScreen,
    navigationOptions: {
      drawerLabel: 'Certificate',
      drawerIcon: ({ tintColor }) => (
        <Icon name="ios-information-circle-outline" size={24} color={tintColor} />
      )
    }
  },
  UploadCertificate: {
    screen: UploadDogsCertificate,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  PetProfile: {
    screen: PetProfileScreen,
    navigationOptions: {
      drawerLabel: () => null
    }
  },
  DetailedProfile: {
    screen: DetailedDogProfile,
    navigationOptions: {
      drawerLabel: 'Medical History',
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-information-circle" size={24} color={tintColor} />
      )
    }
  },
  Insurance: {
    screen: InsurancePolicy,
    navigationOptions: {
      drawerLabel: 'Insurance & Policy',
      drawerIcon: ({ tintColor }) => (
        <Icon name="ios-information-circle-outline" size={24} color={tintColor} />
      )
    }
  },
  Settings: {
    screen: SettingsStackNavigator,
    navigationOptions: {
      drawerLabel: 'SETTINGS',
      drawerIcon: ({ tintColor }) => (
        <Icon name="md-settings" size={24} color={tintColor} />
      )
    }
  },
},
  {
    contentComponent: CustomDrawerComponent,
    drawerWidth: width - 50,
    contentOptions: {
      activeTintColor: '#4298E3',
      labelStyle: {
        ...Platform.select({
          ios: { fontFamily: 'Arial', },
          android: { fontFamily: 'Roboto' },
        }),
      }, 
    }
  })

const DrawerNavigation = createStackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {
    headerMode: 'float',
    navigationOptions: ({ navigation }) => ({
      headerMode: 'float',
      headerTitle: 'ScoobyMate',
      headerTitleStyle: {
        ...Platform.select({
          ios: { fontFamily: 'Arial', },
          android: { fontFamily: 'Roboto' },
        }),
      }, 
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
          <View style={{ paddingHorizontal: 10 }}>
            <Icon name="md-menu" size={24} style={styles.menu}/>
          </View>
        </TouchableOpacity>
      )
    })
  })

export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: DrawerNavigation,
  Settings: SettingsStackNavigator,
  Mandate: ProfileMandatory
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    padding: 10
  }
});