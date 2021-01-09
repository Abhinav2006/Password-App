import React from 'react';
import { Text, TextInput, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { Audio } from 'expo-av';
import db from '../config';
import firebase from 'firebase';
import HomeScreen from './HomeScreen';

export default class AddingPasswordScreen extends React.Component{
    constructor(){
        super();
        this.state = {usersName: "",
                appName: "",
                emailID: "",
                username: "",
                password: ""}
    }

    savedPasswords=()=>{
        this.savedref = db.collection("info")
        .onSnapshot((snapshot)=>{
            var savedPasswords = snapshot.docs.map((doc)=>doc.data())
            this.setState({savedPasswords:savedPasswords})
        })
    }

    saveDetails=()=>{
        var appName = this.state.appName
        var emailID = this.state.emailID
        var username = this.state.username
        var password = this.state.password
        db.collection('info').add({
            "appName": appName,
            "emailID": firebase.auth().currentUser.email,
            "emailForApp": emailID,
            "username": username,
            "password": password
        })
        this.setState({appName: '', emailID: '', username: '', password: ''})
        Alert.alert("Information saved successfully")
        this.props.navigation.navigate('HomeScreen')
    }

    //playSound = async ()=>{
    //    await Audio.Sound.createAsync(
    //        {uri: '../assets/correct.mp3'},
    //        {shouldPlay: true}
    //    )
    //    console.log("PlaySound");
    //}

    render(){
        return(
            <View>
            <View>
                <TextInput
                    style = {style.firstInput}
                    placeholder = {"App/Website's Name"}
                    onChangeText = {(text)=>{this.setState({appName:text})}}/>
                <TextInput
                    style = {style.nextInput}
                    placeholder = {"Email used for App/Website"}
                    onChangeText = {(text)=>{this.setState({emailID:text})}}
                    keyboardType = "email-address"/>
                <TextInput
                    style = {style.nextInput}
                    placeholder = {"Username used for App/Website"}
                    onChangeText = {(text)=>{this.setState({username:text})}}/>
                <TextInput
                    style = {style.nextInput}
                    placeholder = {"Password for App/Website"}
                    onChangeText = {(text)=>{this.setState({password:text})}}/>
            </View>
            <View>
                <TouchableOpacity style = {style.buttons} onPress = {()=>{this.props.navigation.navigate('HomeScreen')}}>
                    <Text style = {{padding: 6}}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style = {style.buttons}
                onPress = {()=>{this.saveDetails(this.state.appName, this.state.emailID, this.state.username, this.state.password)}
                }>
                    <Text style = {{padding: 6}}>Save</Text>
                </TouchableOpacity>
            </View>
            </View>
        )
    }
}

const style = StyleSheet.create({
    firstInput:{
        justifyContent: 'center',
        alignSelf: 'center',
        borderWidth: 2,
        marginTop: 50,
        width: 300,
        height: 30
    },
    nextInput:{
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
        width: 120,
        height: 30
    }
})