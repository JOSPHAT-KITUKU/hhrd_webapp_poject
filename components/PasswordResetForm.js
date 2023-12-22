import React, { useEffect, useState } from "react";
import { ScrollView, TextInput, View ,Text,TouchableOpacity, StyleSheet}  from "react-native";
import {firebase} from '../config';
import { useNavigation } from "@react-navigation/native";

function PasswordResetForm(){
    const [email, setEmail] = useState("");
    const navigation = useNavigation();

   const generatePassword = async (email) => {
     try {
       await firebase.auth().sendPasswordResetEmail(email);
       alert("Password reset email sent");
       navigation.navigate("Login");
     } catch (error) {
       console.log(error.message);
       alert("Error sending email");
     }
   };
    return (
      <ScrollView>
        <View style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
            <Text style={{fontSize:20, fontWeight:"bold", marginTop:150}}>Enter Email to Reset Password</Text>
          <TextInput
            style={{ width: "90%", height: 50, borderColor: "#00bfff", borderWidth:2, marginTop:20,borderRadius:15,padding:15}}
            placeholder="Enter Email"
            onChangeText={(text)=>setEmail(text)}
          ></TextInput>
          <TouchableOpacity
            onPress={()=>{generatePassword(email)}}
            style={styles.button}
          >
            <Text style={styles.txt}>Reset</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
}

export default PasswordResetForm;

const styles = StyleSheet.create({
    button:{
        backgroundColor:"#00bfff",
        marginTop:30,
        height:40,
        width:150,
        borderRadius:50,
        justifyContent:"center",
        alignItems:"center",
    },
    txt:{
        color:"white",
        fontSize:20,
        fontWeight:"bold"
    }
});
