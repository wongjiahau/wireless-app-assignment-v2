import React, { Component } from 'react';
import {
    Alert,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    TimePickerAndroid,
    DatePickerAndroid,
    ToastAndroid
} from "react-native";
import { formatDate } from './util';
import { CustomButton } from './HomeScreen';
import { NULL_DATE } from './js/Database';

export class TaskForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: this.props.task
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Title</Text>
        <TextInput 
          style={styles.textField}
          value={this.state.task.title}
          onChangeText={(title) => {this.setState({
            task: {
              ...this.state.task,
              title: title
            }
          })}}
          />

        <Text style={styles.header}>Content</Text>
        <TextInput 
          style={styles.textField}
          value={this.state.task.content}
          multiline={true}
          numberOfLines={3}
          onChangeText={(content) => {this.setState({
            task: {
              ...this.state.task,
              content: content
            }
          })}}
          />

        <Text style={styles.header}>Reminder</Text>
        <TouchableOpacity
          style={{paddingLeft: 10, marginBottom: 40}}
          onPress={this.handlePickDate}>
          <View>
            <Text style={styles.textField}>
              {
                this.state.task.reminder !== NULL_DATE ?
                formatDate(new Date(this.state.task.reminder)) :
                "Click to add reminder"
              }
            </Text>
          </View>
        </TouchableOpacity>
        <CustomButton onPress={() => {
          if(!this.state.task.title) {
            Alert.alert("Please fill in Title.")
            return;
          }
          this.props.handleTask(this.state.task, (response) => {
              ToastAndroid.show( 
                this.props.renderMessage(this.state.task),
                ToastAndroid.SHORT
              );
              this.props.navigation.goBack();
            }
          )
        }} text={this.props.buttonText}/>
      </View>
    );
  }

  handlePickDate = async () => {
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: this.state.reminder || new Date(),
        minDate: new Date(1890, 0, 1),
        maxDate: new Date(3000, 0, 0) // Current date
      });
      if(action !== DatePickerAndroid.dismissedAction) {
        const {action, hour, minute} = await TimePickerAndroid.open({
            hour: this.state.reminder ? this.state.reminder.getHours() : 12,
            minute: this.state.reminder ? this.state.reminder.getMinutes() : 0,
            is24Hour: false, // Will display '2 PM'
        });
        if (action !== TimePickerAndroid.dismissedAction) {
          const selectedDate = new Date(year, month, day, hour, minute);
          this.setState({
            task: {
              ...this.state.task,
              reminder: selectedDate
            }
          });
        }
      }
    } catch ({code, message}) {
      Alert.alert("Cannot open date picker", message);
    }
  }
}
const styles = StyleSheet.create({
    textField: {
        alignSelf: "stretch",
        fontSize: 20,
        color: "black",
        marginBottom: 20
    },
    pickerField: {
        alignSelf: "stretch",
        color: "black",
        marginBottom: 20
    },
    container: {
        padding: 30
    },
    header: {
        marginLeft: 7
    }
});