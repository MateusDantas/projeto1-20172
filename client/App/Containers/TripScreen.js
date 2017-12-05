import React, { Component } from 'react';
import {
  StyleSheet,
  AsyncStorage,
  Text,
  View,
  RefreshControl,
  ActivityIndicator
} from 'react-native';

import Timeline from 'react-native-timeline-listview'

import styles from './Styles/TripScreenStyles'

export default class TripScreen extends Component {
  constructor(props){
    super(props)

    //alert(this.props.navigation.state.params._from)
    //alert(this.props.navigation.state.params._to)
    //alert(this.props.navigation.state.params._depart)
    //alert(this.props.navigation.state.params._return)

    this.data = [
    {time: '09:00', title: 'Campina Grande - João Pessoa'},
    {time: '10:30', title: 'Campina Grande - Sumé'},
    {time: '12:00', title: 'João Pessoa - Campina Grande'},
    {time: '14:00', title: 'João Pessoa - Recife'},
    {time: '16:30', title: 'Campina Grande - Monteiro'},
    ]

    this.state = {
      isRefreshing: false,
      waiting: false,
      data: this.data
    }
  }

onRefresh = () => {
  this.setState({isRefreshing: true});
    //refresh to initial data
    setTimeout(() => {
      //refresh to initial data
      this.setState({
        data: this.data,
        isRefreshing: false
      });
    }, 2000);
  }

  onEndReached = () => {
    if (!this.state.waiting) {
      this.setState({waiting: true});
      //fetch and concat data
      setTimeout(() => {
        //refresh to initial data
        var data = this.state.data.concat([
          {time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
          {time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
          {time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
          {time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
          {time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'}
          ])

        this.setState({
          waiting: false,
          data: this.state.data,
        });
      }, 2000);
    }
  }

  renderFooter = () => {
    if (this.state.waiting) {
      return <ActivityIndicator />;
    } else {
      return <Text>~</Text>;
    }
  }

  render() {
    //'rgb(45,156,219)'
    return (
    <View style={styles.container}>
    <Timeline
    style={styles.list}
    data={this.state.data}
    circleSize={20}
    circleColor='white'
    lineColor='white'
    timeContainerStyle={{minWidth:52, marginTop: -5}}
    timeStyle={{textAlign: 'center', backgroundColor:'#1e698d', color:'white', padding:5, borderRadius:13}}
    descriptionStyle={{color:'black'}}
    options={{
      style:{paddingTop:5},
      refreshControl: (
      <RefreshControl
      refreshing={this.state.isRefreshing}
      onRefresh={this.onRefresh}
      />
      ),
      renderFooter: this.renderFooter,
      onEndReached: this.onEndReached
    }}
    />
    </View>
    );
  }
}
