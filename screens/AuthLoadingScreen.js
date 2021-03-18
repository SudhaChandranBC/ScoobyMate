//
//  AuthLoadingScreen.js
//  ScoobyMate
//
//  Created by Chandran, Sudha | SDTD.
//  Copyright © 2018 Sudha Chandran BC All rights reserved.
//

import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    AsyncStorage
} from "react-native";
import Helpers from "../APIs/Helpers";
import API from "../APIs/API";
import { RkTheme } from 'react-native-ui-kitten';
import { KittenTheme } from '../helpers/theme';

export default class AuthLoadingScreen extends Component {

    constructor() {
        super()
        RkTheme.setTheme(KittenTheme, null);
        RkTheme.setType('RkTextInput', 'rounded', {
            fontSize: theme => theme.fonts.sizes.h6,
            borderWidth: 1,
            underlineWidth: 1,
            placeholderTextColor: theme => theme.colors.input.text,
            input: {
                marginVertical: {
                    ios: 15,
                    android: 4,
                },
            },
        });
        this.loadApp()
    }

    loadApp = async () => {
        let self = this;
        const items = await AsyncStorage.multiGet(['userId','hasUserDetails','hasDogDetails'])
        const userId = items[0][1]
        const hasUserDetails =  items[1][1] 
        const hasDogDetails =  items[2][1]
        if (userId) {
            Helpers.isLoggedIn = true
            Helpers.loggedInUserId = userId
            hasUserDetails === 'true' ? Helpers.hasUserDetails = true : Helpers.hasUserDetails = false
            hasDogDetails === 'true' ? Helpers.hasDogDetails = true : Helpers.hasDogDetails = false
            
            if (!Helpers.hasUserDetails) {
                self.props.navigation.navigate('OwnerMandate')
            } else {
                if (!Helpers.hasDogDetails) {
                    self.props.navigation.navigate('DogMandate')
                } else {
                    API.getOwnersPetProfile({ user_id: Helpers.loggedInUserId }).then(function (response) {
                        self.props.navigation.navigate('App')
                    })
                }
            }
        } else {
            this.props.navigation.navigate('Auth')
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})