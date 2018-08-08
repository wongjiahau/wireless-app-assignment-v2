import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from "react-native";
import { Database } from './database';

export const MovieItem = (props) => (
    <TouchableOpacity onPress={() => {
        Database.retrieveSpecificMovie(props.movie.id, (result) => {
            props.navigation.navigate("MovieScreen", {
                movie: result[0]
            });
        })
    }}>
        <View style={styles.view}>
            <Text style={styles.title}>{props.movie.title}</Text>
            <Text>Language: {props.movie.language}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    view: {
        borderWidth: 1,
        padding: 10,
        width: 300
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20
    }
});
