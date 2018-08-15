/**
 * Name: Wong Jia Hau
 * Reg. No.: 1500181
 */
import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { Database } from './js/Database';

export const MovieItem = (props) => (
    <TouchableOpacity
        style={styles.view}
        onPress={() => {
            Database.retrieveSpecificMovie(props.id, (result) => {
                props.navigation.navigate("MovieScreen", {
                movie: result[0]
            });
        })
    }}>
        <View>
            <Text style={styles.title}>{props.title}</Text>
            <Text>Language: {props.language}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    view: {
        borderWidth: 1,
        padding: 10,
        alignSelf: 'stretch',
        borderRadius: 5,
        margin: 5,
        backgroundColor: "white",
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20
    }
});
