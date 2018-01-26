import React, { Component } from 'react';

import {
  StyleSheet,
  Button,
  AsyncStorage,
  TouchableHighlight,
  AppRegistry,
  Text,
  TextInput,
  View
} from 'react-native';

import {
  StackNavigator,
} from 'react-navigation'

import styles from './Styles/ShowTravelScreenStyles'

export default class ShowTravelScreen extends Component {
  constructor(props) {
    super(props)
    this.state = {
      res : ''
    };
  }

  _getTravelsFromApi = (props) => {
    return fetch('https://my.api.mockaroo.com/users.json?key=8ee6d780')
    .then((response) => response.json())
    .then((responseJson) => {
      alert(JSON.stringify(responseJson))
      this.setState({ res : responseJson})
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <Text style={{fontSize:20}}>
        Show Travels!
       </Text>
      <TouchableHighlight onPress={() => this._getTravelsFromApi(this.props)}>
        <Text style={styles.button}>Testing sending parameters...</Text>
      </TouchableHighlight>
      </View>
    )
  }
}
