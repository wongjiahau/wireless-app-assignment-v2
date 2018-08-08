import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Button
} from "react-native";
import { sampleData } from './sampleData';
import { Database } from './database';

export const HomeScreen = (props) => (
    <View style={styles.view}>
        <Text>Home Screen</Text>
        <Button title="View movies" onPress={() => 
            Database.retrieveMovie((movies) => {
                props.navigation.navigate('MovieListScreen', {
                    movies: movies
                })
            })
        }/>
        <Button title="Add new movie" onPress={() => 
            props.navigation.navigate('AddMovieScreen', {
                movies: sampleData()
            })
        }/>
    </View>
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
