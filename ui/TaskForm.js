import React, { Component } from 'react';
import { Icon } from "react-native-elements";
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
import { formatDate } from '../util';
import { NULL_DATE } from '../js/Database';
import { CustomButton } from './CustomButton';

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
        <View style={{flexDirection: "row", marginBottom: 40}}>
          <TouchableOpacity
            style={{paddingLeft: 10}}
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
          {this.state.task.reminder === NULL_DATE ? null :
          <TouchableOpacity style={{marginLeft: 10, marginTop: 3}} onPress={()=>{
            this.setState({task: {...this.state.task, reminder: NULL_DATE}})
            }}>
              <Icon type='feather' name='x' />
          </TouchableOpacity>}
        </View>
        <CustomButton 
          text={this.props.buttonText}
          onPress={() => {
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
          }} />
      </View>
    );
  }

  handlePickDate = async () => {
    const date = this.state.task.reminder;
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        date: date !== NULL_DATE ? date : new Date(),
        minDate: new Date(1890, 0, 1),
        maxDate: new Date(3000, 0, 0) // Current date
      });
      if(action !== DatePickerAndroid.dismissedAction) {
        const {action, hour, minute} = await TimePickerAndroid.open({
            hour:   date !== NULL_DATE ? date.getHours()   : new Date().getHours(),
            minute: date !== NULL_DATE ? date.getMinutes() : new Date().getMinutes(),
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