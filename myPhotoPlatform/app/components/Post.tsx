import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Import icons

export default function Post({ post, isDarkMode }) {
  return (
    <View style={styles.post}>
      <View style={styles.postHeader}>
        <View style={styles.userInfo}>
          <TouchableOpacity>
            <Image source={{ uri: post.image }} style={styles.userImage} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.userName, { color: isDarkMode ? "#fff" : "#000" }]}>{post.user}</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Ionicons name="ellipsis-horizontal" size={24} color={isDarkMode ? "#fff" : "#000"} />
        </TouchableOpacity>
      </View>
      <Image source={{ uri: post.image }} style={styles.postImage} />
      <View style={styles.postActions}>
        <View style={styles.leftActions}>
          <TouchableOpacity>
            <Ionicons name="heart-outline" size={24} color={isDarkMode ? "#fff" : "#000"} />
          </TouchableOpacity>
          <Text style={[styles.actionCount, { color: isDarkMode ? "#fff" : "#000" }]}>{post.likes}</Text>
          <TouchableOpacity>
            <Ionicons name="chatbubble-outline" size={24} color={isDarkMode ? "#fff" : "#000"} />
          </TouchableOpacity>
          <Text style={[styles.actionCount, { color: isDarkMode ? "#fff" : "#000" }]}>{post.comments}</Text>
          <TouchableOpacity>
            <Ionicons name="paper-plane-outline" size={24} color={isDarkMode ? "#fff" : "#000"} />
          </TouchableOpacity>
          <Text style={[styles.actionCount, { color: isDarkMode ? "#fff" : "#000" }]}>{post.shares}</Text>
        </View>
        <TouchableOpacity style={styles.saveIcon}>
          <Ionicons name="bookmark-outline" size={24} color={isDarkMode ? "#fff" : "#000"} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.postText, { color: isDarkMode ? "#fff" : "#000" }]}>
        {post.user}: <Text style={styles.postDescription}>{post.description}</Text>
      </Text>
      <TouchableOpacity>
        <Text style={[styles.viewComments, { color: isDarkMode ? "#aaa" : "#555" }]}>View all comments</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  post: {
    marginVertical: 10,
    alignItems: "start",
  },
  postHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  userName: {
    fontSize: 14,
    fontWeight: "bold",
  },
  postImage: {
    width: "100%",
    height: 300,
  },
  postActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  leftActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionCount: {
    marginLeft: 5,
    marginRight: 15,
    fontSize: 14,
  },
  saveIcon: {
    marginLeft: 'auto',
  },
  postText: {
    marginTop: 5,
    fontSize: 14,
    paddingHorizontal: 10,
  },
  postDescription: {
    fontWeight: "normal",
  },
  viewComments: {
    fontSize: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
