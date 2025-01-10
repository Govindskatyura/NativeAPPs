// import React, { useEffect, useRef } from "react";
// import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Animated, Dimensions } from "react-native";
// import { Ionicons } from '@expo/vector-icons';
// import { useSidebar } from "./context/SidebarContext";

// export default function SidebarScreen() {
//   const { toggleSidebar, isSidebarOpen } = useSidebar();
//   const sidebarTranslateX = useRef(new Animated.Value(-Dimensions.get('window').width * 0.8)).current;
//   const mainContentTranslateX = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.timing(sidebarTranslateX, {
//       toValue: isSidebarOpen ? 0 : -Dimensions.get('window').width * 0.8,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();

//     Animated.timing(mainContentTranslateX, {
//       toValue: isSidebarOpen ? Dimensions.get('window').width * 0.8 : 0,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();
//   }, [isSidebarOpen]);

//   return (
//     <Animated.View style={[styles.container, { transform: [{ translateX: sidebarTranslateX }] }]}>
//       <TouchableOpacity onPress={toggleSidebar} style={styles.closeButton}>
//         <Ionicons name="close" size={30} color="white" />
//       </TouchableOpacity>
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <View style={styles.profileCard}>
//           <Image
//             source={{ uri: 'https://picsum.photos/80' }}
//             style={styles.profileIconLarge}
//           />
//           <Text style={styles.profileName}>User Name</Text>
//           <TouchableOpacity>
//             <Text style={styles.viewProfile}>View Profile</Text>
//           </TouchableOpacity>
//         </View>
//         <TouchableOpacity style={styles.sidebarButton}>
//           <Ionicons name="star" size={20} color="white" />
//           <Text style={styles.sidebarButtonText}>What's New</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.sidebarButton}>
//           <Ionicons name="musical-notes" size={20} color="white" />
//           <Text style={styles.sidebarButtonText}>Your Sound Capsule</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.sidebarButton}>
//           <Ionicons name="time" size={20} color="white" />
//           <Text style={styles.sidebarButtonText}>Listen History</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.sidebarButton}>
//           <Ionicons name="settings" size={20} color="white" />
//           <Text style={styles.sidebarButtonText}>Settings and Privacy</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </Animated.View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#333",
//     padding: 16,
//     height: '100%',
//     width: '80%',
//     position: 'absolute',
//     left: 0,
//     zIndex: 1,
//   },
//   closeButton: {
//     alignSelf: "flex-end",
//     marginTop: 35,
//   },
//   scrollContainer: {
//     paddingVertical: 20,
//   },
//   profileCard: {
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   profileIconLarge: {
//     width: 80,
//     height: 80,
//     borderRadius: 40,
//     marginBottom: 10,
//   },
//   profileName: {
//     color: "#FFFFFF",
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
//   viewProfile: {
//     color: "#1DB954",
//     fontSize: 16,
//   },
//   sidebarButton: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 20,
//   },
//   sidebarButtonText: {
//     color: "#FFFFFF",
//     fontSize: 16,
//     marginLeft: 10,
//   },
// });
