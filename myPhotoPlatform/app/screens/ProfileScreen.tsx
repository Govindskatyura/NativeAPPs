import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

const WINDOW_WIDTH = Dimensions.get('window').width;

const ProfileScreen = () => {
  const profileData = {
    username: 'katyuragovind',
    name: 'Govind Katyura',
    bio: '{" Nullius in verba "}\n💻 Engg. ⛰️ Pahadi 🤓 Kumaoni\n• Adventure 📸 • Travel •\n- #shotonphone X Drone...',
    link: 'oia.bio/katyuragovind',
    music: 'Parade De La Bastille · A.R. Rahman',
    stats: {
      posts: 105,
      followers: 464,
      following: 461,
    },
    highlights: [
      { id: 1, name: 'Entropy 📸', image: 'https://picsum.photos/id/1011/300' },
      { id: 2, name: 'Gulmarg ⛷️', image: 'https://picsum.photos/id/1012/300' },
      { id: 3, name: "Leh'd 🛵", image: 'https://picsum.photos/id/1013/300' },
      { id: 4, name: 'Udaipur 🚐', image: 'https://picsum.photos/id/1014/300' },
      { id: 5, name: 'HomeTown...', image: 'https://picsum.photos/id/1015/300' },
    ],
    posts: [
      { id: 1, type: 'image', uri: 'https://picsum.photos/id/1016/300' },
      { id: 2, type: 'video', uri: 'https://picsum.photos/id/1022/300' },
      { id: 3, type: 'video', uri: 'https://picsum.photos/id/1018/300' },
      { id: 4, type: 'video', uri: 'https://picsum.photos/id/1019/300' },
      { id: 5, type: 'video', uri: 'https://picsum.photos/id/1020/300' },
      { id: 6, type: 'video', uri: 'https://picsum.photos/id/1021/300' },
    ]
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <TouchableOpacity style={styles.header} onPress={() => console.log('Header clicked')}>
          <View style={styles.headerLeft}>
            <Text style={styles.username}>{profileData.username}</Text>
            <Feather name="chevron-down" size={20} color="black" />
            <View style={styles.onlineDot} />
          </View>
          <View style={styles.headerRight}>
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>9+</Text>
            </View>
            <Feather name="plus-square" size={24} color="black" style={styles.headerIcon} />
            <Feather name="menu" size={24} color="black" style={styles.headerIcon} />
          </View>
        </TouchableOpacity>

        {/* Profile Info */}
        <View style={styles.profileSection}>
          <View style={styles.profileInfo}>
            <TouchableOpacity style={styles.profileImageContainer} onPress={() => console.log('Profile image clicked')}>
              <Image
                source={{ uri: 'https://picsum.photos/id/1010/300' }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.addButton}>
                <Feather name="plus" size={20} color="white" />
              </TouchableOpacity>
            </TouchableOpacity>
            <View style={styles.statsContainer}>
              <TouchableOpacity style={styles.statItem} onPress={() => console.log('Posts clicked')}>
                <Text style={styles.statNumber}>{profileData.stats.posts}</Text>
                <Text style={styles.statLabel}>posts</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.statItem} onPress={() => console.log('Followers clicked')}>
                <Text style={styles.statNumber}>{profileData.stats.followers}</Text>
                <Text style={styles.statLabel}>followers</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.statItem} onPress={() => console.log('Following clicked')}>
                <Text style={styles.statNumber}>{profileData.stats.following}</Text>
                <Text style={styles.statLabel}>following</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.name}>{profileData.name}</Text>
          <View style={styles.threadsBadge}>
            <Feather name="at-sign" size={16} color="black" style={styles.threadsIcon} />
            <Text style={styles.threadsHandle}>{profileData.username}</Text>
          </View>
          <Text style={styles.bioText}>{profileData.bio}</Text>
          <Text style={styles.linkText}>{profileData.link}</Text>
          
          <TouchableOpacity style={styles.musicPlayer} onPress={() => console.log('Music player clicked')}>
            <Feather name="play-circle" size={16} color="black" />
            <Text style={styles.musicText}>{profileData.music}</Text>
          </TouchableOpacity>

          {/* Action Buttons */}
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.editButton}>
              <Text>Edit profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareButton}>
              <Text>Share profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreButton}>
              <Feather name="user-plus" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Story Highlights */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.highlightsContainer}
          contentContainerStyle={{ paddingRight: 15 }}
        >
          {profileData.highlights.map((highlight) => (
            <TouchableOpacity 
              key={highlight.id} 
              style={styles.highlightItem}
              onPress={() => console.log(`Clicked on ${highlight.name}`)}
            >
              <Image source={{ uri: highlight.image }} style={styles.highlightImage} />
              <Text style={styles.highlightText} numberOfLines={1}>
                {highlight.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Tab Navigation */}
        <View style={styles.tabNav}>
          <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
            <Feather name="grid" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Feather name="film" size={24} color="gray" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabItem}>
            <Feather name="user" size={24} color="gray" />
          </TouchableOpacity>
        </View>

        {/* Grid View */}
        <View style={styles.gridContainer}>
          {profileData.posts.map((post) => (
            <TouchableOpacity key={post.id} style={styles.gridItem} onPress={() => console.log(`Clicked on post ${post.id}`)}>
              <Image source={{ uri: post.uri }} style={styles.gridImage} />
              {post.type === 'video' && (
                <View style={styles.videoIcon}>
                  <Feather name="film" size={16} color="white" />
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 5,
  },
  onlineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    marginLeft: 5,
  },
  headerIcon: {
    marginLeft: 15,
  },
  notificationBadge: {
    backgroundColor: '#FF3B30',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    position: 'absolute',
    right: 65,
    top: -5,
    zIndex: 1,
  },
  notificationText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  profileSection: {
    padding: 15,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImageContainer: {
    position: 'relative',
  },
  profileImage: {
    width: 86,
    height: 86,
    borderRadius: 43,
  },
  addButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#0095F6',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  statsContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 20,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  threadsBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  threadsIcon: {
    width: 16,
    height: 16,
    marginRight: 5,
  },
  threadsHandle: {
    fontSize: 12,
    color: '#666',
  },
  bioText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 5,
  },
  linkText: {
    color: '#0095F6',
    fontSize: 14,
    marginBottom: 10,
  },
  musicPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  musicText: {
    marginLeft: 5,
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  editButton: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 8,
    borderRadius: 8,
    marginRight: 5,
    alignItems: 'center',
    boxShadow: '2px 1px 5px rgba(0,0,0,0.1)',
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    padding: 8,
    borderRadius: 8,
    marginRight: 5,
    alignItems: 'center',
    boxShadow: '2px 1px 5px rgba(0,0,0,0.1)',
  },
  moreButton: {
    backgroundColor: '#F8F8F8',
    padding: 8,
    borderRadius: 8,
    width: 40,
    alignItems: 'center',
    boxShadow: '2px 1px 5px rgba(0,0,0,0.1)',
  },
  highlightsContainer: {
    paddingLeft: 10,
    marginBottom: 15,
    height: 100, // Add fixed height
  },
  highlightItem: {
    alignItems: 'center',
    marginRight: 1,
    width: 75,
  },
  highlightImage: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    padding: 2,
  },
  highlightText: {
    fontSize: 12,
    textAlign: 'center',
  },
  tabNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 0.5,
    borderTopColor: '#DBDBDB',
    borderBottomWidth: 0.5,
    borderBottomColor: '#DBDBDB',
  },
  tabItem: {
    paddingVertical: 10,
  },
  activeTab: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: WINDOW_WIDTH / 3,
    height: WINDOW_WIDTH / 3,
    position: 'relative',
  },
  gridImage: {
    width: '100%',
    height: '100%',
    borderWidth: 0.5,
    borderColor: 'white',
  },
  videoIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 4,
    borderRadius: 4,
  },
  statItem:{
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
  },
  statLabel: {
    color: '#666',
  },
});

export default ProfileScreen;
