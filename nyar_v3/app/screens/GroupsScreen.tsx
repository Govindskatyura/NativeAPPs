import React, { useState } from "react";
import { Text, View, Button, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { filters, groups } from "../data/mockData"; // Import mock data

export default function GroupsScreen() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      {/* Top Container */}
      <View style={styles.topContainer}>
        <Text style={styles.heading}>Groups</Text>
        <Button title="Create a Group" onPress={() => {}} />
      </View>

      {/* Filters */}
      <ScrollView horizontal style={styles.filtersContainer} showsHorizontalScrollIndicator={false}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterButton,
              selectedFilter === filter && styles.selectedFilterButton,
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[
              styles.filterText,
              selectedFilter === filter && styles.selectedfilterText,
              ]}>{filter}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {/* Thin gray horizontal line stick with the bottom view */}
      <View style={{ borderBottomWidth: 1, borderBottomColor: "#ddd" }} />
      {/* Groups List */}
      <ScrollView style={styles.groupsContainer}>
        {groups.map((group, index) => (
          <View key={index} style={styles.groupContainer}>
            <View style={styles.groupIcon}>
              <FontAwesome name="group" size={24} color="black" />
            </View>
            <View style={styles.groupInfo}>
              <Text style={styles.groupName}>{group.name}</Text>
              {group.transactions.map((transaction, idx) => {
                const isOwed = transaction.text.includes("will pay you");
                return (
                  <Text key={idx} style={styles.transaction}>
                    {transaction.text} <Text style={isOwed ? styles.ownedAmount : styles.oweAmount}>${transaction.amount}</Text>
                  </Text>
                );
              })}
            </View>
            <View style={styles.groupAmounts}>
              <Text style={styles.oweText}>You Owe:</Text>
              <Text style={styles.oweAmount}>${group.owe}</Text>
              <Text style={styles.ownedText}>You are Owned:</Text>
              <Text style={styles.ownedAmount}>${group.owned}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    // backgroundColor: "#f8f8f8",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
  },
  filtersContainer: {
    flexDirection: "row",
    paddingVertical: 8,
    maxHeight: 50,
    backgroundColor: "#f0f0f0"
  },
  filterButton: {
    paddingVertical: 5, // Reduced vertical padding
    paddingHorizontal: 20,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#fff",
    color: "#000",
    borderWidth: 0.2,
    borderColor: "gray",
  },
  selectedFilterButton: {
    backgroundColor: "#2575fc",
    color: "#000",
  },
  filterText: {
    fontSize: 16
  },
  selectedfilterText : {
    color: "#fff"
  },
  groupsContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  groupContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  groupIcon: {
    marginRight: 10,
    borderWidth: 0.15, // Very thin border
    borderColor: "gray",
    borderRadius: 24, // Make the border circular
    padding: 5,
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    // light yellow color as background
    backgroundColor: "#fff9cf",
  },
  groupInfo: {
    flex: 1,
  },
  groupName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  transaction: {
    fontSize: 14,
    color: "#666",
  },
  transactionAmount: {
    fontSize: 14,
  },
  groupAmounts: {
    alignItems: "flex-end",
  },
  oweText: {
    color: "gray",
    fontSize: 14, // Reduced font size
  },
  ownedText: {
    color: "gray",
    fontSize: 14, // Reduced font size
  },
  amountText: {
    fontSize: 16,
  },
  oweAmount: {
    color: "red",
    fontSize: 16,
  },
  ownedAmount: {
    color: "green",
    fontSize: 16,
  },
});