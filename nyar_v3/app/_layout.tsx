import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* <LinearGradient colors={['#6a11cb', '#2575fc']} style={{ flex: 1 ,paddingBottom:0,marginBottom:0}}> */}
        {/* <SafeAreaView style={{ flex: 1 , backgroundColor: 'transparent', marginBottom: -10}}> */}
          <Stack screenOptions={{ headerShown: false, gestureEnabled: true}} >
            <Stack.Screen name="(tabs)" options={{ headerShown: false}} />
            <Stack.Screen name="+not-found" />
            <Stack.Screen name="FAQs" />
            <Stack.Screen name="ImportGroups" />
            <Stack.Screen name="Account" />
          </Stack>
          <StatusBar style="auto" />
        {/* </SafeAreaView> */}
      {/* </LinearGradient> */}
    </ThemeProvider>
  );
}
