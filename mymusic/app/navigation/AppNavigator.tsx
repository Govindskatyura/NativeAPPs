import { Stack } from 'expo-router';

export default function AppNavigator() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Home' }} />
      <Stack.Screen name="PlayerScreen" options={{ presentation: 'modal' }}/>
    </Stack>
  );
}
