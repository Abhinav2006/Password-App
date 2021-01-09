import React from 'react';
import { Text, TouchableOpacity, TextInput, StyleSheet, View, Modal, Alert, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Header } from 'react-native-elements';
import db from '../config';
import firebase from 'firebase';
import HomeScreen from './HomeScreen'

export default class StartingScreen extends React.Component{
    constructor(){
        super();
        this.state = {emailID: "",
        password: "",
        firstName: "",
        lastName: "",
        confirmPassword: "",
        modalVisibility: 'false'}
    }

    logIn = (emailID, password)=>{
        firebase.auth().signInWithEmailAndPassword(emailID, password)
        .then(()=>{
            this.props.navigation.navigate('HomeScreen')
        }).catch((error)=>{
            var errorCode = error.code
            return Alert.alert(error.message)
        })
    }

    signUp = (emailID, password, confirmPassword)=>{
        if(password!=confirmPassword){
            Alert.alert("Passwords do not match")
        }else{
            firebase.auth().createUserWithEmailAndPassword(emailID, password)
            .then((response)=>{Alert.alert("User added")})
            db.collection('user').add({
                emailID: this.state.emailID,
                firstName: this.state.firstName,
                lastName: this.state.lastName
            })
        }
    }

    showModal=()=>{
        return(
            <Modal
            animationType = "bond"
            transparent = {true}
            visible = {this.state.modalVisibility}>
                <View style = {{flex: 1, alignSelf: 'center', justifyContent: 'center'}}>
                    <ScrollView style = {{width: '100%'}}>
                        <KeyboardAvoidingView>
                            <View style = {{marginTop: 300}}>
                                <Text>Make an Account</Text>
                            </View>
                            <TextInput style = {style.passwordInput}
                            placeholder = {"Email Address"}
                            onChangeText = {(text)=>{this.setState({emailID:text})}}
                            keyboardType = "email-address"/>
                            <TextInput style = {style.passwordInput}
                            placeholder = {"First Name"}
                            onChangeText = {(text)=>{this.setState({firstName:text})}}/>
                            <TextInput style = {style.passwordInput}
                            placeholder = {"Last Name"}
                            onChangeText = {(text)=>{this.setState({lastName:text})}}/>
                            <TextInput style = {style.passwordInput}
                            placeholder = {"Password"}
                            onChangeText = {(text)=>{this.setState({password:text})}}/>
                            <TextInput style = {style.passwordInput}
                            placeholder = {"Confirm Password"}
                            onChangeText = {(text)=>{this.setState({confirmPassword:text})}}/>
                            <TouchableOpacity style = {style.buttons} onPress = {()=>{this.signUp(this.state.emailID, this.state.password, this.state.confirmPassword)}}>
                                <Text>Register</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {style.buttons} onPress = {()=>{this.setState({modalVisibility: false})}}>
                                <Text>Cancel</Text>
                            </TouchableOpacity>
                        </KeyboardAvoidingView>
                    </ScrollView>
                </View>
            </Modal>
        )
    }

    render(){
        return(
            <View>
            <View>
            <Header centerComponent = {{text:'Passwords Safe',style:{color: 'blue', fontSize: 28, fontWeight: 'bold'}}}/>
            </View>
            <View>
                <View style = {{justifyContent: 'center', alignItems: 'center'}}>
                    {this.showModal()}
                </View>
                <TextInput style = {style.emailInput}
                placeholder = "Email"
                keyboardType = "email-address"
                onChangeText = {(text)=>{this.setState({emailID:text})}}/>
                <TextInput style = {style.passwordInput}
                placeholder = "Password"
                onChangeText = {(text)=>{this.setState({password:text})}}
                secureTextEntry = {true}/>
                <View>
                <TouchableOpacity style = {style.buttons} onPress = {()=>{this.logIn(this.state.emailID, this.state.password)}}>
                    <Text style = {{padding: 6}}>Log In</Text>
                </TouchableOpacity>
                <TouchableOpacity style = {style.buttons} onPress = {()=>{this.setState({modalVisibility: true})}}>
                    <Text style = {{padding: 6}}>Sign Up</Text>
                </TouchableOpacity>
                </View>
            </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    emailInput:{
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        marginTop: 50,
        width: 300,
        height: 30
    },
    passwordInput:{
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        marginTop: 10,
        width: 300,
        height: 30
    },
    buttons:{
        backgroundColor: 'cyan',
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: 5,
        width: 170,
        height: 30
    }
})