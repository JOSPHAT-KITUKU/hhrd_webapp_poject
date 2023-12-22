import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
} from "react-native";
import { firebase } from "../config";
import { FontAwesome } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function Register() {
  const SignupSchema = Yup.object().shape({
    firstname: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .test("no-email", "Invalid input", function (value) {
        return !Yup.string().email().isValidSync(value);
      })
      .required("Required"),
    lastname: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .test("no-email", "Invalid input", function (value) {
        return !Yup.string().email().isValidSync(value);
      })
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    phone: Yup.string()
      .matches(/^\d+$/, "Phone number must contain only digits")
      .min(10, "Phone number must be 10 digits")
      .max(10, "Phone number must be 10 digits")
      .required("Required"),
    password: Yup.string()
      .required("Required")
  });

  const createUser = async (values) => {
    const { email, password, firstname, lastname, phone,role="nuser" } = values;
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      await firebase.auth().currentUser.sendEmailVerification({
        handleCodeInApp: true,
        url: "https://hhrdcakes.firebaseapp.com",
      });
      await firebase
        .firestore()
        .collection("users")
        .doc(firebase.auth().currentUser.uid)
        .set({
          firstname,
          lastname,
          email,
          phone,
          role,
        });
      alert("Email Verification sent to your email");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <ScrollView>
      <Formik
        initialValues={{
          firstname: "",
          lastname: "",
          phone: "",
          email: "",
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={(values) => createUser(values)}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          isValid,
        }) => (
          <View style={styles.container}>
            <FontAwesome name="user-plus" size={100} color="#00bfff" />
            <Text style={{ fontWeight: "bold", fontSize: 28, color: "orange" }}>
              Register Page
            </Text>
            <View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={styles.icons}>
                  <FontAwesome5 name="user-tag" size={16} color="#00bfff" />
                </View>

                <View style={styles.textInpView}>
                  <TextInput
                    style={styles.txtInpt}
                    placeholder="First Name"
                    onChangeText={handleChange("firstname")}
                    onBlur={handleBlur("firstname")}
                    value={values.firstname}
                    autoCorrect={false}
                  />
                  {errors.firstname && touched.firstname && (
                    <Text style={styles.textError}>{errors.firstname}</Text>
                  )}
                </View>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={styles.icons}>
                  <FontAwesome5 name="user-tag" size={16} color="#00bfff" />
                </View>

                <View style={styles.textInpView}>
                  <TextInput
                    style={styles.txtInpt}
                    placeholder="Last Name"
                    onChangeText={handleChange("lastname")}
                    onBlur={handleBlur("lastname")}
                    value={values.lastname}
                    autoCorrect={false}
                  />
                  {errors.lastname && touched.lastname && (
                    <Text style={styles.textError}>{errors.lastname}</Text>
                  )}
                </View>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={styles.icons}>
                  <FontAwesome name="phone" size={16} color="#00bfff" />
                </View>

                <View style={styles.textInpView}>
                  <TextInput
                    style={styles.txtInpt}
                    placeholder="Phone Number"
                    onChangeText={handleChange("phone")}
                    onBlur={handleBlur("phone")}
                    value={values.phone}
                    autoCorrect={false}
                  />
                  {errors.phone && touched.phone && (
                    <Text style={styles.textError}>{errors.phone}</Text>
                  )}
                </View>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={styles.icons}>
                  <MaterialCommunityIcons
                    name="email"
                    size={16}
                    color="#00bfff"
                  />
                </View>

                <View style={styles.textInpView}>
                  <TextInput
                    style={styles.txtInpt}
                    placeholder="Email"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.textError}>{errors.email}</Text>
                  )}
                </View>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={styles.icons}>
                  <FontAwesome5 name="key" size={16} color="#00bfff" />
                </View>

                <View style={styles.textInpView}>
                  <TextInput
                    style={styles.txtInpt}
                    placeholder="Password"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.textError}>{errors.password}</Text>
                  )}
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
              <Text style={{ fontWeight: "bold", fontSize: 18, color: "#fff" }}>
                Register
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
      <View style={{ height: 200 }}>
        <Text></Text>
      </View>
    </ScrollView>
  );
}

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
  },
  txtInpt: {
    borderBottomWidth: 2,
    borderBottomColor: "#00bfff",
    paddingTop: 20,
    paddingBottom: 10,
    width: 300,
    fontSize: 20,
    marginBottom: 10,
    marginLeft: -40,
    paddingLeft: 30,
  },
  button: {
    backgroundColor: "#00bfff",
    marginTop: 30,
    height: 40,
    width: 120,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  icons: {
    marginLeft: 0,
    paddingTop: 30,
  },
  textInpView: {
    marginLeft: 20,
  },
  textError: {
    color: "red",
    fontSize: 15,
  },
});
