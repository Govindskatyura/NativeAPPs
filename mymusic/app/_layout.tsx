import { Stack } from "expo-router";
import PodcastScreen from "./screens/PodcastScreen";
import { PlayerProvider } from "./context/PlayerContext";
import { SidebarProvider } from "./context/SidebarContext"; // Import SidebarProvider

export default function RootLayout() {
  return (
    <PlayerProvider>
      <SidebarProvider>
        <Stack screenOptions={{ headerShown: false, gestureEnabled: true }}>
          <Stack.Screen name="index" options={{ title: 'Home' }} />
          <Stack.Screen name="PlayerScreen" options={{ presentation: 'modal' }} />
        </Stack>
      </SidebarProvider>
    </PlayerProvider>
  )
}
