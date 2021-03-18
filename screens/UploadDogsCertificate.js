//
//  UploadDogsCertificate.js
//  ScoobyMate
//
//  Created by Chandran, Sudha | SDTD.
//  Copyright © 2018 Sudha Chandran BC All rights reserved.
//

import React, { Component } from "react";
import {
    View,
    StyleSheet,
    Alert,
} from "react-native";
import Helpers from "../APIs/Helpers";
import {Button, Text} from 'native-base'
import API from "../APIs/API";
import ImagePicker from 'react-native-image-picker';

export default class UploadDogsCertificate extends Component {
    
    constructor(props, context) {
        super(props, context);
        const {
            navigation
        } = this.props;

        this.state = {
            certificateSource: null
        };
        this.selectPhotoTapped = this.selectPhotoTapped.bind(this);
    }
    
    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        }
        
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
            if (response.uri) {
                this.setState({ certificateSource: response.uri })
                this.uploadCertificate()
            }
        });
    }

    uploadCertificate() {
        let self = this;
        const {
            certificateSource,
        } = this.state;
        
        const certData = new FormData()
        if (this.state.certificateSource) {
            certData.append('certificate_file', {
                uri: certificateSource,
                name: 'certificate.jpg',
                type: 'image/jpeg'
            })
        }
        if (Helpers.ownersPet) {
            certData.append('dog_id', Helpers.ownersPet.dog_id)
        }
        
        API.uploadCertificate(certData).then(function (result) {
            if (result.code == 200) {
                API.getOwnersPetProfile({ user_id: Helpers.loggedInUserId }).then(function (response) {
                    Alert.alert('Success!', 'Certificate uploaded successfully!', [{
                        text: 'OK', onPress: () => { self.props.navigation.navigate('Home') }
                    }])
                })
            } else {
                Alert.alert('Dog Info update failed!')
                return null
            }
        }).catch(function (error) {
            Alert.alert('Dog Info update failed!')
            return null
        })
    }

    uploadView() {
        return (
            <View style={styles.container}>
                <Text style={styles.coverTitle}>Please upload Dog's certificate</Text>
                <Text style={styles.coverSubTitle}>Please take a step to assure your gog is of a genuine breed and help us to find a perfect match</Text>
                <Button></Button>
                <Button transparent primary onPress={() => this.props.navigation.navigate('Home')} style={{ margin: 30, alignSelf: 'center' }}>
                    <Text>I don't have a certificate</Text>
                </Button>
                <Button transparent primary onPress={this.selectPhotoTapped.bind(this)} style={{ margin: 30, alignSelf: 'center' }}>
                    <Text>AGREE</Text>
                </Button>
            </View>
        )
    }

    render() {
        return this.uploadView()
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    profileImage: {
        margin: 20,
        resizeMode: 'contain',
        height: 50,
        width: 50,
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
})