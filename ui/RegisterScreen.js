//http://stacktips.com/tutorials/react-native/creating-login-screen-in-react-native
import React, { Component } from 'react';
import { 
  View, 
  Text, 
  KeyboardAvoidingView,
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert
} from 'react-native';
import { Logo } from './Logo';
import { Controller } from '../js/Controller';

export class RegisterScreen extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      password2: ""
    }
  }
  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <Logo/>
        <View style={styles.formContainer}>
          <TextInput style={styles.input}
            value={this.state.email}
            autoCapitalize="none" 
            autoCorrect={false}
            keyboardType='email-address'
            returnKeyType="next" 
            onChangeText={(email) => this.setState({email})}
            onSubmitEditing={() => this.passwordInput.focus()}
            placeholder='Email'
            placeholderTextColor='grey' />

          <TextInput style={styles.input}
            value={this.state.password}
            returnKeyType="next"
            onChangeText={(password) => this.setState({password})}
            onSubmitEditing={() => this.confirmPasswordInput.focus()}
            placeholder='Password'
            ref={(input) => this.passwordInput = input}
            placeholderTextColor='grey'
            secureTextEntry={true}/>

          <TextInput style={styles.input}
            value={this.state.password2}
            returnKeyType="go"
            onChangeText={(password2) => this.setState({password2})}
            ref={(input) => this.confirmPasswordInput = input}
            placeholder='Confirm password'
            placeholderTextColor='grey'
            onEndEditing={this.handleRegister}
            secureTextEntry={true}/>
          <TouchableOpacity style={styles.buttonContainer}
            onPress={this.handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }

  handleRegister = async () => {
    if(this.state.email.length === 0) {
      Alert.alert("Error", "Please fill in your Email.");
    } else if(this.state.password.length === 0) {
      Alert.alert("Error", "Please fill in password");
    } else if(this.state.password !== this.state.password2) {
      Alert.alert("Error", "Passwords are not matching");
    } else {
      try {
        await Controller.register({
          email: this.state.email,
          password: this.state.password
        });
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    }
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