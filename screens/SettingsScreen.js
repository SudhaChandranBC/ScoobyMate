//
//  SettingsScreen.js
//  ScoobyMate
//
//  Created by Chandran, Sudha | SDTD.
//  Copyright © 2018 Sudha Chandran BC All rights reserved.
//

import React from 'react';
import {
    ScrollView,
    View,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';
import {
  RkText,
  RkStyleSheet,
  RkTheme,
} from 'react-native-ui-kitten';
import API from '../APIs/API';
import { Icon } from 'native-base';

class SettingsScreen extends React.Component {

    static navigationOptions = (navigation) => ({
        headerMode: 'float',
        title: 'Settings'.toUpperCase(),
        // headerLeft: (
        //   <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        //     <View style={{ paddingHorizontal: 10 }}>
        //       <Icon name="md-menu" size={24} style={styles.menu}/>
        //     </View>
        //   </TouchableOpacity>
        // )
    })

    ownerProfilePressed = () => {
        this.props.navigation.navigate('EditOwner')
    };

    dogProfilePressed = () => {
        this.props.navigation.navigate('EditDog')
    };
    
    render = () => (
        <ScrollView style={styles.container}>
            <View style={styles.section}>
                <View style={[styles.row, styles.heading]}>
                    <RkText rkType='primary header6'>PROFILE SETTINGS</RkText>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={this.ownerProfilePressed1} style={styles.rowButton}>
                        <RkText rkType='header6'>My Profile</RkText>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={this.dogProfilePressed1} style={styles.rowButton}>
                        <RkText rkType='header6'>Dog's Profile</RkText>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.rowButton}>
                        <RkText rkType='header6'>Change Password</RkText>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.section}>
                <View style={[styles.row, styles.heading]}>
                    <RkText rkType='primary header6'>SUPPORT</RkText>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.rowButton}>
                        <RkText rkType='header6'>Help</RkText>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.rowButton}>
                        <RkText rkType='header6'>Privacy Policy</RkText>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.rowButton}>
                        <RkText rkType='header6'>Terms & Conditions</RkText>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.rowButton} onPress={() =>
                        Alert.alert('Log out', 'Do you want to logout?', [
                            { text: 'Cancel', onPress: () => { return null } },
                            {
                                text: 'Confirm', onPress: () => {
                                    API.logOutUser()
                                    this.props.navigation.navigate('AuthLoading')
                                }
                            },
                        ],
                            { cancelable: false }
                        )
                    }>
                        <RkText rkType='header6'>Logout</RkText>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}
export default SettingsScreen;

const styles = RkStyleSheet.create(theme => ({
    container: {
      backgroundColor: theme.colors.screen.base,
    },
    header: {
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
      justifyContent: 'space-between',
      paddingHorizontal: 17.5,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: theme.colors.border.base,
      alignItems: 'center',
    },
    rowButton: {
      flex: 1,
      paddingVertical: 24,
    },
    switch: {
      marginVertical: 14,
    },
  }));