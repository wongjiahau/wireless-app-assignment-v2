//http://stacktips.com/tutorials/react-native/creating-login-screen-in-react-native
import React, { Component } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.loginContainer}>
          <Image resizeMode="contain" style={styles.logo} source={require('../images/logo.png')} />
        </View>
        <View style={styles.formContainer}>
          <TextInput style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType='email-address'
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            placeholder='Email'
            placeholderTextColor='grey' />

          <TextInput style={styles.input}
            returnKeyType="go"
            ref={(input) => this.passwordInput = input}
            placeholder='Password'
            placeholderTextColor='grey'
            secureTextEntry={true} />
          <TouchableOpacity style={styles.buttonContainer}
            onPress={this.props.onPressonButtonPress}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'black',
    padding: 20
  },
  loginContainer: {
    alignItems: 'center',
    flexGrow: 1,
    justifyContent: 'center'
  },
  logo: {
    width: 300,
    height: 100
  },
  formContainer: {
     
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(225,225,225,0.2)',
    marginBottom: 10,
    padding: 10,
    color: '#fff'
  },
  buttonContainer: {
    backgroundColor: '#2980b6',
    paddingVertical: 15
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700'
  }
});