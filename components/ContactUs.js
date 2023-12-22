import { StatusBar } from "expo-status-bar";
import React from "react";
import {Text, View, ScrollView} from 'react-native';

function ContactUs(){
    return (
        <ScrollView>
            <View style={{display:"flex", flexDirection:"column", flex:1, backgroundColor:"#FFC0CB"}}>
                <View style={{alignItems:"center", backgroundColor:"#fff", height:200, borderBottomLeftRadius:16, borderBottomRightRadius:16}}>
                    <Text style={{fontWeight:"bold", color:"orange",fontSize:20, marginTop:40}}>Contact Us</Text>
                </View>
                <View style={{display:"flex", flexDirection:"column"}}>
                    <View style={{borderRadius:16,marginTop:-100, marginLeft:35,alignItems:"flex-start", backgroundColor:"#00bfff", width:300, height:200}}>
                        <Text style={{fontWeight:"bold", color:"orange",fontSize:20, marginLeft:30, marginTop:20, textTransform:"uppercase", textDecorationStyle:"dashed"}}>Our Location</Text>
                        <Text style={{fontWeight:"bold", fontSize:20, marginLeft:30, color:"#fff"}}>Ladhies, Mosque</Text>
                        <Text style={{fontWeight:"bold", fontSize:20, marginLeft:30, color:"#fff"}}>Kamukunji, Nairobi</Text>
                        <Text style={{fontWeight:"bold", fontSize:20, marginLeft:30, color:"#fff"}}>Opp Kamukunji Police Station</Text>
                    </View>

                    <View style={{borderRadius:16,marginTop:50, marginLeft:35, backgroundColor:"#fff", width:300, height:200, alignContent:"center", zIndex:2}}>
                        <Text style={{fontWeight:"bold", color:"orange",fontSize:20, marginLeft:30,marginTop:20, textTransform:"uppercase", textDecorationStyle:"dashed"}}>Contact</Text>
                        <Text style={{fontWeight:"bold", fontSize:20, marginLeft:30, color:"#00bfff"}}>+254726107834</Text>
                        <Text style={{fontWeight:"bold", fontSize:20, marginLeft:30, color:"#00bfff"}}>+254725928305</Text>
                    </View>
                    <View style={{borderTopLeftRadius:16,borderTopRightRadius:16,backgroundColor:"#00bfff", height:250, marginTop:-100, zIndex:1}}>
                        <Text style={{fontWeight:"bold", fontSize:20, marginLeft:80, color:"#FFD700",marginTop:150}}>Quality is our Priority</Text>
                    </View>
                </View>

            </View>
        </ScrollView>
    )
}

export default ContactUs;
