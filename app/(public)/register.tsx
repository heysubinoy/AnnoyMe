import {
  Button,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Text,
} from "react-native";
import { TextInput, withTheme } from "react-native-paper";
import { useSignUp } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";
import { useState } from "react";
import { Link, Stack } from "expo-router";
import LoginSVG from "../../public/imgg.svg";
import SignInWithOAuth from "../components/SignInWithOAuth";

const Register = ({ theme }) => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  // Create the user and send the verification email
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  // Verify the email address
  const onPressVerify = async () => {
    console.log("Verifying email address");
    if (!isLoaded) {
      console.log("Not loaded");
      return;
    }
    setLoading(true);

    try {
      console.log("Attempting email verification");
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      console.log(code);
      console.log(completeSignUp);
      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.log(err.errors[0]);
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
    <View
      style={{ ...styles.container, backgroundColor: theme.colors.background }}
    >
      <Stack.Screen options={{ headerBackVisible: !pendingVerification }} />
      <Spinner visible={loading} />

      {!pendingVerification && (
        <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignItems: "center" }}>
              <LoginSVG
                height={250}
                width={250}
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
              Register
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

            <Text
              style={{
                textAlign: "center",
                color: theme.colors.secondary,
                marginBottom: 30,
              }}
            >
              Or, register with email ...
            </Text>

            <View
              style={{
                ...styles.inputContainer,
                flexDirection: "row",
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
            <TouchableOpacity
              onPress={onSignUpPress}
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
                {"Register"}
              </Text>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginBottom: 30,
              }}
            >
              <Text style={{ color: theme.colors.secondary }}>
                Already registered?
              </Text>
              <Link href="/login" asChild>
                <TouchableOpacity>
                  <Text style={{ color: "#AD40AF", fontWeight: "700" }}>
                    {" "}
                    Login
                  </Text>
                </TouchableOpacity>
              </Link>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}

      {pendingVerification && (
        <>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              onChangeText={setCode}
            />
          </View>
          <TouchableOpacity
            onPress={onPressVerify}
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
              {"Verify"}
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default withTheme(Register);
