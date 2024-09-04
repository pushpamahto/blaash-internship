const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accountName: { type: String, required: true },
  balance: { type: Number, default: 0 },
  expenses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Expense' }]
});

module.exports = mongoose.model('Account', accountSchema);
