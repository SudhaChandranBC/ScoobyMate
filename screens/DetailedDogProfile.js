//
//  DetailedDogProfile.js
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
import { Picker, Icon } from 'native-base';
import Helpers from "../APIs/Helpers";

var Hearing ={
    "1": "+/+",
    "2": "+/-",
    "3": "-/+",
    "4": "-/-",
}
  
export class DetailedDogProfile extends React.Component {

    static navigationOptions = {
        title: 'Detailed Profile'.toUpperCase(),
    };

    state = {
        hearing: null,
        weight: null,
    };

    onHearingPickerConfirm = (hearing) => {
        this.setState({ hearing: hearing });
    };

    render = () => (
        <ScrollView style={styles.root}>
            <RkAvoidKeyboard>
                <View style={[styles.formContent]}>
                    <View style={[styles.content]}>
                        <View style={[styles.textRow]}>
                            <RkText rkType='subtitle'>Hearing</RkText>
                        </View>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down-outline" />}
                            style={styles.input}
                            textStyle={styles.ddText}
                            placeholder="+/+"
                            selectedValue={this.state.hearing}
                            onValueChange={this.onHearingPickerConfirm.bind(this)}>
                            {Object.keys(Hearing).map((key) => {
                                return (<Picker.Item label={Hearing[key]} value={key} key={key} />)
                            })}
                        </Picker>
                    </View>
                    <View style={[styles.content]}>
                        <View style={[styles.textRow]}>
                            <RkText rkType='subtitle'>Weight </RkText>
                        </View>
                        <RkTextInput
                            rkType='topLabel'
                            onChangeText={(weight) => this.setState({ weight })}
                            value={this.state.weight}
                            style={styles.input}
                        />
                    </View>
                    <View style={styles.section}>
                        <View style={[styles.row, styles.heading]}>
                            <RkText rkType='header6 primary'>Endorsed by Vet.</RkText>
                        </View>

                        <View style={styles.row}>
                            <RkChoiceGroup>
                                <TouchableOpacity choiceTrigger>
                                    <View style={styles.checkbox}>
                                        <RkChoice selected={true}/>
                                        <RkText style={styles.checkboxText}>Level 1 Vaccination </RkText>
                                        <RkText rkType='subtitle'> (09.11.18) </RkText>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity choiceTrigger>
                                    <View style={styles.checkbox}>
                                        <RkChoice selected={true}/>
                                        <RkText style={styles.checkboxText}>Level 2 Vaccination</RkText>
                                        <RkText rkType='subtitle'> (20.11.18) </RkText>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity choiceTrigger>
                                    <View style={styles.checkbox}>
                                        <RkChoice />
                                        <RkText style={styles.checkboxText}>Level 3 Vaccination</RkText>
                                    </View>
                                </TouchableOpacity>
                            </RkChoiceGroup>
                        </View>
                        
                    </View>
                </View>
            </RkAvoidKeyboard>
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