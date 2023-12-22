import React, {useEffect,useState,useRef} from "react";
import {View, Text, StyleSheet,SafeAreaView, TouchableOpacity, ScrollView,Image} from 'react-native';
import {firebase} from "../config";
import PlaceOrder from "./PlaceOrder";
import Orders from "./Orders";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Card, Button, IconButton} from "react-native-paper";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import Swiper from 'react-native-swiper';
import UserAvatar from "@muhzi/react-native-user-avatar";
import { FontAwesome } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import AuthService from "../backend/accessToken";
import Mpay from "../backend/Mpay";
import GenerateToken from "../backend/GenerateToken";
import { encode } from "base-64";
import HandlePay from "./GenerateToken";

function Dashboard(){
    const navigation = useNavigation();
    const [userData, setUserData] = useState(null); // Initialize userData as null
    const [loading, setLoading] = useState(true); // Add loading state
    const [cakeData, setCakeData] = useState(null); // Initialize userData as null
    const [cakeloading, setCakeLoading] = useState(true); // Add loading state
    const [orderedCakeData, setOrderedCakeData] = useState([]);
    const [userLoading,setUserLoading] = useState(true);
    const [visible, setVisible] = useState(false);
    const [token, setAccessToken] = useState([]);

    const scrollViewRef = useRef(null);

    const scrollToTop = () => {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ y: 0, animated: true });
      }
    };
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("cakes")
      .onSnapshot((snapshot) => {
        if (!snapshot.empty) {
          const cakeData = [];
          snapshot.forEach((doc) => {
            cakeData.push(doc.data());
          });
          setCakeData(cakeData);
        } else {
          alert("No cakes found.");
        }
        setCakeLoading(false);
      });

    return () => {
      // Unsubscribe the snapshot listener when the component unmounts
      unsubscribe();
    };
  }, []);
