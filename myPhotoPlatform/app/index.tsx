import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Animated, PanResponder, Image, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for icons
import { SidebarProvider, useSidebar } from "./context/SidebarContext"; // Import SidebarProvider and useSidebar
import { useTheme } from "./context/ThemeContext"; // Import useTheme
import ChatScreen from "./ChatScreen";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import AddScreen from "./screens/AddScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ReelScreen from "./screens/ReelScreen"; // Import ReelScreen

const Tab = createBottomTabNavigator();

function Tabs() {
  const { isSidebarOpen, closeSidebar, toggleSidebar } = useSidebar(); // Use sidebar context
  const { isDarkMode } = useTheme(); // Use theme context
  const translateX = React.useRef(new Animated.Value(0)).current; // Create animated value

  React.useEffect(() => {
    Animated.timing(translateX, {
      toValue: isSidebarOpen ? 1 : 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [isSidebarOpen]);

  const handleCloseSidebar = () => {
    Animated.timing(translateX, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start(() => {
      closeSidebar();
    });
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return gestureState.dx < -20;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dx < -50) {
        toggleSidebar();
      }
    },
  });

  return (
    <TouchableWithoutFeedback onPress={isSidebarOpen ? handleCloseSidebar : undefined}>
      <View style={{ flex: 1, flexDirection: 'row' }} {...panResponder.panHandlers}>
        <Animated.View style={[styles.content, {
          transform: [{
            translateX: translateX.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -240], // Adjust the value based on your chat page width
            }),
          }],
        }]}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              headerShown: false,
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                  iconName = focused ? 'home' : 'home-outline';
                } else if (route.name === 'Search') {
                  iconName = focused ? 'search' : 'search-outline';
                } else if (route.name === 'Add') {
                  iconName = focused ? 'add-circle' : 'add-circle-outline';
                } else if (route.name === 'Reel') {
                  iconName = focused ? 'film' : 'film-outline';
                } else if (route.name === 'Profile') {
                  return (
                    <Image
                      source={{ uri: 'https://picsum.photos/id/1010/300' }}
                      style={{ width: size, height: size, borderRadius: size / 2 }}
                    />
                  );
                }

                return (
                  <Text>
                    <Ionicons name={iconName} size={size} color={color} />
                  </Text>
                );
              },
              tabBarActiveTintColor: isDarkMode ? 'white' : 'black',
              tabBarInactiveTintColor: 'gray',
              tabBarStyle: { backgroundColor: isDarkMode ? 'black' : 'white' },
              tabBarShowLabel: false, // Hide the tab label
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Add" component={AddScreen} />
            <Tab.Screen name="Reel" component={ReelScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
          </Tab.Navigator>
        </Animated.View>
        {/* <ChatScreen /> */}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    zIndex: 0,
  },
});

export default function Index() {
  return (
    <SidebarProvider>
        <Tabs />
        <StatusBar />
    </SidebarProvider>
  );
}
