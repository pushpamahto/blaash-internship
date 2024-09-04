const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Add an expense to an account
router.post('/api/users/:user_id/accounts/:account_id/expenses', expenseController.addExpense);

// Get all expenses for a user's account
router.get('/api/users/:user_id/accounts/:account_id/expenses', expenseController.getAllExpenses);

module.exports = router;
