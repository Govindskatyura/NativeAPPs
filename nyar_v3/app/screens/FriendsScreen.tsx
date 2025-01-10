import React from 'react';
import { Text, View, TextInput, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const friends = [
  { id: '1', name: 'John Doe', contact: '123-456-7890', amount: -50, avatar: 'https://example.com/avatar1.png' },
  { id: '2', name: 'Jane Smith', contact: '987-654-3210', amount: 100, avatar: 'https://example.com/avatar2.png' },
  // Add more friends here
];

export default function FriendsScreen() {
  return (
    <View style={styles.container}>
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
      <View style={styles.searchBarContainer}>
        <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
        <TextInput style={styles.searchBar} placeholder="Search friends..." />
      </View>
      <FlatList
        data={friends}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.friendItem}>
            <View style={styles.friendIconContainer}>
              <Image source={{ uri: item.avatar }} style={styles.friendAvatar} />
            </View>
            <View style={styles.friendInfo}>
              <Text style={styles.friendName}>{item.name}</Text>
              <Text style={styles.friendContact}>{item.contact}</Text>
            </View>
            <View style={styles.friendAmountContainer}>
              <Text style={[styles.friendAmount, item.amount < 0 ? styles.amountOwed : styles.amountDue]}>
                ${Math.abs(item.amount)}
              </Text>
              <TouchableOpacity style={styles.settleButton}>
                <Text style={styles.settleButtonText}>Settle Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    padding: 10,
  },
  voucher: {
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    backgroundColor: '#fff9cf', // Very light yellow background color
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'transparent',
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
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 50,
  },
  friendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 10,
    boxShadow: '1px 5px 10px rgba(0, 0, 0, 0.1)',
  },
  friendIconContainer: {
    borderWidth: 1,
    borderColor: 'blue',
    borderRadius: 24,
    padding: 5,
    marginRight: 10,
  },
  friendIcon: {
    borderRadius: 24,
  },
  friendInfo: {
    flex: 1,
  },
  friendName: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  friendContact: {
    fontSize: 12,
    color: 'gray',
  },
  friendAmountContainer: {
    alignItems: 'flex-end',
  },
  friendAmount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  amountOwed: {
    color: 'red',
  },
  amountDue: {
    color: 'green',
  },
  settleButton: {
    marginTop: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#6a11cb',
    borderRadius: 5,
  },
  settleButtonText: {
    color: 'white',
    fontSize: 14,
  },
  friendAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
});