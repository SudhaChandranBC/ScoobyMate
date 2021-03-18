//
//  Messages.js
//  ScoobyMate
//
//  Created by Chandran, Sudha | SDTD.
//  Copyright © 2018 Sudha Chandran BC All rights reserved.
//

import React, { Component } from "react";
import {
    FlatList,
    View,
    Platform,
    Image,
    TouchableOpacity,
    Keyboard,
    InteractionManager,
} from 'react-native';
import {
    RkButton,
    RkText,
    RkTextInput,
    RkAvoidKeyboard,
    RkStyleSheet,
    RkTheme,
  } from 'react-native-ui-kitten';
import _ from 'lodash';
import conversations from '../helpers/Conversations';
import Users from "../helpers/Users";
import Helpers from "../APIs/Helpers";
const moment = require('moment');


const populateConversations = () => {
    conversations.map(conversation => {
      const userConversation = conversation;
      userConversation.withUser = _.find(Users, x => x.id === conversation.withUserId) || Users[0];
      return userConversation;
    });
};

class Messages extends Component {
    static navigationOptions = ({ navigation }) => {
        return ({
            headerTitle: 'Title',
        });
    };
    
    constructor(props) {
        super(props);
        populateConversations();
        const userId = 1
        this.state = {
            data: this.getConversation(userId),
        };
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.listRef.scrollToEnd();
        });
    }
    
    getConversation(userId = 1) {
        return _.find(conversations, x => x.withUser.id === userId);
    }
    
    getChatList() {
        return conversations;
    }

    setListRef = (ref) => {
        this.listRef = ref;
    };
    
    extractItemKey = (item) => `${item.id}`;
    
    scrollToEnd = () => {
        this.listRef.scrollToEnd();
    };
    
    onInputChanged = (text) => {
        this.setState({ message: text });
    };
    
    onSendButtonPressed = () => {
        if (!this.state.message) {
            return;
        }
        this.state.data.messages.push({
            id: this.state.data.messages.length, time: 0, type: 'out', text: this.state.message,
        });
        this.setState({ message: '' });
        this.scrollToEnd(true);
    };

    renderDate = (date) => (
        <RkText style={styles.time} rkType='secondary7 hintColor'>
            {moment().add(date, 'seconds').format('LT')}
        </RkText>
    );
    
    renderItem = ({ item }) => {
        const isIncoming = item.type === 'in';
        const backgroundColor = isIncoming
            ? '#e3e5e8'
            : '#0084ff';
        const itemStyle = isIncoming ? styles.itemIn : styles.itemOut;
        const textColor = isIncoming
        ? 'black'
        : 'white';
        return (
            <View style={[styles.item, itemStyle]}>
                {!isIncoming && this.renderDate(item.time)}
                <View style={[styles.balloon, { backgroundColor }]}>
                    <RkText rkType='primary2 mediumLine chat' style={{ paddingTop: 5, color: textColor }}>{item.text}</RkText>
                </View>
                {isIncoming && this.renderDate(item.time)}
            </View>
        );
    };
    
    render = () => (
        <RkAvoidKeyboard
            style={styles.container}
            onResponderRelease={Keyboard.dismiss}>
            <FlatList
                ref={this.setListRef}
                extraData={this.state}
                style={styles.list}
                data={this.state.data.messages}
                keyExtractor={this.extractItemKey}
                renderItem={this.renderItem}
            />
            <View style={styles.footer}>
          
                <RkTextInput
                    onFocus={this.scrollToEnd}
                    onBlur={this.scrollToEnd}
                    onChangeText={this.onInputChanged}
                    value={this.state.message}
                    style={styles.textInput}
                    rkType='bordered rounded'
                    placeholder="Add a comment..."
                />
                <RkButton onPress={this.onSendButtonPressed} style={styles.send} rkType='circle highlight'>
                    <Image source={require('../assets/sendIcon.png')} />
                </RkButton>
            </View>
        </RkAvoidKeyboard>
    )
}

export default Messages;

const styles = RkStyleSheet.create(theme => ({
    header: {
        alignItems: 'center',
    },
    avatar: {
        marginRight: 16,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    list: {
        paddingHorizontal: 17,
    },
    footer: {
        flexDirection: 'row',
        minHeight: 80,
        backgroundColor: '#F0F2F5',
    },
    textInput: {
        flexDirection: 'row',
        width: Helpers.SCREEN_WIDTH - 80,
        backgroundColor: '#F6F9FA',
    },
    item: {
        marginVertical: 14,
        flex: 1,
        flexDirection: 'row',
    },
    itemIn: {},
    itemOut: {
        alignSelf: 'flex-end',
    },
    balloon: {
        maxWidth: 250,
        paddingHorizontal: 15,
        paddingTop: 10,
        paddingBottom: 15,
        borderRadius: 20,
    },
    time: {
        alignSelf: 'flex-end',
        margin: 15,
    },
    plus: {
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginRight: 7,
    },
    send: {
        width: 40,
        height: 40,
        marginLeft: 10,
        marginTop: 20
    },
}));