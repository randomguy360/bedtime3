import React from 'react';
import LottieView from 'lottie-react-native';

export default class LoginAnimation extends React.Component {
    render(){
        return(
            <LottieView 
                source = {require('../assets/login.json')}
                style = {{width: "60%"}}
                autoPlay loop />
        )
    }
}