import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Keyboard, Alert } from 'react-native';
import { firebase } from "../config";
import { FieldValue } from '@firebase/firestore';
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Button, Card } from "react-native-paper";
import Toast from "react-native-toast-message";

const PlaceOrder = ({ route }) => {
  const { userData, cake } = route.params;
  const navigation = useNavigation();
  const [cakeName, setCakeName] = useState(cake.cakeName);
  const [cakeImgUrl, setCakeImgUrl] = useState(cake.cakeImgurl);
  const [cakePrice, setCakePrice] = useState(cake.cakeAmount);
  const [cakeCategory, setCakeCategory] = useState(cake.cakeCategory);
  const [userFname, setUserFname] = useState(userData.firstname);
  const [userLastName, setUserLastName] = useState(userData.lastname);
  const [userPhone, setUserPhone] = useState(userData.phone);
  const [userEmail, setUserEmail] = useState(userData.email);
  const [cakeDeliverLocation, setCakeDeliveryLocation] = useState('');
  const [cakeDeliverTown, setCakeDeliveryTown] = useState('');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const showToast = () =>{
    Toast.show(
      {
        type: 'success',
        text1: "Order Success",
        text2:"Order Placed Successfully"
      }
    )
  }
  OrderCake = async (cakeName, cakeImgUrl,cakePrice,cakeCategory,userFname,userLastName,userPhone,cakeDeliverLocation,cakeDeliverTown) => {
    const orderTime = firebase.firestore.FieldValue.serverTimestamp();
    const addDoc = {
        cakeName: cakeName,
        cakeImgUrl: cakeImgUrl,
        cakePrice: cakePrice,
        cakeCategory: cakeCategory,
        userFname: userFname,
        userLastName: userLastName,
        userPhone: userPhone,
        userEmail: userEmail,
        cakeDeliveryLocation: cakeDeliverLocation,
        cakeDeliveryTown: cakeDeliverTown,
        orderDate: orderTime,
        status:"Not Delivered"
    }
    try {

      const docRef = await firebase.firestore().collection('orders').add(addDoc);
      if (docRef){
        alert(
          "Order Placed Successfully. Admin to Contact you soon for more details on the Order. Thank you"
        );
        console.log(
          "Order Placed successfully for customer: Document ID:",
          docRef.id
        );
        navigation.navigate("Orders", { userData });
      }else{
          alert("Order not placed");
      }
    } catch (error) {
      console.log("Error in placing an order for", userFname, userPhone, error);
    }
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 25,
            fontWeight: "bold",
            marginBottom: 5,
            color: "orange",
          }}
        >
          You are Placing an Order
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "bold",
            marginBottom: 15,
            color: "red",
          }}
        >
          Delivery Done Only in Nairobi
        </Text>

        <Image
          source={{ uri: cakeImgUrl }}
          onError={() => console.log("Error Loading Image to place order")}
          style={{ height: 270, width: 270 }}
        />
        <View style={{ width: 270, backgroundColor: "#FFf", marginTop: 10 }}>
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 15 }}
          >
            <FontAwesome name="check" size={24} color="orange" />
            <Text style={styles.txt}>{cakeName}</Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 15 }}
          >
            <Entypo name="price-tag" size={24} color="orange" />
            <Text style={{ marginLeft:15,fontSize: 18, fontWeight: "bold", color: "red" }}>
              Kshs. {cakePrice}
            </Text>
          </View>
          <View
            style={{ display: "flex", flexDirection: "row", marginLeft: 15 }}
          >
            <FontAwesome name="check" size={24} color="orange" />
          <Text style={styles.txt}>{cakeCategory}</Text>
          </View>
        </View>

        <TextInput
          style={styles.txtInpt}
          placeholder="Enter Address eg Airways, Utawala"
          onChangeText={(cakeDeliverLocation) =>
            setCakeDeliveryLocation(cakeDeliverLocation)
          }
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TextInput
          style={styles.txtInpt}
          placeholder="Enter Town eg Nairobi"
          onChangeText={(cakeDeliverTown) =>
            setCakeDeliveryTown(cakeDeliverTown)
          }
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              OrderCake(
                cakeName,
                cakeImgUrl,
                cakePrice,
                cakeCategory,
                userFname,
                userLastName,
                userPhone,
                cakeDeliverLocation,
                cakeDeliverTown
              )
            }
          >
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "#fff" }}>
              Confirm Order
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: "red",
              marginTop: 30,
              height: 40,
              width: 120,
              borderRadius: 50,
              marginRight: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => navigation.navigate("Dashboard")}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16, color: "#fff" }}>
              Cancel Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default PlaceOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor:"#FFF"
  },
  txtInpt: {
    borderBottomWidth: 2,
    borderBottomColor: "#00bfff",
    paddingTop: 20,
    paddingBottom: 10,
    width: 270,
    fontSize: 20,
    marginBottom: 10,
    marginLeft:20,
    marginRight:20,
  },
  button: {
    backgroundColor: "#00bfff",
    marginTop: 30,
    height: 40,
    width: 120,
    borderRadius: 50,
    marginRight:10,
    justifyContent: "center",
    alignItems: "center"
  },
  txt:{
    fontSize:18,
    fontWeight:"bold",
    color:"#00bfff",
    marginLeft:15
  }
});
