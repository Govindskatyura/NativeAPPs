import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function AccountScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#1877F2" />
        </TouchableOpacity>
        <View style={styles.headerTitleContainer}>
          <Text style={styles.title}>Account</Text>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.userCard}>
          <Image source={{ uri: 'https://via.placeholder.com/100' }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userContact}>+1234567890</Text>
            <Text style={styles.userEmail}>john.doe@example.com</Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={24} color="#1877F2" />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          {/* dotted line */}
          <View style={styles.separator} />
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ContactUs')}>
            <Ionicons name="call" size={24} color="#1877F2" />
            <Text style={styles.buttonText}>Contact Us</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('InviteFriends')}>
            <Ionicons name="people" size={24} color="#1877F2" />
            <Text style={styles.buttonText}>Invite Friends</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('RateUs')}>
            <Ionicons name="star" size={24} color="#1877F2" />
            <Text style={styles.buttonText}>Rate Us</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('FAQs')}>
            <Ionicons name="help-circle" size={24} color="#1877F2" />
            <Text style={styles.buttonText}>FAQs</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ImportGroups')}>
            <MaterialIcons name="import-export" size={24} color="#1877F2" />
            <Text style={styles.buttonText}>Import Groups and Expenses</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
            <Ionicons name="settings" size={24} color="#1877F2" />
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Logout')}>
            <FontAwesome name="sign-out" size={24} color="#1877F2" />
            <Text style={styles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Made with ❤️ in India</Text>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 60,
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 0,
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollContainer: {
    padding: 20,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  userContact: {
    color: 'gray',
    marginTop: 5,
  },
  userEmail: {
    color: 'gray',
    marginTop: 5,
  },
  editButton: {
    marginLeft: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    height: 10,
    borderStyle: 'dotted',
    borderBottomWidth: 1,
    marginVertical: 2,
    borderColor: 'lightgray',
    padding: 2,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  versionText: {
    fontSize: 14,
    color: 'gray',
  },
});