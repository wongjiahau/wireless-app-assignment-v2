/**
 * Name: Wong Jia Hau
 * Reg. No.: 1500181
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";

import { Database } from '../js/Database';


// Database.retrieveTask((result) => {
//     alert(JSON.stringify(result))
// });

// Database.reinitializeDatabase();

export const HomeScreen = (props) => (
    <View>
        <Text style={{fontSize: 25, textAlign: "center", marginTop: 50, marginBottom: 50}}>
            Welcome to the Movie App!
        </Text>
        <CustomButton text="View tasks" onPress={() => {
            props.navigation.navigate('TaskListScreen');
        }}/>
        <CustomButton text="Add new movie" onPress={() => 
            props.navigation.navigate('AddTaskScreen')
        }/>
    </View>
);

HomeScreen.navigationOptions = {
    title: "MovieApp"
}


export const CustomButton = (props) => (
    <TouchableOpacity style={{
        backgroundColor: "blue",
        alignSelf: "stretch",
        height: 50,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        paddingTop: 10,
        alignItems: "center",
        borderRadius: 5,
        }} onPress={props.onPress}>
        <Text style={{
            fontSize: 20,
            color: "white",
            fontWeight: "bold"
        }}>{props.text.toUpperCase()}</Text>
    </TouchableOpacity>
)