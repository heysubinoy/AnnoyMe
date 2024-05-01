import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { useAuth } from "@clerk/clerk-expo";
import Spinner from "react-native-loading-spinner-overlay";

const Profile = ({ navigation }) => {
  const { signOut } = useAuth();

  const [firstName, setFirstName] = useState("user.firstName");
  const [lastName, setLastName] = useState("");
  const doLogout = () => {
    signOut();
    console.log(navigation);
  };
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, []);

  const onSaveUser = async () => {
    try {
      // This is not working!
      const result = await user.update({
        firstName: "John",
        lastName: "Doe",
      });
      console.log("🚀 ~ file: profile.tsx:16 ~ onSaveUser ~ result:", result);
    } catch (e) {
      console.log(
        "🚀 ~ file: profile.tsx:18 ~ onSaveUser ~ e",
        JSON.stringify(e)
      );
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Spinner visible={true} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {user ? (
        <Text style={{ textAlign: "center" }}>
          Good morning {user.firstName} {user.lastName}!
        </Text>
      ) : null}

      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.inputField}
      />
      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.inputField}
      />
      <Button
        onPress={onSaveUser}
        title="Update account"
        color={"#6c47ff"}
      ></Button>
      <Button onPress={doLogout} color={"#6c47ff"} title="Logout"></Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 40,
  },
  inputField: {
    marginVertical: 4,
    height: 50,
    borderWidth: 1,
    borderColor: "#6c47ff",
    borderRadius: 4,
    padding: 10,
    backgroundColor: "#fff",
  },
});

export default Profile;
