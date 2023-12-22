import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Dashboard from "./Dashboard";
import Orders from "./Orders";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import PlaceOrder from "./PlaceOrder";
import ContactUs from "./ContactUs";


const Tab = createBottomTabNavigator();

function HomeScreen(){
    return (
      <Tab.Navigator>
        <Tab.Screen name="PlaceOrder" component={PlaceOrder} />
        <Tab.Screen name="Orders" component={Orders} />
        <Tab.Screen name="ContactUs" component={ContactUs} />
      </Tab.Navigator>
    );
}

export default HomeScreen;
