import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { PaperProvider, MD3DarkTheme } from "react-native-paper";
import InitialLayout from "./initialLayout";

const CLERK_PUBLISHABLE_KEY =
  "pk_test_ZGFybGluZy1wb2xsaXdvZy02MC5jbGVyay5hY2NvdW50cy5kZXYk";

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const RootLayout = () => {
  const theme = {
    ...MD3DarkTheme, // or MD3DarkTheme
    roundness: 2,
    colors: {
      ...MD3DarkTheme.colors,
    },
  };
  return (
    <PaperProvider theme={theme}>
      <ClerkProvider
        publishableKey={CLERK_PUBLISHABLE_KEY}
        tokenCache={tokenCache}
      >
        <InitialLayout />
      </ClerkProvider>
    </PaperProvider>
  );
};

export default RootLayout;
