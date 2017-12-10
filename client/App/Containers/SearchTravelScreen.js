  import React, { Component } from 'react'

  import {
    StyleSheet,
    Button,
    AsyncStorage,
    TouchableHighlight,
    AppRegistry,
    Text,
    TextInput,
    View,
    Image
  } from 'react-native'

  import DatePicker from 'react-native-datepicker'

  import {
    StackNavigator,
  } from 'react-navigation'

  import styles from './Styles/SearchTravelScreenStyles'

  import TripScreen from './TripScreen'

  const SearchScreen = StackNavigator({
    TripScreen: { screen: TripScreen }
  });

  export default class SearchTravelScreen extends Component {
    constructor(props) {
      super(props)
      var _from = "";
      var _to = "";
      this.state = {depart:{date: "2017-12-01"}, return: {date: "2017-12-02"}};
    }

    _searchTravel = () => {
      alert(this.state.return.date)
    }

    render() {
      const { navigate } = this.props.navigation;
      return (
        <View style={styles.container}>
        <Text style={styles.toptitle}>
        Searching a Travel!
        </Text>
        <TextInput
        style={styles.input}
        placeholder="From"
        onChangeText={(text) => this._from = text}
        />
        <TextInput
        style={styles.input}
        placeholder="To"
        onChangeText={(text) => this._to = text}
        />
        <View style={styles.row}>
        <View>
        <Text style={{fontSize:15, marginLeft:15, marginTop:10, marginBottom: 10}}>
        Depart:
        </Text>
        <DatePicker
        style={{width: 150, marginLeft:15}}
        date={this.state.depart.date}
        mode="date"
        placeholder="Select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2018-12-31"
        confirmBtnText="OK"
        cancelBtnText="CANCEL"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={(date) => {this.setState({depart:{date: date}})}}
        />
        </View>
        <View>
        <Text style={{fontSize:15, marginLeft:15, marginTop:10, marginBottom: 10}}>
        Return:
        </Text>
        <DatePicker
        style={{width: 150, marginLeft:15}}
        date={this.state.return.date}
        mode="date"
        placeholder="Select date"
        format="YYYY-MM-DD"
        minDate="2016-05-01"
        maxDate="2018-12-31"
        confirmBtnText="OK"
        cancelBtnText="CANCEL"
        customStyles={{
          dateIcon: {
            position: 'absolute',
            left: 0,
            top: 4,
            marginLeft: 0
          },
          dateInput: {
            marginLeft: 36
          }
        }}
        onDateChange={(date) => {this.setState({return:{date: date}})}}
        />
        </View>

        </View>

        <Button
        style={{marginTop: 20,}}
        title="Show Travels"
        onPress={() =>
          navigate('TripScreen',{ _from: this._from, _to: this._to, _depart: this.state.depart.date, _return: this.state.return.date })
       }
       />

       </View>
       )
    }
  }