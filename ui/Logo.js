import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView,Image, TextInput, TouchableOpacity, StyleSheet, } from 'react-native';
export const Logo = (props) => (
  <View style={styles.loginContainer}>
    <Image resizeMode="contain" style={styles.logo} source={require('../images/logoWhite.png')} />
    <Text style={{color: 'black', textAlign: 'center', marginTop: 5}}>Task Reminder</Text>
  </View>
);

const styles = StyleSheet.create({
  loginContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 300,
    height: 100
  },
});