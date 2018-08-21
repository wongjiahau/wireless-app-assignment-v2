import React, { Component } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from "react-native";

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