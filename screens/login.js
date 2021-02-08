import React, {Component} from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert, KeyboardAvoidingView } from 'react-native';
import db from '../config';
import firebase from 'firebase';
import AppHeader from '../components/AppHeader';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import ReadingScreen from './read';
import WritingScreen from './write';
import styles from '../styles';
import LoginAnimation from '../components/loginAnimation';

export default class LoginScreen extends Component {
  constructor(){
    super();
    this.state={
      email : '',
      password: '',
      login:'',
      signIn:''
    }
  }

  userLogin = (emailId, password)=>{
    firebase.auth().signInWithEmailAndPassword(emailId, password).then(()=>{
      //return Alert.alert("You have Successfully Logged In");
      //return <AppContainer />
      return this.setState({
        login: 'true'
      });
      Alert.alert("You have Successfully Logged In");

    }).catch((error)=> {
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }

  userSignUp = (emailId, password) =>{
    firebase.auth().createUserWithEmailAndPassword(emailId, password).then((response)=>{
      //return Alert.alert("You have Successfully Signed In");
      this.setState({
        signIn: 'true'
      });
      Alert.alert("You have Successfully Signed In");
    }).catch(function(error) {
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    });
  }


  render(){
    if(this.state.login === '' && this.state.signIn === ''){
      return(
          <KeyboardAvoidingView style={styles.container}>
              <AppHeader />
              <TextInput
                style={styles.bar}
                placeholder="  example@domain.com"
                placeholderTextColor = "#acd"
                keyboardType ='email-address'
                onChangeText={(text)=>{
                  this.setState({
                    emailId: text
                  })
                }}
              />
      
              <TextInput
                style={styles.bar}
                secureTextEntry = {true}
                placeholder="  Password"
                placeholderTextColor = "#acd"
                onChangeText={(text)=>{
                  this.setState({
                    password: text
                  })
                }}
              />
              <TouchableOpacity
                style={styles.button}
                onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
              >
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.userSignUp(this.state.emailId, this.state.password)}}
              >
                <Text style={styles.buttonText}>SignUp</Text>
              </TouchableOpacity>
          </KeyboardAvoidingView>
        )
    }else {
      return(
          <AppContainer />
      )
    }
  }
}

//<LoginAnimation />

const TabNavigator = createBottomTabNavigator({
READ: {screen: ReadingScreen},
WRITE: {screen: WritingScreen}
},
{
defaultNavigationOptions: ({navigation})=>({
tabBarIcon:()=>{
    const routeName = navigation.state.routeName;
    if(routeName === "READ"){
    return(
        <Image
        source={require("../images/read.png")}
        style={{width:35, height:35}}
    />
    )
    
    }
    else if(routeName === "WRITE"){
    return(
        <Image
        source={require("../images/write.png")}
        style={{width:35, height:30}}
    />)
    
    }
}
})
}
);

const AppContainer =  createAppContainer(TabNavigator);

            /*
            <View>
              <TextInput
              style={styles.bar}
              placeholder="example@domain.com"
              placeholderTextColor = "#ffff"
              keyboardType ='email-address'
              onChangeText={(text)=>{
                this.setState({
                  emailId: text
                })
              }}
            />
    
            <TextInput
              style={styles.bar}
              secureTextEntry = {true}
              placeholder="password"
              placeholderTextColor = "#ffff"
              onChangeText={(text)=>{
                this.setState({
                  password: text
                })
              }}
            />
                <TouchableOpacity
                style={styles.button}
                onPress = {()=>{this.userLogin(this.state.emailId, this.state.password)}}
                >
                <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.userSignUp(this.state.emailId, this.state.password)}}
                >
                <Text style={styles.buttonText}>SignUp</Text>
                </TouchableOpacity>
            </View>
            */