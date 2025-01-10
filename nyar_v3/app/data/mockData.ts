export const filters = ["All", "Priority", "Group", "Personal", "Non Group"];

export const transactions = [
  {
    name: "Transaction 1",
    payer: "X",
    amount: 100,
    date: "2023-10-01",
    group: "Group 1",
  },
  {
    name: "Transaction 2",
    payer: "Y",
    amount: 200,
    date: "2023-10-02",
    group: "Group 2",
  },
  // ...other transactions
];

export const groups = [
  {
    name: "Group 1",
    transactions: [
      { text: "X will pay you", amount: 10 },
      { text: "You will pay Y", amount: 20 },
    ],
    owe: 50,
    owned: 20,
    type: "Home",
  },
  {
    name: "Group 2",
    transactions: [
      { text: "X will pay you", amount: 10 },
      { text: "You will pay Y", amount: 20 },
    ],
    owe: 50,
    owned: 20,
    type: "Home",
  },
  // ...other groups
];