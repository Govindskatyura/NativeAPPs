import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback, Animated, PanResponder } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import SearchScreen from "./screens/SearchScreen";
import LibraryScreen from "./screens/LibraryScreen";
import { StatusBar } from 'expo-status-bar';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for icons
import { SidebarProvider, useSidebar } from "./context/SidebarContext"; // Import SidebarProvider and useSidebar
import { Text, TouchableOpacity } from "react-native";
import Sidebar from "./components/Sidebar";

const Tab = createBottomTabNavigator();

function Tabs() {
  const { isSidebarOpen, closeSidebar, toggleSidebar } = useSidebar(); // Use sidebar context
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
      return gestureState.dx > 20;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dx > 50) {
        toggleSidebar();
      }
    },
  });

  return (
    <TouchableWithoutFeedback onPress={isSidebarOpen ? handleCloseSidebar : undefined}>
      <View style={{ flex: 1, flexDirection: 'row' }} {...panResponder.panHandlers}>
        <Sidebar />
        <Animated.View style={[styles.content, {
          transform: [{
            translateX: translateX.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 240], // Adjust the value based on your sidebar width
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
                } else if (route.name === 'Library') {
                  iconName = focused ? 'library' : 'library-outline';
                }

                return <Ionicons name={iconName} size={size} color={color} />;
              },
              tabBarActiveTintColor: 'white',
              tabBarInactiveTintColor: 'gray',
              tabBarStyle: { backgroundColor: 'black' },
              tabBarLabelPosition: 'below-icon',
            })}
          >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="Library" component={LibraryScreen} />
          </Tab.Navigator>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  sidebar: {
    width: '60%',
    backgroundColor: 'gray',
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 1,
  },
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
