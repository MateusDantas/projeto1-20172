import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  ScrollView,
  TouchableHighlight
} from 'react-native';

  const t = require('tcomb-form-native')

  const Form = t.form.Form

  const User = t.struct({
    username: t.String,
    password:  t.String
  })

  const options = {
    fields: {
      username: {
        autoCapitalize: 'none',
        autoCorrect: false
      },
      password: {
        autoCapitalize: 'none',
        password: true,
        autoCorrect: false
      }
    }
  }

  class LoginView extends Component {

    constructor(props) {
      super(props)
      this.state = {
        value: {
          email: '',
          username: ''
        }
      }
    }

    componentWillUnmount() {
      this.setState = {
        value: {
          email: '',
          username: null
        }
      }
    }

    _onChange = (value) => {
      this.setState({
        value
      })
    }
    _handleAdd = () => {
      const value = this.refs.form.getValue();
      // If the form is valid...
      if (value) {
        const data = {
          username: value.username,
          password: value.password
        }
        // Serialize and post the data
        const json = JSON.stringify(data)
        fetch('http://aqueous-oasis-59499.herokuapp.com/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: json
        })
        .then((response) => response.json())
        .then((res) => {
          if (res.error) {
            alert(res.error)
          } else {
            AsyncStorage.setItem('jwt', res.token)
            alert(`Success! You may now access protected content.`)
            // Redirect to home screen
            // this.props.navigator.pop()
          }
        })
        .catch((err) => {
          alert('There was an error logging in.' + err);
        })
        .done()
      } else {
        // Form validation error
        alert('Please fix the errors listed and try again.')
      }
    }

    render() {
      return (
        <ScrollView style={styles.container}>
          <Form
            ref='form'
            options={options}
            type={User}
            value={this.state.value}
            onChange={this._onChange}
          />
          <TouchableHighlight onPress={this._handleAdd}>
            <Text style={styles.button}>Log In</Text>
          </TouchableHighlight>
        </ScrollView>
      )
    }
  };

  var styles = StyleSheet.create({
    container: {
      padding: 20,
      flex: 1,
      flexDirection: 'column'
    },
    button: {
      borderRadius: 4,
      padding: 20,
      textAlign: 'center',
      marginBottom: 20,
      color: '#fff',
      backgroundColor: '#1e698d'
    },
    centering: {
      alignItems: 'center',
      justifyContent: 'center'
    }
  })

  module.exports = LoginView
