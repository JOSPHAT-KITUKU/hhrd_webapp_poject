import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {firebase} from './config';
import React, {useEffect, useState} from 'react';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import HeaderFile from './components/HeaderFile';
import PlaceOrder from './components/PlaceOrder';
import Orders from './components/Orders';
import ContactUs from './components/ContactUs';
import { StatusBar } from 'expo-status-bar';
import PasswordResetForm from './components/PasswordResetForm';
import HomeScreen from './components/HomeScreen';
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from 'react-native';
import * as Font from 'expo-font';
import {AppLoading} from 'expo';
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { RootSiblingParent } from "react-native-root-siblings";



const Stack = createStackNavigator();


function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();



  function onAuthStateChanged(user){
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(()=>{
    const userAuth = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return userAuth;
  },[]);

  if (initializing) return null;

  if (!user){
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: () => <HeaderFile name="Login" />,
            headerStyle: {
              backgroundColor: "#fff",
              height: 100,
            },
            headerTintColor: "#00bfff",
          }}
        />
        <Stack.Screen
          name="PasswordResetForm"
          component={PasswordResetForm}
          options={{
            headerStyle: {
              backgroundColor: "#00bfff",
            },
            headerTintColor: "white",
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerTitle: () => <HeaderFile name="Register" />,
            headerStyle: {
              backgroundColor: "#fff",
              height: 100,
            },
            headerTintColor: "#00bfff",
          }}
        />
      </Stack.Navigator>
    );
  }
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: "#fff",
            height: 100,
          },
          headerTintColor: "#00bfff",
          headerShown: false,
          headerTitle: () => (
            <HeaderFile
              user={
                <Icon name="user" type="font-awesome" size={24} color="#fff" />
              }
              orderbtn={
                <Button
                  title="Orders"
                  onPress={() => navigation.navigate("Orders")}
                />
              }
            />
          ),
        })}
      />
      <Stack.Screen
        name="PlaceOrder"
        component={PlaceOrder}
        options={{
          headerTitle: () => <HeaderFile name="PlaceOrder" />,
          headerStyle: {
            backgroundColor: "#fff",
            height: 100,
          },
          headerTintColor: "#00bfff",
        }}
      />
      <Stack.Screen
        name="Orders"
        component={Orders}
        options={{
          headerTitle: () => <HeaderFile name="Orders Page" />,
          headerStyle: {
            backgroundColor: "#fff",
            height: 100,
          },
          headerTintColor: "#00bfff",
        }}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          headerTitle: () => <HeaderFile name="Contact Us" />,
          headerStyle: {
            backgroundColor: "#fff",
            height: 100,
          },
          headerTintColor: "#00bfff",
        }}
      />
    </Stack.Navigator>
  );
}

export default ()=>{

    return(
      <NavigationContainer>
        <RootSiblingParent>
        <StatusBar/>
        <App/>
        </RootSiblingParent>
      </NavigationContainer>
    )
}
