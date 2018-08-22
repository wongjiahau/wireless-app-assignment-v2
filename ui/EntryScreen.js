import React, { Component } from "react";
import { sessionIdIsPresent } from "../js/SimpleStorage";
import { View, Text } from "react-native";

export class EntryScreen extends Component {
  render() {
    return (<View><Text>{""}</Text></View>)
  }

  async componentWillMount() {
    if(await sessionIdIsPresent()) {
      this.props.navigation.navigate("TaskListScreen");
    } else {
      this.props.navigation.navigate("WelcomeScreen");
    }
  }
}