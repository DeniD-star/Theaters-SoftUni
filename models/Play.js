const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = model('Play', schema);