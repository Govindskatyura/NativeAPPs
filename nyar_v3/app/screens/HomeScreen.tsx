import React from 'react';
import { Text, View, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import RecentGroups from './sections/RecentGroups';
import Overview from './sections/Overview';
import AdsSection from './sections/AdsSection';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#6a11cb', '#2575fc']} style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity style={styles.headerButton} onPress={() => router.push('/Account')}>
            <View style={styles.iconBackground}>
              <Ionicons name="person" size={24} color="white" />
            </View>
            <Text style={styles.headerText}>Account</Text>
          </TouchableOpacity>
          <View style={styles.headerButton}>
            <View style={[styles.iconBackground, styles.activityIcon]}>
              <Ionicons name="notifications" size={24} color="white" />
              <View style={styles.activityCount}>
                <Text style={styles.activityCountText}>5</Text>
              </View>
            </View>
            <Text style={styles.headerText}>Activity</Text>
          </View>
        </View>
        {/* Total balance banner start */}
        <View style={styles.voucher}>
          <View style={styles.voucherContent}>
            <View style={styles.balanceItem}>
              <Text style={styles.balanceText}>Total Balance</Text>
              <Text style={styles.balanceAmount}>$1000</Text>
            </View>
            <View style={styles.verticalLine} />
            <View style={styles.balanceItem}>
              <Text style={styles.balanceText}>Will Get</Text>
              <Text style={[styles.balanceAmount, styles.willGet]}>$500</Text>
            </View>
            <View style={styles.verticalLine} />
            <View style={styles.balanceItem}>
              <Text style={styles.balanceText}>Will Pay</Text>
              <Text style={[styles.balanceAmount, styles.willPay]}>$200</Text>
            </View>
          </View>
        </View>
         {/* Total balance banner end */}
      </LinearGradient>
      <View style={styles.content}>
        <RecentGroups />
        <Overview />
        <AdsSection />
        <AdsSection />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20
  },
  headerContent: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerButton: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    marginTop: 4,
  },
  iconBackground: {
    backgroundColor: 'rgba(211, 211, 211, 0.5)', // Light gray with less opacity
    borderRadius: 24, // Make it round
    padding: 12,
  },
  activityIcon: {
    position: 'relative',
  },
  activityCount: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    padding: 2,
    paddingHorizontal: 5,
  },
  activityCountText: {
    color: 'white',
    fontSize: 15,
  },
  voucher: {
    marginTop: 50,
    marginBottom: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  voucherContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  balanceItem: {
    alignItems: 'center',
  },
  verticalLine: {
    width: 1,
    height: '100%',
    borderStyle: 'dotted',
    borderWidth: 1,
    borderColor: 'gray',
    marginHorizontal: 10,
  },
  balanceText: {
    fontSize: 16,
    color: 'gray',
  },
  balanceAmount: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  willGet: {
    color: 'green',
  },
  willPay: {
    color: 'red',
  },
  content: {
    // padding: 10,
    marginTop: -10,
    borderRadius: 10,
    backgroundColor: '#f0f0f0', // Light gray background for content
  },
});