import React, { Component } from 'react';
import {
    Alert,
    View,
    Picker,
    Text,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Button,
    TextInput,
    DatePickerAndroid
} from "react-native";

const LANGUAGES = [
    "English",
    "Malay",
    "Mandarin",
    "Cantonese",
    "Japanese",
    "Korean"
];

export class AddMovieScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: null,
            language: null,
            release_date: new Date()
        }
    }

    render() {
        return (
            <View>
                <TextInput 
                    value={this.state.title}
                    placeholder={"Movie Title"}
                    onChangeText={(title) => {this.setState({title})}}
                    />
                <Picker mode="dropdown"
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemIdex) => {
                        this.setState({language: itemValue});
                    }}>
                    {LANGUAGES.map((x, index) => <Picker.Item key={index} label={x} value={x}/>)}
                </Picker>
                <TouchableWithoutFeedback onPress={this.handlePickDate}>
                    <Text>{this.state.release_date.toString()}</Text>
                </TouchableWithoutFeedback>
                <Button onPress={() => alert("Hey")} title="Submit"/>
            </View>
        );
    }

    handlePickDate = async () => {
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: this.state.release_date,
                minDate: new Date(1890, 0, 1),
                maxDate: new Date() // Current date
            });
            if(action !== DatePickerAndroid.dismissedAction) {
                const selectedDate = new Date(year, month, day);
                this.setState({
                    release_date: selectedDate
                });
            }
        } catch ({code, message}) {
            Alert.alert("Cannot open date picker", message);
        }
    }
}