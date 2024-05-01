import { View, StyleSheet, Button, TouchableOpacity, Text } from "react-native";
import { TextInput, withTheme } from "react-native-paper";
import React, { useState } from "react";
import { Stack } from "expo-router";
import { useSignIn } from "@clerk/clerk-expo";

const PwReset = ({ theme }) => {
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();
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
  // Request a passowrd reset code by email
  const onRequestReset = async () => {
    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });
      setSuccessfulCreation(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      console.log(result);
      alert("Password reset successfully");

      // Set the user session active, which will log in the user automatically
      await setActive({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />

      {!successfulCreation && (
        <>
          <Text
            style={{
              textAlign: "center",
              fontSize: 35,
              marginBottom: 20,
              color: theme.colors.primary,
            }}
          >
            Reset Password
          </Text>
          <View style={{ ...styles.inputContainer }}>
            <TextInput
              autoCapitalize="none"
              placeholder="Your Email"
              value={emailAddress}
              onChangeText={setEmailAddress}
              style={styles.inputField}
            />
          </View>
          <TouchableOpacity
            onPress={onRequestReset}
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
              {"Reset"}
            </Text>
          </TouchableOpacity>
        </>
      )}

      {successfulCreation && (
        <>
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 35,
                marginBottom: 20,
                color: theme.colors.primary,
              }}
            >
              New Password
            </Text>
            <View style={{ ...styles.inputContainer }}>
              <TextInput
                keyboardType="number-pad"
                placeholder="Code"
                value={code}
                onChangeText={setCode}
                style={styles.inputField}
              />
            </View>
            <View style={{ ...styles.inputContainer }}>
              <TextInput
                placeholder="New password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.inputField}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={onReset}
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
              {"Confirm"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default withTheme(PwReset);
