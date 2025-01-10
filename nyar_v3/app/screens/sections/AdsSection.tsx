import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

export default function AdsSection() {
  return (
    <View style={styles.section}>
      {/* <Text style={styles.sectionTitle}>Ads Section</Text> */}
      <View style={styles.banner}>
        <Image
          source={{ uri: 'https://via.placeholder.com/300x150' }} // Random image URL
          style={styles.bannerImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  banner: {
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  bannerImage: {
    width: '100%',
    height: 150,
  },
});