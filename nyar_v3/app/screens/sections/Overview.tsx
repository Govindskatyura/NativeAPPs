import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Overview() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Overview</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.bannersContainer}>
        <View style={styles.banner}>
          <View style={styles.iconContainer}>
            <FontAwesome name="group" size={24} color="white" />
          </View>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>Groups</Text>
            <Text style={styles.bannerDescription}>Want to log bills & settle up?</Text>
          </View>
        </View>
        <View style={styles.banner}>
          <View style={styles.iconContainer}>
            <FontAwesome name="file-text" size={24} color="white" />
          </View>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>Bills</Text>
            <Text style={styles.bannerDescription}>Manage and track your bills easily.</Text>
          </View>
        </View>
        <View style={styles.banner}>
          <View style={styles.iconContainer}>
            <FontAwesome name="money" size={24} color="white" />
          </View>
          <View style={styles.bannerTextContainer}>
            <Text style={styles.bannerTitle}>Collections</Text>
            <Text style={styles.bannerDescription}>Keep track of your collections effortlessly.</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    padding:10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bannersContainer: {
    flexDirection: 'row',
  },
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gold',
    marginRight: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'gold',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  bannerTextContainer: {
    flexDirection: 'column',
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bannerDescription: {
    fontSize: 14,
    color: '#666',
  },
});