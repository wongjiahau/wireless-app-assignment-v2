//http://stacktips.com/tutorials/react-native/creating-login-screen-in-react-native
import React, { Component } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet,
  Alert
} from 'react-native';
import { Logo } from './Logo';
import { Controller } from '../js/Controller';

export class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Logo/>
        <View style={styles.formContainer}>
          <TextInput style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType='email-address'
            returnKeyType="next"
            onChangeText={(text) => this.setState({email: text})}
            onSubmitEditing={() => this.passwordInput.focus()}
            placeholder='Email'
            placeholderTextColor='grey' />

          <TextInput style={styles.input}
            returnKeyType="go"
            ref={(input) => this.passwordInput = input}
            placeholder='Password'
            placeholderTextColor='grey'
            onChangeText={(text) => this.setState({password: text})}
            onEndEditing={this.handleLogin}
            secureTextEntry={true} />
          <TouchableOpacity style={styles.buttonContainer}
            onPress={this.handleLogin}>
            <Text style={styles.buttonText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  handleLogin = async () => {
    if(this.state.email.length === 0) {
      Alert.alert("Error", "Please fill in your email.");
    } else if(this.state.password.length === 0) {
      Alert.alert("Error", "Please fill in your password.");
    } else {
      try{
        await Controller.login({
          email: this.state.email,
          password: this.state.password
        });
        this.props.navigation.navigate("TaskListScreen");
      } catch(error) {
        Alert.alert("Error", error.message)
      }
    }
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