useEffect(() => {
  const unsubscribe = firebase
    .firestore()
    .collection("users")
    .doc(firebase.auth().currentUser.uid)
    .onSnapshot(
      (snapshot) => {
        if (snapshot.exists) {
          setUserData(snapshot.data());
        }
        setUserLoading(false); // Update loading state once data is fetched
      },
      (error) => {
        console.log("Error fetching user data:", error);
        setUserLoading(false); // Update loading state on error
      }
    );

  return () => {
    unsubscribe(); // Cleanup by unsubscribing when the component unmounts
  };
}, []);
  if (loading && cakeloading) {
    return (
      <SafeAreaView
        style={{ backgroundColor: "#fff", alignItems: "center", flex: 1 }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 25, marginTop: 300,marginBottom:20 }}>
          Loading Data...
        </Text>
        <ActivityIndicator animating={true} color={"#00bfff"} size={"large"} />
      </SafeAreaView>
    );
  }
    return (
      <View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            height: 70,
            width: "97%",
            marginLeft: 5,
            alignItems: "center",
            borderColor: "lightgrey",
            backgroundColor: "#fff",
            marginTop: 36,
          }}
        >
          <View>
            <Text>
              {userData && userData.firstname ? (
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    color: "#00bfff",
                    marginTop: 7,
                  }}
                >
                  Welcome,{" "}
                  <Text style={{ color: "orange" }}>{userData.firstname}</Text>
                </Text>
              ) : (
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 16,
                    color: "#00bfff",
                    marginTop: 7,
                  }}
                >
                  Welcome
                </Text>
              )}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => setVisible(!visible)}
              style={{ marginRight: 5 }}
            >
              <UserAvatar
                userName={userData ? userData.firstname : "User"}
                size={40}
                backgroundColor={"orange"}
                src={null}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={HandlePay}>
              <Text style={{fontSize:20}}>Pay</Text>
            </TouchableOpacity>
          </View>
        </View>

        {visible ? (
          <View
            style={{
              position: "absolute",
              marginTop: 60,
              zIndex: 1,
              left: "70%",
              top: 50,
              backgroundColor: "white",
              borderColor: "lightgrey",
              width: 100,
              height: 100,
              borderRadius: 10,
              display: "flex",
              alignItems: "center",
            }}
          >
            <View
              style={{
                marginTop: 10,
                marginBottom: 3,
                borderBottomColor: "grey",
                borderBottomWidth: 1,
                borderStyle: "dotted",
              }}
            >
              <TouchableOpacity>
                <Text>Edit Profile</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => {
                firebase.auth().signOut();
              }}
              style={{
                height: 30,
                width: 70,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 5,
                borderBottomColor: "grey",
                borderBottomWidth: 1,
                borderStyle: "dotted",
                display: "flex",
                flexDirection: "row",
              }}
            >
              <Text style={{ marginRight: 5 }}>Logout</Text>
              <FontAwesome name="sign-out" size={24} color="orange" />
            </TouchableOpacity>
          </View>
        ) : null}

        <Card></Card>
        <ScrollView ref={scrollViewRef}>
          <Swiper autoplay={true} style={{ height: 250 }}>
            <View>
              <Card
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 5,
                  marginBottom: 15,
                }}
              >
                <Card.Cover
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/hhrdcakes.appspot.com/o/hhrdcakesimages%2Fgeneral_pic.jpg?alt=media&token=2b73d663-708b-440a-920b-46777c8b527e",
                  }}
                  style={{ width: "96%", marginLeft: 9 }}
                ></Card.Cover>
              </Card>
            </View>
            <View>
              <Card
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 5,
                  marginBottom: 15,
                }}
              >
                <Card.Cover
                  source={{
                    uri: "https://firebasestorage.googleapis.com/v0/b/hhrdcakes.appspot.com/o/hhrdcakesimages%2Fgeneral_pic.jpg?alt=media&token=2b73d663-708b-440a-920b-46777c8b527e",
                  }}
                  style={{ width: "96%", marginLeft: 9 }}
                ></Card.Cover>
              </Card>
            </View>
          </Swiper>

          <View
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            {cakeData && cakeData.length > 0 ? (
              cakeData.map((cake, index) => (
                <Card key={index} style={styles.cakeContainer}>
                  <Card.Cover
                    style={styles.cakeImage}
                    source={{ uri: cake.cakeImgurl }}
                  />
                  <Card.Content>
                    <View style={styles.cakeDetails}>
                      <Text style={styles.cakeText}>{cake.cakeName}</Text>
                      <Text style={styles.cakeText}>{cake.cakeCategory}</Text>
                      <Text style={styles.cakePrice}>
                        Kshs. {cake.cakeAmount}
                      </Text>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate("PlaceOrder", { userData, cake })
                        }
                        style={styles.orderBtn}
                      >
                        <Text style={styles.orderBtnText}>Order</Text>
                      </TouchableOpacity>
                    </View>
                  </Card.Content>
                </Card>
              ))
            ) : (
              <Text>No cakes available</Text>
            )}
          </View>
          <View style={{ height: 200 }}>
            <TouchableOpacity
              onPress={scrollToTop}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "bold" }}>Go Top</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View
          style={{
            position: "absolute",
            bottom: 106,
            width: "97%",
            marginLeft: 5,
            backgroundColor: "#00bfff",
            height: 60,
            zIndex: 1,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Orders", { userData })}
            style={{
              height: 30,
              width: 70,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 5,
              flexDirection: "column",
              marginLeft: 10,
            }}
          >
            <Button
              icon="clipboard-list-outline"
              style={{ fontSize: 70 }}
            ></Button>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "#0e172c",
              }}
            >
              My Orders
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("ContactUs")}
            style={{
              height: 30,
              width: 70,
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 5,
              flexDirection: "column",
              marginLeft: 10,
            }}
          >
            <MaterialCommunityIcons
              name="account-circle"
              size={20}
              color={"white"}
            />
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "#0e172c",
              }}
            >
              Contacts
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
}

export default Dashboard;

const styles = StyleSheet.create({
    container:{
        marginTop:10,
        display:"flex",
        flexDirection:"row",
        flexWrap: "nowrap",
        borderBottomWidth:1,
        borderColor:"lightgrey",
        marginLeft:10,
        marginRight:10,
        width:230,
        height:50,
        zIndex:2,
        backgroundColor:"#00bfff"

    },
    button:{
        backgroundColor:"orange",
        marginTop:30,
        height:30,
        width:55,
        borderRadius:50,
        justifyContent:"center",
        alignItems:"center",
        marginTop:5,
    },
    cakeContainer:{
      display:"flex",
      flexDirection:"row",
      borderColor:"lightgrey",
      alignContent:"center",
      marginTop:10,
      backgroundColor:"#fff",
      borderRadius:16,
      width:"47%",
      height:300,
      marginRight:5,
      marginLeft:5,
    },
    cakeText:{
      textAlign:"left",
      fontSize:11,
      fontWeight:600,
      textTransform:"capitalize",
      marginTop:5,
    },
    cakePrice:{
      color:"red",
      fontStyle:"italic",
      fontWeight:"bold",
    },
    orderBtn:{
      backgroundColor:"orange",
      height:30,
      width:70,
      alignSelf:"center",
      borderRadius:50,
      justifyContent:"center",
      alignItems:"center",
    },
    cakeImage:{
      width:165,
      resizeMode:"cover",
      alignSelf:"center",
      marginLeft:2,
      marginTop:2
    }
})
