const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName: {
        type: String,
        require : true,
    },
    lastName : {
        type : String,
        required : true,
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true,
    },
    tasks:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'tasks'
    }],
    createdon : {
        type: Date,
        default: Date.now 
    }
});
const user = mongoose.model('user', UserSchema);
module.exports = user;