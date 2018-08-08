import React, { Component } from 'react';
import {
    View,
    Text
} from "react-native";

export const MovieItem = (props) => (
    <View>
        <Text>Title: {props.title}</Text>
        <Text>Language: {props.language}</Text>
    </View>
);