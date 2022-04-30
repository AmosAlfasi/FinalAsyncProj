const mongoose = require('mongoose')
const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
        minlength: 9,
        maxlength: 9
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    maritalStatus: {
        type: String,
        required: true,
        enum: ['single', 'married', 'devorsed']
    },
    birthday: {
        type: String,
        required: true
    },
    sumOfCosts: {
        type: Number,
        default: 0
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

const schema = new Schema();

module.exports = User;