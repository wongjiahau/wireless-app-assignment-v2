import React, { Component } from 'react';
import {
    ScrollView,
    ListView,
    View,
    Text
} from "react-native";
import { MovieItem } from './MovieItem';

export const MovieListScreen = (props) => (
    <View>
        {props.movies.map((x) => (
            <MovieItem 
                title={x.title}
                language={x.language}
                />
        ))}
    </View>
);