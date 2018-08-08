import React, { Component } from 'react';
import { Database } from './database';
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
import { formatDate } from './util';
import { CustomButton } from './HomeScreen';

const LANGUAGES = [
    "English",
    "Malay",
    "Mandarin",
    "Cantonese",
    "Japanese",
    "Korean"
];

export class AddMovieScreen extends Component {
    static navigationOptions = {
        title: "Add new movie"
    }
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            language: LANGUAGES[0],
            release_date: new Date()
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>Movie title</Text>
                <TextInput 
                    style={styles.field}
                    value={this.state.title}
                    onChangeText={(title) => {this.setState({title})}}
                    />

                <Text style={styles.header}>Language</Text>
                <Picker mode="dropdown"
                    style={styles.field}
                    selectedValue={this.state.language}
                    onValueChange={(itemValue, itemIdex) => {
                        this.setState({language: itemValue});
                    }}>
                    {LANGUAGES.map((x, index) => <Picker.Item key={index} label={x} value={x}/>)}
                </Picker>

                <Text style={styles.header}>Release date</Text>
                <TouchableOpacity
                    style={{paddingLeft: 10, marginBottom: 40}}
                    onPress={this.handlePickDate}>
                    <View>
                        <Text style={styles.field}>
                            {formatDate(this.state.release_date)}
                        </Text>
                    </View>
                </TouchableOpacity>
                <CustomButton onPress={() => {
                    if(!this.state.title) {
                        Alert.alert("Please fill in Movie Title.")
                        return;
                    }
                    Database.insertMovie({
                        title: this.state.title,
                        language: this.state.language,
                        release_date: this.state.release_date.getTime()
                    }, (result) => {
                        Alert.alert("Successfully added the movie into database!");
                        this.props.navigation.goBack();
                    })
                }} text="Submit"/>
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

const styles = StyleSheet.create({
    field: {
        alignSelf: "stretch",
        fontSize: 20,
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
