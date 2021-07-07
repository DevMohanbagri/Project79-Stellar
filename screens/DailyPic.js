import React, {Component} from 'react';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground, Linking, TouchableOpacity,Image,StatusBar, Platform } from 'react-native';
import axios from 'axios';

export default class DailyPic extends Component{
    constructor(props){
        super(props)
        this.state={
            DayApi: {}
        }
    }

    getDayApi=()=>{
        axios
            .get("https://api.nasa.gov/")
            .then(response=>{
                this.setState ({
                    DayApi: response.data
                })
            })
            .catch(error => {
                alert(error.message)
            })
        }

        componentDidMount(){
           this.getDayApi()
        }
    render(){
        return(
            <View style = {styles.container}>
                <SafeAreaView style = {styles.drawoidSafeArea}/>
                <ImageBackground source={require('../assets/stars.gif')} style = {styles.backgroundImage}>
                <Text style = {styles.routeText}>Astronomy picture of the day</Text>
                <Text style = {styles.titleText}>{this.state.DayApi.title}</Text>

                <TouchableOpacity style = {styles.routeCard} onPress={()=>{
                    Linking.openURL(this.state.DayApi.url).catch(err => console.log("Couldn't load image",err))
                }}>

                <View>
                    <Image source={require('../assets/play-video.png')} style = {{width :50, height: 50}}></Image>
                </View>
                </TouchableOpacity>

                <Text style = {styles.container}>{this.state.DayApi.explanation} </Text>

                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
    }, 
    droidSafeArea:{
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0  ,
    },

    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },

    titleText:{
        fontWeight: 'bold',
        fontSize: 40,
        color: 'white'

        
    },
    routeCard: {
        flex: 0.25,
        marginLeft: '25%',
        marginRight: '25%',
        marginTop: 50,
        borderRadius: 30,
        backgroundColor: 'white',
      
    },
    routeText:{
        fontSize: 35,
        fontWeight: "bold",
        color: "black",
        marginTop: 75,
        paddingLeft: 30
    },
    
    backgroundImage:{
        flex : 1,  
        resizeMode: 'cover',
    },
    iconImage: {
        position: "absolute",
        height: 200,
        width: 200,
        resizeMode: "contain",
        right: 20,
        top: -40,

    }
    
  });