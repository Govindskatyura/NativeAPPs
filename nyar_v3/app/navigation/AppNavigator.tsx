import { Stack } from 'expo-router';
import HomeScreen from '../screens/HomeScreen';
import AccountScreen from '../Account';
import InviteFriendsScreen from '../screens/InviteFriendsScreen';
import RateUsScreen from '../screens/RateUsScreen';
import FAQsScreen from '../screens/FAQsScreen';
import ImportGroupsScreen from '../screens/ImportGroupsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LogoutScreen from '../screens/LogoutScreen';
import ContactUsScreen from '../ContactUs';

export default function AppNavigator() {
  return (
    <Stack>
      <Stack.Screen name="index" component={HomeScreen} />
      <Stack.Screen name="account" component={AccountScreen} />
      <Stack.Screen name="ContactUs" component={ContactUsScreen} />
      {/* <Stack.Screen name="InviteFriends" component={InviteFriendsScreen} />
      <Stack.Screen name="RateUs" component={RateUsScreen} />
      <Stack.Screen name="FAQs" component={FAQsScreen} />
      <Stack.Screen name="ImportGroups" component={ImportGroupsScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="Logout" component={LogoutScreen} /> */}
    </Stack>
  );
}