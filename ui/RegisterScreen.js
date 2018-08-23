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
          <TextInput style={styles.emailInput}
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
        this.props.navigation.navigate("LoginScreen");
      } catch (error) {
        Alert.alert("Error", error.message);
      }
    }
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
    justifyContent: 'center'
  },
  logo: {
    width: 300,
    height: 80
  },
  formContainer: {
    flex:1
  },
  emailInput:{
    height:40,
    marginBottom: 5,
    marginTop:50,
    padding: 10,
    color: 'black'
  },
  input: {
    height: 40,
    marginBottom: 5,
    padding: 10,
    color: 'black'
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