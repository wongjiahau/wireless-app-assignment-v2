//http://stacktips.com/tutorials/react-native/creating-login-screen-in-react-native
import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView,Image, TextInput, TouchableOpacity, StyleSheet, } from 'react-native';
import { Logo } from './Logo';

export class RegisterScreen extends Component {
  static navigationOptions = {
    header: null
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Logo/>
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
            returnKeyType="next"
            onSubmitEditing={() => this.confirmPasswordInput.focus()}
            ref={(input) => this.passwordInput = input}
            placeholder='Password'
            placeholderTextColor='grey'
            secureTextEntry={true}/>
          <TextInput style={styles.input}
            returnKeyType="go"
            ref={(input) => this.confirmPasswordInput = input}
            placeholder='Confirm password'
            placeholderTextColor='grey'
            secureTextEntry={true}/>
          <TouchableOpacity style={styles.buttonContainer}
            onPress={this.props.onPressonButtonPress}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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