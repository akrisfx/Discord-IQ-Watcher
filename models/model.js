const mongoose = require('mongoose');
const Schema = mongoose.Schema

const newUser = new Schema ({
    userTag: { type: String, required: true },
    userID: { type: String, required: true },
    IQ: { type: Number, default: 95 },
    coef: { type: Number, default: 0 },
    startedTime: { type: Number },
    typeOfActivity: { type: String }
});

const User = mongoose.model('User', newUser);
module.exports =  User


// userTag: { type: String, required: true, unique: true },
// userID: { type: String, required: true, unique: true },