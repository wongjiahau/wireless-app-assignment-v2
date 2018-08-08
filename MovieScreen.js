import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Button
} from "react-native";

export const MovieScreen = (props) => {
    const movie = props.navigation.getParam("movie");
    const date = new Date(movie.release_date)
    return (
        <View>
            <Text>{movie.title}</Text>
            <Text>{movie.language}</Text>
            <Text>{date.toString()}</Text>
        </View>
    )

}