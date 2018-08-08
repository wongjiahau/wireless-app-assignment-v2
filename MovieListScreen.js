import React, { Component } from 'react';
import {
    ScrollView,
    ListView,
    View,
    Text
} from "react-native";
import { MovieItem } from './MovieItem';

export const MovieListScreen = (props) => {
    const movies = props.navigation.getParam("movies");
    return (
        <View>
            <Text>Movies</Text>
            {movies.map((x) => (
                <MovieItem 
                    movie={x}
                    navigation={props.navigation}
                    />
            ))}
        </View>
    )
}