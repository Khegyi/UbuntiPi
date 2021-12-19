const mongoose = require('mongoose');

const {Schema} = mongoose;
const todoItemModel = new Schema(
{    name: {type:String},
    description: {type:String},
    status: {type:String},
    done: {type:Boolean, default: false},
    created: {type:Date},
    dueDate: {type:Date},
    createdBy: {type:String}
});

module.exports = mongoose.model('TodoItem', todoItemModel);