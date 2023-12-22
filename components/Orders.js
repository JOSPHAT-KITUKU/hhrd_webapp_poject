import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, Image, StyleSheet } from "react-native";
import { firebase } from "../config";
import { where } from "firebase/firestore";
import { AntDesign } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Card } from "react-native-paper";

function Orders({ route }) {
  const { userData } = route.params;
  const [userEmail, setUserEmail] = useState(userData.email);
  const [orderedCakeData, setOrderedCakeData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firebase
          .firestore()
          .collection("orders")
          .where("userEmail", "==", userEmail)
          .get();
        const data = [];
        querySnapshot.forEach((doc) => {
          data.push(doc.data());
        });
        setOrderedCakeData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ordered cake data:", error);
        setLoading(false); // Set loading to false even in case of error
      }
    };

    fetchData();
  }, [userData.email]);

  if (loading) {
    return (
      <View style={{ alignItems: "center", marginTop: 200 }}>
        <StatusBar hidden/>
        <Text style={{ color: "red", fontSize: 26, fontWeight: "bold" }}>
          Loading Data
        </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <Card>
        {orderedCakeData.length > 0 ? (
          orderedCakeData.map((order, index) => (
            <View key={index} style={styles.containerRow}>
              <View style={{ margin: 2 }}>
                <Image source={{ uri: order.cakeImgUrl }} style={styles.img} />
              </View>
              <View style={styles.containerCol}>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.txttitle}>Cake Name:</Text>
                  <Text style={styles.txtApp}> {order.cakeName}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.txttitle}>Cake Price:</Text>
                  <Text style={styles.txtApp}>Kshs. {order.cakePrice}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.txttitle}>Category:</Text>
                  <Text style={styles.txtApp}>{order.cakeCategory}</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.txttitle}>Order Date:</Text>
                  <Text style={styles.txtApp}>
                    {order.orderDate.toDate().toLocaleString()}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.txttitle}>Delivery Location:</Text>
                  <Text style={styles.txtApp}>
                    {order.cakeDeliveryLocation}
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Text style={styles.txttitle}>Delivery Town: </Text>
                  <Text style={styles.txtApp}>{order.cakeDeliveryTown}</Text>
                  {order.status === "Not Delivered" ? (
                    <Text style={{ marginLeft: 20, color: "red" }}>
                      {order.status}
                    </Text>
                  ) : (
                    <Text style={{ marginLeft: 20, color: "green" }}>
                      {order.status}
                    </Text>
                  )}
                </View>
              </View>
            </View>
          ))
        ) : (
          <Text style={{ marginTop: 100, alignSelf: "center", fontSize: 22 }}>
            No Orders Made
          </Text>
        )}
      </Card>
    </ScrollView>
  );
}

export default Orders;

const styles = StyleSheet.create({
  txtApp: {
    color: "black",
    fontSize: 12,
  },
  txttitle:{
    fontWeight:"bold",
    marginRight:10,
    fontSize:12
  }
  ,
  containerRow: {
    backgroundColor: "white",
    borderColor: "lightgrey",
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "row",
    marginTop: 10,
    borderRadius: 16,
    height: 115,
    borderTopWidth: 3,
    borderStyle: "dotted",
  },
  containerCol: {
    backgroundColor: "white",
    borderColor: "white",
    borderBottomWidth: 1,
    display: "flex",
    flexDirection: "column",
    marginTop: 5,
    borderRadius: 16,
    marginLeft: 10,
    borderStyle: "dashed",
  },
  img: {
    height: 100,
    width: 100,
    marginLeft: 5,
    borderRadius: 16,
    marginTop:3
  },
});
