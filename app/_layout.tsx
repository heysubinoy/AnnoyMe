import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { Slot, useRouter, useSegments } from "expo-router";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";
import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";

import {
  PaperProvider,
  MD3DarkTheme as DefaultTheme,
} from "react-native-paper";

const CLERK_PUBLISHABLE_KEY =
  "pk_test_ZGFybGluZy1wb2xsaXdvZy02MC5jbGVyay5hY2NvdW50cy5kZXYk";

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === "(auth)";

    console.log("User changed: ", isSignedIn);

    if (isSignedIn && !inTabsGroup) {
      router.replace("/home");
    } else if (!isSignedIn) {
      router.replace("/login");
    }
  }, [isSignedIn]);

  return <Slot />;
};

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
  const { theme } = useMaterial3Theme();
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
