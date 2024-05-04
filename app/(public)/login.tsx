import { useSignIn } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { View, StyleSheet, Button, Pressable, Alert, Text } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Card, Icon, TextInput } from "react-native-paper";
import SignInWithOAuth from "../components/SignInWithOAuth";

import LoginSVG from "../../public/imgg.svg";

import { withTheme } from "react-native-paper";
const Login = ({ navigation, theme }) => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });

      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      padding: 20,
      backgroundColor: theme.colors.background,
    },
    inputContainer: {
      borderRadius: 10,
      height: 60,
      overflow: "hidden",
      marginTop: 10,
    },
    inputField: {
      borderRadius: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      height: 62,
      overflow: "hidden",
    },
    button: {
      margin: 8,
      alignItems: "center",
    },
  });
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: theme.colors.background,
      }}
    >
      <View
        style={{
          paddingHorizontal: 25,
          backgroundColor: theme.colors.background,
        }}
      >
        <Spinner visible={loading} />
        <View style={{ alignItems: "center" }}>
          <LoginSVG
            height={200}
            width={200}
            style={{
              transform: [{ rotate: "-5deg" }],
              backgroundColor: theme.colors.background,
            }}
            fill={"#ffffff"}
          />
        </View>

        <Text
          style={{
            fontSize: 28,
            fontWeight: "500",
            color: theme.colors.primary,
            marginBottom: 30,
          }}
        >
          Login
        </Text>

        <View
          style={{
            ...styles.inputContainer,
          }}
        >
          <TextInput
            placeholder={"Email"}
            keyboardType={"email-address"}
            style={{ ...styles.inputField, flex: 1, paddingVertical: 0 }}
            left={<TextInput.Icon icon="email" />}
            onChangeText={setEmailAddress}
          />
        </View>
        <View
          style={{
            ...styles.inputContainer,
            flexDirection: "row",

            marginBottom: 10,
          }}
        >
          <TextInput
            onChangeText={setPassword}
            placeholder={"Password"}
            style={{ ...styles.inputField, flex: 1, paddingVertical: 0 }}
            secureTextEntry={true}
            left={<TextInput.Icon icon="eye" />}
          />
        </View>

        <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
          <Link href="/reset" asChild>
            <TouchableOpacity onPress={() => {}}>
              <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
                {"Forgot?"}
              </Text>
            </TouchableOpacity>
          </Link>
        </View>

        <TouchableOpacity
          onPress={onSignInPress}
          style={{
            backgroundColor: theme.colors.primary,
            padding: 20,
            borderRadius: 10,
            marginTop: 15,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontWeight: "700",
              fontSize: 16,
              color: theme.colors.background,
            }}
          >
            {"Login"}
          </Text>
        </TouchableOpacity>

        <Text
          style={{
            textAlign: "center",
            color: theme.colors.secondary,
            marginBottom: 30,
          }}
        >
          Or, login with ...
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignContent: "center",
            marginBottom: 30,
          }}
        >
          <SignInWithOAuth />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 30,
          }}
        >
          <Text style={{ color: theme.colors.secondary }}>New to the app?</Text>
          <Link href="/register" asChild>
            <TouchableOpacity>
              <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
                {" "}
                Register
              </Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default withTheme(Login);
