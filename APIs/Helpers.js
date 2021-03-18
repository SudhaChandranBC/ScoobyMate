//
//  Helpers.js
//  ScoobyMate
//
//  Created by Chandran, Sudha | SDTD.
//  Copyright © 2018 Sudha Chandran BC All rights reserved.
//

import {
  Dimensions
} from 'react-native';

const Helpers = {
  loggedInUserId: null,
  isLoggedIn: false,
  isRegistered: false,
  hasUserDetails: false,
  hasDogDetails: false,
  ownersPet: null,
  SCREEN_WIDTH: Dimensions.get('window').width,
  SCREEN_HEIGHT: Dimensions.get('window').height,
}
  
export default Helpers;