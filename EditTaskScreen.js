import React, { Component } from 'react';
import {
    Alert,
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    DatePickerAndroid,
    ToastAndroid
} from "react-native";
import { formatDate } from './util';
import { CustomButton } from './HomeScreen';
import { Controller } from './js/Controller';

export class EditTaskScreen extends Component {
    static navigationOptions = {
        title: "Edit task"
    }
    constructor(props) {
        super(props);
        const task = this.props.navigation.getParam("task");
        this.state = {
            task: task
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
                                this.state.task.reminder ?
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
                    Controller.updateTask(this.state.task, (result) => {
                            ToastAndroid.show( `Task updated.`, ToastAndroid.SHORT);
                            this.props.navigation.goBack();
                        }
                    )
                }} text="Update task"/>
            </View>
        );
    }

    handlePickDate = async () => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: this.state.task.reminder || new Date(),
                minDate: new Date(1890, 0, 1),
                maxDate: new Date(3000, 0, 0) // Current date
            });
            if(action !== DatePickerAndroid.dismissedAction) {
                const selectedDate = new Date(year, month, day);
                this.setState({
                    task: {
                        ...this.state.task,
                        reminder: selectedDate
                    }
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
