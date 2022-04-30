const mongoose = require('mongoose')
const { Schema } = mongoose;

const costSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['food', 'health', 'sport', 'housing', 'transportation', 'education'],
        required: true,
    },
    sum: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Cost = mongoose.model('Cost', costSchema);

const schema = new Schema();

module.exports = Cost;