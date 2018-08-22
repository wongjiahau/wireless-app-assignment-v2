import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Logo } from './Logo';


export class WelcomeScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Logo/>
          <Text style={styles.welcome}>WELCOME</Text>
        </View>

        <View style={styles.formContainer}>
          <TouchableOpacity style={styles.button} onPress={()=>{
            this.props.navigation.navigate("LoginScreen");
          }}>
            <Text style={styles.text}> LOGIN</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={()=>{
            this.props.navigation.navigate("RegisterScreen");
          }}>
            <Text style={styles.text}> SIGN UP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20
  },
  loginContainer: {
    alignItems: 'center',
    flexGrow: 1,
  },
  logo: {
    width: 300,
    height: 100
  },
  formContainer: {
    flex: 1,
  },
  welcome: {
    padding: 10,
    fontSize: 70,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
  },
  button: {
    flex: 1,
    backgroundColor: 'lightblue',
    height: 80,
    margin: 10,
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'grey',
  },
});