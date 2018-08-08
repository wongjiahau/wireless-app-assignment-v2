import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Button
} from "react-native";
import { formatDate } from './util';

export const MovieScreen = (props) => {
    const movie = props.navigation.getParam("movie");
    const date = formatDate(new Date(movie.release_date));
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Title</Text>
            <Text style={styles.title}>{movie.title}</Text>
            <Text style={styles.header}>Language</Text>
            <Text style={styles.subtitle}>{movie.language}</Text>
            <Text style={styles.header}>Release date</Text>
            <Text style={styles.subtitle}>{date}</Text>
        </View>
    )

}

MovieScreen.navigationOptions = {
    title: "Movie"
}

const styles = StyleSheet.create({
    container: {
        padding: 30
    },
    header: {
        fontSize: 15
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        marginBottom: 10,
        color: "black"
    },
    subtitle: {
        fontSize: 20,
        marginBottom: 10,
        color: "black"
    },
});