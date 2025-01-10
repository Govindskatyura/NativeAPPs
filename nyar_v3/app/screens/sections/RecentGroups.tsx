import React from 'react';
import { Text, View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const dummyGroups = [
  { name: 'Group 1', icon: 'people' },
  { name: 'Group 2', icon: 'people' },
  { name: 'Group 3', icon: 'people' },
];

export default function RecentGroups() {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Recent Groups</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <TouchableOpacity style={styles.groupButton}>
          <View style={styles.iconBackground}>
            <Ionicons name="add" size={24} color="white" />
          </View>
          <Text style={styles.groupText}>Create New</Text>
        </TouchableOpacity>
        {dummyGroups.map((group, index) => (
          <TouchableOpacity key={index} style={styles.groupButton}>
            <View style={styles.iconBackground}>
              <Ionicons name={group.icon} size={24} color="white" />
            </View>
            <Text style={styles.groupText}>{group.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  groupButton: {
    alignItems: 'center',
    marginRight: 15,
  },
  iconBackground: {
    backgroundColor: '#6a11cb',
    borderRadius: 24,
    padding: 12,
    marginBottom: 5,
  },
  groupText: {
    fontSize: 14,
    color: 'gray',
  },
});