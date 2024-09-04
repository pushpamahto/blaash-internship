const User = require('../models/user');
const Account = require('../models/Account');
const Expense = require('../models/Expense');

// Add an expense to an account
exports.addExpense = async (req, res) => {
  try {
    const { user_id, account_id } = req.params;
    const { amount, category, description } = req.body;

    // Find the account and user
    const account = await Account.findOne({ _id: account_id, userId: user_id });
    if (!account) {
      return res.status(404).json({ message: 'Account not found for this user' });
    }

    // Create a new expense
    const expense = new Expense({ accountId: account_id, amount, category, description });
    await expense.save();

    // Add the expense to the account
    account.expenses.push(expense._id);
    await account.save();

    res.status(201).json({ message: 'Expense added successfully', expense });
  } catch (error) {
    res.status(500).json({ message: 'Error adding expense', error: error.message });
  }
};

// Get all expenses for a user's account
exports.getAllExpenses = async (req, res) => {
  try {
    const { user_id, account_id } = req.params;

    // Find the account and user
    const account = await Account.findOne({ _id: account_id, userId: user_id }).populate('expenses');
    if (!account) {
      return res.status(404).json({ message: 'Account not found for this user' });
    }

    res.status(200).json({ expenses: account.expenses });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving expenses', error: error.message });
  }
};
