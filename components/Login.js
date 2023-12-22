import React, {useEffect, useState} from "react";
import {View, Text, Button, TextInput, StyleSheet, TouchableOpacity, Image, Platform, Alert, ToastAndroid} from 'react-native';
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import {firebase} from '../config';
import Register from "./Register";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import NetInfo from "@react-native-community/netinfo";
import Toast from "react-native-root-toast";

function Login(){
    const navigation = useNavigation();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [securePass, setSecurePass] = useState(true);
    const [isChecked, setIsChecked] = useState(false);
    const [connected,setConnected] = useState(false);

useEffect(()=>{
  const unsubscribe = NetInfo.addEventListener((state) => {
    if (state.isConnected) {
      setConnected(true);
    }
  });
  unsubscribe();
})

    useEffect(()=>{
        const showPassFun = () =>{
            if (isChecked){
                setSecurePass(false);
            }else{
                setSecurePass(true)
            }
        }
        showPassFun();
    },[isChecked])

    const loginUser = async(email,password) =>{
        try{
            await firebase.auth().signInWithEmailAndPassword(email,password);
            const user = firebase.auth().currentUser;
        }catch(error){
            console.log(error.message);
            alert("Error! Either your email/password is wrong or Account doesnt exist");
        }
    }
    return (
      <View style={styles.container}>
        <View style={{ width: "100%", height: 300 }}>
          <Image
            source={require("../assets/login.jpg")}
            style={{ width: "100%", height: 300 }}
          />
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={styles.icons}>
              <MaterialCommunityIcons name="email" size={16} color="#318ce7" />
            </View>

            <View style={styles.textInpView}>
              <TextInput
                style={styles.txtInpt}
                placeholder="Email"
                onChangeText={(email) => setEmail(email)}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />
            </View>
          </View>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <View style={styles.icons}>
              <FontAwesome5 name="key" size={16} color="#318ce7" />
            </View>

            <View style={styles.textInpView}>
              <TextInput
                style={styles.txtInpt}
                placeholder="Password"
                onChangeText={(password) => setPassword(password)}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={securePass}
              />
            </View>
          </View>
            <View style={{display:"flex", flexDirection:"row"}}>
                <Checkbox value={isChecked} onValueChange={()=>setIsChecked(!isChecked)}/>
                <Text style={{marginLeft:10}}>Show Password</Text>
            </View>
        </View>
        <TouchableOpacity
          onPress={() => {connected? loginUser(email, password):Toast.show("Connection poor", {duration:Toast.durations.LONG,position:Toast.positions.CENTER,animation:true})}}
          style={styles.button}
        >
          <Text style={{ fontWeight: "bold", fontSize: 22, color: "#fff" }}>
            Login
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Register")}
          style={{ marginTop: 20 }}
        >
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                marginTop: 7,
                marginRight: 10,
                color: "orange",
              }}
            >
              Don't have an Account?
            </Text>
            <Text style={{ color: "#318ce7", fontSize: 16, marginTop: 6 }}>
              Register
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("PasswordResetForm")}
        >
          <Text style={{ color: "green", marginTop: 20, fontSize: 15 }}>
            Forgoten Password? Reset
          </Text>
        </TouchableOpacity>
      </View>
    );
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  txtInpt: {
    borderBottomWidth: 2,
    borderBottomColor: "#318ce7",
    paddingTop: 10,
    paddingBottom: 10,
    width: 300,
    fontSize: 20,
    marginBottom: 10,
    marginLeft: -40,
    paddingLeft: 30,
    zIndex:2
  },
  button: {
    backgroundColor: "#318ce7",
    marginTop: 20,
    height: 40,
    width: 300,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  icons: {
    marginLeft: 0,
    paddingTop: 20,
  },
  textInpView: {
    marginLeft: 20,
  },
});
