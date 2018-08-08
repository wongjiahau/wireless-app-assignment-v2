/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TouchableHighlight
} from 'react-native';
import { MovieListScreen } from './MovieListScreen';
import { sampleData } from './sampleData';
import { Main } from './Main';
import { Database } from './database';
let SQLite = require('react-native-sqlite-storage');

let db = SQLite.openDatabase({name: 'moviedb',createFromLocation : '~db.sqlite'}, ()=>{}, ()=>{});

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      students: null
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native
        </Text>
        <Text style={styles.instructions}>
          To get starteded, edit App.js
        </Text>
        <Text style={styles.instructions}>
          {instructions}
        </Text>
        <Button title="Load" onPress={this.handleButtonPress}></Button>
        <Text>
          {JSON.stringify(this.state.students)}
        </Text>
      </View>
    );
  }

  handleButtonPress = () => {
    Database.retrieveMovie((result) => {
      this.setState({students: result})
    })
    // db.transaction((tx) => {
    //   tx.executeSql('SELECT * FROM movies', [], (tx, results) => {
    //     alert(JSON.stringify(results.rows.raw()))
    //     this.setState({
    //       students: results.rows.raw(),
    //     })
    //   })
    // });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
