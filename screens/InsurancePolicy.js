//
//  InsurancePolicy.js
//  ScoobyMate
//
//  Created by Chandran, Sudha | SDTD.
//  Copyright © 2018 Sudha Chandran BC All rights reserved.
//

import React from 'react';
import {
    ScrollView,
    View,
    TouchableOpacity
  } from 'react-native';
import { RkTextInput, RkText, RkAvoidKeyboard, RkStyleSheet, RkChoice, RkChoiceGroup } from 'react-native-ui-kitten';
import { Picker, Icon, Button, Text } from 'native-base';
import Helpers from "../APIs/Helpers";

var InsuranceCompany ={
    "1": "Test Pet Life",
    "2": "HDFC Life",
    "3": "United India Insurance",
    "4": "Aviva Insurance",
}
  
var Policy ={
    "1": "Long Term Health",
    "2": "Whole Life Policy",
    "3": "Term Life Insurance",
    "4": "-/-",
}

export class InsurancePolicy extends React.Component {

    static navigationOptions = {
        title: 'Detailed Profile'.toUpperCase(),
    };

    state = {
        insuranceID: '',
        insCompany: null,
        policy: null,
    };

    onCompanyPickerConfirm = (company) => {
        this.setState({ insCompany: company });
    };

    onPolicyPickerConfirm = (policy) => {
        this.setState({ policy: policy });
    };

    render = () => (
        <ScrollView style={styles.root}>
            <View style={[styles.formContent]}>
                <View style={[styles.content]}>
                    <View style={[styles.textRow]}>
                        <RkText rkType='subtitle'>Insurance</RkText>
                    </View>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                        style={styles.input}
                        textStyle={styles.ddText}
                        placeholder="Test Pet Life"
                        selectedValue={this.state.insCompany}
                        onValueChange={this.onCompanyPickerConfirm.bind(this)}>
                        {Object.keys(InsuranceCompany).map((key) => {
                            return (<Picker.Item label={InsuranceCompany[key]} value={key} key={key} />)
                        })}
                    </Picker>
                </View>
                <View style={[styles.content]}>
                    <View style={[styles.textRow]}>
                        <RkText rkType='subtitle'>Policy</RkText>
                    </View>
                    <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="ios-arrow-down-outline" />}
                        style={styles.input}
                        textStyle={styles.ddText}
                        placeholder="Long Term Health"
                        selectedValue={this.state.policy}
                        onValueChange={this.onPolicyPickerConfirm.bind(this)}>
                        {Object.keys(Policy).map((key) => {
                            return (<Picker.Item label={Policy[key]} value={key} key={key} />)
                        })}
                    </Picker>
                </View>
                <View style={[styles.content]}>
                    <View style={[styles.textRow]}>
                        <RkText rkType='subtitle'>Insurance ID </RkText>
                    </View>
                    <RkTextInput
                        rkType='topLabel'
                        onChangeText={(insuranceID) => this.setState({ insuranceID })}
                        value={this.state.insuranceID}
                        style={styles.input}
                    />
                </View>
                <View style={styles.section}>
                    <View style={styles.row}>
                        <RkChoiceGroup>
                            <TouchableOpacity choiceTrigger>
                                <View style={styles.checkbox}>
                                    <RkChoice selected={false} />
                                    <RkText style={styles.checkboxText}>I don't have an insurance </RkText>
                                </View>
                            </TouchableOpacity>
                        </RkChoiceGroup>
                    </View>
                </View>
                <Button transparent primary onPress={this.signUpUser} style={{ margin: 0, alignSelf: 'center' }}>
            <Text>Apply for insurance</Text>
          </Button>
            </View>
        </ScrollView>
    )
}

const styles = RkStyleSheet.create(theme => ({
    content: {
      marginTop: 10,
    },
    content1: {
        marginTop: 100,
        borderColor: '#e5e5e5',
      borderBottomWidth: 1,
    },
    input: {
        width: Helpers.SCREEN_WIDTH - 40,
      borderColor: '#e5e5e5',
      borderBottomWidth: 1,
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 15,
    },
    checkboxText: {
        marginLeft: 20,
    },
    root: {
        backgroundColor: theme.colors.screen.base,
        padding: 15,

    },
    header: {
    backgroundColor: theme.colors.screen.neutral,
    paddingVertical: 25,
  },
  section: {
    marginVertical: 25,
  },
    formContent: {
      justifyContent: 'space-between',
      flexDirection: 'column',
      flex: 1,
    },
    textRow: {
      marginLeft: 20,
    },
    expireDateBlock: {
      justifyContent: 'space-between',
      flexDirection: 'row',
    },
    expireDateInput: {
      flex: 0.48,
      marginVertical: 10,
    },
    expireDateInnerInput: {
      textAlign: 'center',
    },
    expireDateDelimiter: {
      flex: 0.04,
    },
    balloon: {
      maxWidth: 250,
      padding: 15,
      borderRadius: 100,
      borderWidth: 0.5,
      borderColor: theme.colors.border.solid,
    },
  }));