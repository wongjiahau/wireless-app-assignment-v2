/**
 * Name: Wong Jia Hau
 * Reg. No.: 1500181
 */
import React, { Component } from 'react';
import {
    Alert,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    DatePickerAndroid
} from "react-native";
import { formatDate } from './util';
import { CustomButton } from './HomeScreen';
import { Controller } from './js/Controller';

export class AddReminderScreen extends Component {
    static navigationOptions = {
        title: "Add new reminder"
    }
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            content: "",
            reminder: null // Date
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Title</Text>
                <TextInput 
                    style={styles.textField}
                    value={this.state.title}
                    onChangeText={(title) => {this.setState({title})}}
                    />

                <Text style={styles.header}>Content</Text>
                <TextInput 
                    style={styles.textField}
                    value={this.state.content}
                    multiline={true}
                    numberOfLines={3}
                    onChangeText={(content) => {this.setState({content})}}
                    />

                <Text style={styles.header}>Reminder</Text>
                <TouchableOpacity
                    style={{paddingLeft: 10, marginBottom: 40}}
                    onPress={this.handlePickDate}>
                    <View>
                        <Text style={styles.textField}>
                            {
                                this.state.reminder ?
                                formatDate(this.state.reminder) :
                                "Click to add reminder"
                            }
                        </Text>
                    </View>
                </TouchableOpacity>
                <CustomButton onPress={() => {
                    if(!this.state.title) {
                        Alert.alert("Please fill in Title.")
                        return;
                    }
                    Controller.createTask(
                        this.state.title,
                        this.state.content,
                        this.state.reminder,
                        (result) => {
                            Alert.alert("Successfully added new task!");
                            this.props.navigation.goBack();
                        }
                    )
                }} text="Add task"/>
            </View>
        );
    }

    handlePickDate = async () => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: this.state.reminder || new Date(),
                minDate: new Date(1890, 0, 1),
                maxDate: new Date() // Current date
            });
            if(action !== DatePickerAndroid.dismissedAction) {
                const selectedDate = new Date(year, month, day);
                this.setState({
                    reminder: selectedDate
                });
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
