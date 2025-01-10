import React from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, ScrollView } from "react-native"; // Import ScrollView
import { useTheme } from "../context/ThemeContext"; // Import useTheme
import { Ionicons } from '@expo/vector-icons'; // Import icons
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import Post from "../components/Post"; // Import Post component
import { stories, posts } from "../data/dummyData"; // Import dummy data

export default function HomeScreen() {
  const { isDarkMode } = useTheme(); // Use theme context

  const renderStory = ({ item }: { item: { id: string; name: string; image: string; isAddButton?: boolean } }) => {
    const storyContent = item.isAddButton ? (
      <TouchableOpacity style={styles.addStoryButton} activeOpacity={0.7}>
        <Image source={{ uri: item.image }} style={styles.storyImage} />
        <Ionicons name="add-circle" size={24} color="#fff" style={styles.addIcon}/>
      </TouchableOpacity>
    ) : (
      <TouchableOpacity activeOpacity={0.7}>
        <LinearGradient
          colors={['#f09433', '#e6683c', '#dc2743', '#cc2366', '#bc1888']}
          style={styles.storyBorder}
        >
          <Image source={{ uri: item.image }} style={styles.storyImage} />
        </LinearGradient>
      </TouchableOpacity>
    );

    return (
      <TouchableOpacity style={styles.story} activeOpacity={0.7}>
        {storyContent}
        <Text style={[styles.storyText, { color: isDarkMode ? "#fff" : "#000" }]}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={[styles.container, { backgroundColor: isDarkMode ? "#000" : "#fff" }]}>
      <View style={styles.appBar}>
        <Text style={[styles.appName, { color: isDarkMode ? "#fff" : "#000" }]}>MyPhotoApp</Text>
        <View style={styles.appBarIcons}>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color={isDarkMode ? "#fff" : "#000"} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="chatbubble-outline" size={24} color={isDarkMode ? "#fff" : "#000"} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <FlatList
          data={stories}
          renderItem={renderStory}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false} // Add this line
          nestedScrollEnabled={true} // Add this line
        />
        <View style={styles.timeline}>
          {posts.map(post => (
            <TouchableOpacity key={post.id} activeOpacity={1}>
              <Post post={post} isDarkMode={isDarkMode} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50, // Add margin from the top
  },
  appBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  appName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  appBarIcons: {
    flexDirection: "row",
    width: 60,
    justifyContent: "space-between",
  },
  stories: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    maxHeight: '15%',
  },
  story: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  addStoryButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  storyBorder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center"
  },
  storyImage: {
    width: 65,
    height: 65,
    borderRadius: 40,
    padding: 3,
    backgroundColor: "#fff",
  },
  addIcon: {
    position: "absolute",
    bottom: -1, // Adjusted position
    right: -1,  // Adjusted position
    zIndex: 1,
    color: "#1877F2", // Facebook blue
    backgroundColor: "#fff", // White background
    padding: 2, // Added padding for better visibility
    borderRadius: 15, // Added border radius to match the icon shape
  },
  storyText: {
    marginTop: 5,
    fontSize: 12,
  },
  timeline: {
    flex: 1
  },
  post: {
    marginVertical: 10,
    alignItems: "center",
  },
  postImage: {
    width: "100%",
    height: 300,
  },
  postText: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  postDescription: {
    marginTop: 5,
    fontSize: 14,
  },
  postStats: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 5,
  },
});
