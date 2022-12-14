const { Schema, model } = require('mongoose');

const schema = new Schema({
    title: { type: String, required: [true, 'Title is required!'] },
    description: { type: String, required: [true, 'Description is required!'], maxLength: [50, 'Description cant be more than 50 characters long!' ]},
    imageUrl: { type: String, required: [true, 'Image is required!'] },
    isPublic: {type: Boolean, required: true, default: false},
    createdAt: {type: Date, default: Date.now},
    usersLiked: [{type: Schema.Types.ObjectId, ref: 'User', default: []}],
    author: { type: Schema.Types.ObjectId, ref: 'User' }
})

module.exports = model('Play', schema);