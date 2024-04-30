import { Ionicons } from "@expo/vector-icons";
import { Pressable } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Slot, useRouter, useSegments } from "expo-router";
import Meow from "./meow";
import Profile from "./profile";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import Home from "./home";


const TabsPage = ({ navigation }) => {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    navigation.navigate("login");
    return null;
  }
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,

        tabBarStyle: {
          height: 70,
          borderWidth: 1,
          borderTopEndRadius: 20,
          borderTopStartRadius: 20,
          borderColor: "#000",
          borderEndWidth: 2,
          borderStartWidth: 2,
          borderTopWidth: 2,
          borderBottomWidth: 2,

          opacity: 0.9,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
          marginBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="home"
        component={Home}
        initialParams={{ navigation: navigation, hi: "hello" }}
        options={{
          headerTitle: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          headerTitle: "Profile",

          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
          tabBarLabel: "My Profile",
          headerRight: () => <LogoutButton />,
        }}
      />
      <Tab.Screen
        name="meow"
        component={Meow}
        options={{
          headerTitle: "My Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
          tabBarLabel: "My Profile",
          headerRight: () => <LogoutButton />,
        }}
      />
    </Tab.Navigator>
  );
};

const StackPage = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={TabsPage} />
      <Stack.Screen name="Meow" component={Meow} />
    </Stack.Navigator>
  );
};

export default StackPage;
