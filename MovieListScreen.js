import React, { Component } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet
} from "react-native";
import { MovieItem } from './MovieItem';

export const MovieListScreen = (props) => {
    const movies = props.navigation.getParam("movies");
    return (
        <ScrollView style={styles.container}>
            {movies.map((x) => (
                <MovieItem 
                    id={x.id}
                    title={x.title}
                    language={x.language}
                    navigation={props.navigation}
                    />
            ))}
        </ScrollView>
    )
}

MovieListScreen.navigationOptions = {
    title: "View movies"
}

const styles = StyleSheet.create({
    container: {
        padding: 15
    }
})