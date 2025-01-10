import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Animated,
  Image,
} from 'react-native';
import { Video } from 'expo-av';
import mediaVideo from '../data/mediaVideo';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const formatCount = (count) => {
  if (count >= 1000000) {
    return (count / 1000000).toFixed(1) + 'M';
  } else if (count >= 1000) {
    return (count / 1000).toFixed(1) + 'K';
  }
  return count.toString();
};

const ReelScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef({});
  const isFocused = useIsFocused();

  const onViewableItemsChanged = useRef(({ changed }) => {
    changed.forEach(element => {
      const cell = videoRefs.current[element.key];
      if (cell) {
        if (element.isViewable && isFocused) {
          cell.playAsync();
        } else {
          cell.stopAsync();
        }
      }
    });
  }).current;

  useEffect(() => {
    if (!isFocused) {
      Object.values(videoRefs.current).forEach(video => {
        video.stopAsync();
      });
    } else {
      const cell = videoRefs.current[mediaVideo[currentIndex].id];
      if (cell) {
        cell.playAsync();
      }
    }
  }, [isFocused, currentIndex]);

  const togglePlayPause = (videoRef) => {
    if (videoRef) {
      videoRef.getStatusAsync().then(status => {
        if (status.isPlaying) {
          videoRef.pauseAsync();
        } else {
          videoRef.playAsync();
        }
      });
    }
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.container}>
        <View style={styles.statusBar}>
          <TouchableOpacity>
            <Ionicons name="camera-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Main Video */}
        <TouchableOpacity onPress={() => togglePlayPause(videoRefs.current[item.id])}>
          <Video
            ref={ref => (videoRefs.current[item.id] = ref)}
            source={{ uri: item.source }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="cover"
            shouldPlay={index === currentIndex && isFocused}
            isLooping
            style={styles.mainImage}
          />
        </TouchableOpacity>

        {/* Interaction Buttons */}
        <View style={styles.interactionContainer}>
          <View style={styles.rightButtons}>
            <TouchableOpacity style={styles.interactionButton}>
              <Ionicons name="heart-outline" size={24} color="white" style={styles.iconShadow} />
              <Text style={styles.interactionCount}>{formatCount(item.likes)}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.interactionButton}>
              <Ionicons name="chatbubble-outline" size={24} color="white" style={styles.iconShadow} />
              <Text style={styles.interactionCount}>{formatCount(item.comments)}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.interactionButton}>
              <Ionicons name="paper-plane-outline" size={24} color="white" style={styles.iconShadow} />
              <Text style={styles.interactionCount}>{formatCount(item.shares)}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.interactionButton}>
              <FontAwesome name="ellipsis-v" size={24} color="white" style={styles.iconShadow} />
            </TouchableOpacity>
          </View>
        </View>

        {/* User Info and Caption */}
        <View style={styles.userInfo}>
          <View style={styles.userContainer}>
            <Image
              source={{ uri: `https://picsum.photos/id/${index + 1}/300` }}
              style={styles.profilePic}
            />
            <View style={styles.userTextContainer}>
              <View style={styles.usernameUpperContainer}>
                <View style={styles.usernameContainer}>
                  <Text style={styles.username}>{item.username}</Text>
                  <Text style={styles.title}>{item.title}</Text>
                </View>
                <TouchableOpacity style={styles.followButton}>
                  <Text style={styles.followText}>Follow</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <Text style={styles.caption} numberOfLines={2}>{item.caption}</Text>
        </View>
      </View>
    );
  };

  return (
    <FlatList
      data={mediaVideo}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      pagingEnabled
      vertical
      showsVerticalScrollIndicator={false}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50
      }}
      onViewableItemsChanged={onViewableItemsChanged}
      onScroll={(event) => {
        const index = Math.floor(event.nativeEvent.contentOffset.y / height);
        setCurrentIndex(index);
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    height: height*0.903,
    top:0,
  },
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
    paddingTop: 10,
    marginTop:40,
    zIndex:2,
  },
  mainImage: {
    width: width,
    height: height, // Adjust height to prevent overflow
    resizeMode: 'cover',
    position:'absolute',
  },
  interactionContainer: {
    position: 'absolute',
    right: 10,
    bottom: 10, // Adjust position to prevent overflow
    alignItems: 'center',
  },
  rightButtons: {
    alignItems: 'center',
  },
  interactionButton: {
    marginVertical: 9,
    alignItems: 'center',
  },
  interactionCount: {
    color: '#fff',
    fontSize: 14,
    marginTop: 4,
  },
  iconShadow: {
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  userInfo: {
    padding: 15,
    overflow: 'hidden',
    marginTop: height * 0.72,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  usernameUpperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: width * 0.6,
  },
  profilePic: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 10,
  },
  userTextContainer: {
    flex: 1,
  },
  usernameContainer: {
    flexDirection: 'column',
    overflow: 'hidden',
    maxWidth: width * 0.5,
  },
  username: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
    marginRight: 10,
  },
  musicInfo: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.7,
    maxWidth: width * 0.6,
  },
  followButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 4,
  },
  followText: {
    color: '#fff',
    borderColor: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  caption: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 8,
    maxHeight:20,
    maxWidth: width * 0.6,
    flexWrap: 'wrap', // Ensure text wraps
  },
  likes: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.7,
  },
});

export default ReelScreen;
