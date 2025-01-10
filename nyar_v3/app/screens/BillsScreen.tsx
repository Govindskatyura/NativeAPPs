import React, { useState } from "react";
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { filters, transactions } from "../data/mockData"; // Import mock data

export default function BillsScreen() {
  const [selectedFilter, setSelectedFilter] = useState("All");

  return (
    <View style={{ flex: 1, marginTop: 40 }}>
      {/* Top Container */}
      <View style={styles.topContainer}>
        <Text style={styles.heading}>Bills</Text>
      </View>
      <View style={styles.searchContainer}>
        <FontAwesome name="search" size={20} color="gray" />
        <TextInput style={styles.searchInput} placeholder="Search expenses..." />
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

      {/* Month and Year with Calendar Icon */}
      <View style={styles.monthYearContainer}>
        <Text style={styles.monthYearText}>October 2023</Text>
        <FontAwesome name="calendar" size={24} color="black" />
      </View>

      {/* Transactions List */}
      <ScrollView style={styles.transactionsContainer}>
        {transactions.map((transaction, index) => (
          <View key={index} style={styles.transactionContainer}>
            <View style={styles.transactionLeft}>
              <Text style={styles.transactionDate}>
                {new Date(transaction.date).toLocaleDateString('en-US', { day: '2-digit', month: 'short' })}
              </Text>
              <View style={styles.transactionIcon}>
                <FontAwesome name="ellipsis-h" size={20} color="gray" />
              </View>
            </View>
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionGroup}>{transaction.group}</Text>
              <Text style={styles.transactionName}>{transaction.name}</Text>
              <Text style={styles.transactionDetails}>
                {transaction.payer} paid ${transaction.amount}
              </Text>
            </View>
            <TouchableOpacity style={styles.notInvolvedButton}>
              <Text style={styles.notInvolvedButtonText}>Not Involved</Text>
            </TouchableOpacity>
            {index < transactions.length - 1 && (
              <View style={styles.separator} />
            )}
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
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 2,
    paddingHorizontal: 10,
    paddingVertical: 9,
    marginHorizontal: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 1,
  },
  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
  },
  filtersContainer: {
    flexDirection: "row",
    paddingVertical: 8,
    maxHeight: 50,
    backgroundColor: "#f0f0f0"
  },
  filterButton: {
    paddingVertical: 5,
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
  monthYearContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  monthYearText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  transactionsContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  transactionContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
  },
  transactionLeft: {
    alignItems: "center",
    marginRight: 10,
    alignSelf: "flex-start",
  },
  transactionDate: {
    fontSize: 12,
    color: "gray",
  },
  transactionIcon: {
    marginTop: 5,
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 50,
    padding: 5
  },
  transactionInfo: {
    flex: 1,
  },
  transactionName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  transactionDetails: {
    fontSize: 14,
    color: "#666",
  },
  transactionGroup: {
    fontSize: 14,
    color: "gray",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    alignSelf: "flex-start",
  },
  notInvolvedButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "gray",
  },
  notInvolvedButtonText: {
    color: "gray",
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
});