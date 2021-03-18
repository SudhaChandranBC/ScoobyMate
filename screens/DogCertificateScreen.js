//
//  DogCertificateScreen.js
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
    Modal,
    ActivityIndicator,
} from "react-native";
import Helpers from "../APIs/Helpers";
import {Text} from 'native-base'
import { baseURL } from "../APIs/API";

export default class DogCertificateScreen extends Component {
   
    static navigationOptions = ({
        navigation
    }) => ({
        title: 'Dog\'s Certificate',
    });
    
    constructor(props, context) {
        super(props, context);
        const {
            navigation
        } = this.props;
        this.state = {
            certificateSource: null
        };
    }

    displayView() {
        const dogInfo = Helpers.ownersPet
        if (dogInfo) {
            if (dogInfo.certificate_path) {
                <View style={styles.container}>
                    <View style={styles.coverTitleContainer}>
                        <Text style={styles.coverTitle}>{dogInfo.pet_name}</Text>
                        <Text note style={styles.coverSubTitle}>{dogInfo.pet_breed} | {dogInfo.gender}</Text>
                    </View>
                    <Image source={{ uri: baseURL + '/' + dogInfo.certificate_path }} style={styles.coverImage} />
                </View>
            }
            return (
                <View style={styles.container}>
                    <View style={styles.coverTitleContainer}>
                        <Text style={styles.coverTitle}>{dogInfo.pet_name}</Text>
                        <Text note style={styles.coverSubTitle}>{dogInfo.pet_breed} | {dogInfo.gender}</Text>
                    </View>
                    <View style={styles.empty}>
                        <View style={styles.errorBox}>
                            <Text style={styles.errorMessage}>No records found!</Text>
                        </View>
                    </View>
                </View>
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
      
    render() {
        const {
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
        return this.displayView()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    coverTitleContainer: {
        backgroundColor: 'transparent',
        flex: 1,
        justifyContent: 'space-between',
        paddingTop: 0,
        position: 'absolute'
    },
    coverTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingLeft: 20,
        top: 20,
        position: 'absolute',
    },
    coverSubTitle: {
        top: 50,
        fontSize: 15,
        paddingLeft: 20,
        color: 'gray',
    },
    coverImage: {
        width: '95%',
        height: '60%',
        alignItems: 'center',
        backgroundColor: 'white',
        position: 'relative',
        padding: 10,
        margin: 10,
        marginTop: 100,
        resizeMode: 'cover',
        justifyContent: 'center'
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
    }
})