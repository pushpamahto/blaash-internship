const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  accounts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Account' }]
});

module.exports = mongoose.model('User', userSchema);
