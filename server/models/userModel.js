const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

UserSchema.plugin(uniqueValidator);
UserSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) next();
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
  } catch (e) {
    return next(e);
  }
});

UserSchema.methods.validatePassword = async function(password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (e) {
    throw new Error(e);
  }
}

module.exports = mongoose.model("User", UserSchema);