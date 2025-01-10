import { Stack } from "expo-router";
import { SidebarProvider } from "./context/SidebarContext"; // Import SidebarProvider
import { ThemeProvider } from "./context/ThemeContext"; // Import ThemeProvider

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SidebarProvider>
        <Stack screenOptions={{ headerShown: false, gestureEnabled: true }}>
          <Stack.Screen name="index" options={{ title: 'Home' }} />
          <Stack.Screen name="ChatScreen" options={{ title: 'Chat' }} />
        </Stack>
      </SidebarProvider>
    </ThemeProvider>
  )
}
