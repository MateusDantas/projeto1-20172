import React, { Component } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

import styles from './Styles/TripScreenStyles'

export default class TripScreen extends Component {
  constructor(props){
    super(props)

    this.from = this.props.navigation.state.params._from;
    this.to = this.props.navigation.state.params._to;
    this.depart = this.props.navigation.state.params._depart;
    this.return = this.props.navigation.state.params._return;
    //alert(this.props.navigation.state.params._to)
    //alert(this.props.navigation.state.params._depart)
    //alert(this.props.navigation.state.params._return)

    this.state = {
      data: []
    }

  }

  componentWillMount() {
    this.fetchData();
  }

  fetchData = async (props) => {
    const response = await fetch("https://my.api.mockaroo.com/travel.json?key=8ee6d780");
    const json = await response.json();
    var from = this.from
    var to = this.to
    var depart_date = this.depart
    var return_date = this.return
    var trips_founded = []
    json.forEach(function(trip) { 
      if (trip.from == from && trip.to == to && trip.depart_date == depart_date && trip.return_date == return_date) {
        alert(JSON.stringify(trip));
      }
    });
    this.setState({ data: trips_founded  });
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          keyExtractor={(x, i) => i}
          renderItem={({ item }) =>
            <Text>
            </Text>}
        />
      </View>
    );
  }
}