//
//  API.js
//  ScoobyMate
//
//  Created by Chandran, Sudha | SDTD.
//  Copyright © 2018 Sudha Chandran BC All rights reserved.
//

import Axios from 'axios'
import {
    AsyncStorage
} from "react-native";
import Helpers from './Helpers';
// export const baseURL = 'http://10.13.172.164:3231'
export const baseURL = 'http://13.127.241.6:3231'

var instance = Axios.create({
    baseURL: baseURL + '/api',
    timeout: 1000
  });

const API = {
    logInUser: async function (params) {
        try {
            let response = await instance.post('/login', params)
            const result = response.data
            if (result.code == 200) {
                AsyncStorage.setItem('userId', response.data.user_id.toString())
                Helpers.isLoggedIn = true
                Helpers.loggedInUserId = response.data.user_id.toString()
                AsyncStorage.setItem('hasUserDetails',JSON.stringify(response.data.hasUserDetails))
                AsyncStorage.setItem('hasDogDetails', JSON.stringify(response.data.hasDogDetails))
                Helpers.hasUserDetails = response.data.hasUserDetails
                Helpers.hasDogDetails = response.data.hasDogDetails
            }
            return result
        } catch (error) {
            return error;
        }
    },
    logOutUser: function () {
        AsyncStorage.clear()
        Helpers.isLoggedIn = false
        Helpers.loggedInUserId = null
        Helpers.ownersPet = null
    },
    registerUser: async function (data) {
        try {
            let response = await instance.post('/register', data)
            const result = response.data
            if (result.code == 200) {
                AsyncStorage.setItem('userId', response.data.user_id.toString())
                Helpers.isRegistered = true
                Helpers.hasUserDetails = false
                Helpers.hasDogDetails = false
                Helpers.loggedInUserId = response.data.user_id.toString()
            }
            return result
        } catch (error) {
            return error;
        }
    },
    updateOwnerProfile: async function (data) {
        console.log(data)
        try {
            let response = await instance.post('/updateUserProfile', data) 
            const result = response.data
            if (result.code == 200) {
                Helpers.hasUserDetails = true
                AsyncStorage.setItem('hasUserDetails', JSON.stringify(true))
            }
            return result
        } catch (error) {
            return error;
        }
    },
    addDogProfile: async function (data) {
        try {
            let response = await instance.post('/addDogProfile', data)
            Helpers.hasDogDetails = true
            AsyncStorage.setItem('hasDogDetails', JSON.stringify(true))
            return response.data
        } catch (error) {
            return error;
        }
    },
    getOwnerProfile: async function (params) {
        try {
            let response = await instance.get('/getUserProfile', { params } )
            const result = response.data
            return result.result[0]
        } catch (error) {
            return error;
        }
    },
    getOwnersPetProfile: async function (params) {
        try {
            let response = await instance.get('/getOwnersPetDetail', { params })
            Helpers.isLoggedIn = true
            Helpers.ownersPet = response.data[0]
            return response.data[0]
        } catch (error) {
            return error;
        }
    },
    getAllPets: async function () {
        try {
            let response = await instance.get('/getAllAvailablePets')
            const result = response.data
            return result.result
        } catch (error) {
            return error;
        }
    },
    getMatchedPets: async function (params) {
        try {
            let response = await instance.get('/getMatchedPetList', { params })
            const result = response.data
            return result.result
        } catch (error) {
            return error;
        }
    },
    getWishList: async function (params) {
        try {
            let response = await instance.get('/getWishList', { params })
            const result = response.data
            return result.result
        } catch (error) {
            return error;
        }
    },
    likePet: async function (data) {
        try {
            let response = await instance.post('/complimentPet', data)
            return response.data
        } catch (error) {
            return error;
        }
    },
    disLikePet: async function (data) {
        try {
            let response = await instance.post('/dislikePet', data)
            return response.data
        } catch (error) {
            return error;
        }
    },
    uploadCertificate: async function (data) {
        try {
            let response = await instance.post('/uploadPetCertificate', data)
            return response.data
        } catch (error) {
            return error;
        }
    },
  }
  
export default API;