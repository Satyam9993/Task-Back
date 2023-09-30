const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'users',
        required : true
    },
    title: {
        type: String,
        require : true,
    },
    description: {
        type: String,
        require : true,
    },
    status: {
        type : String,
        default : "active",
        enum : ["active", "hold", "work in progress", "closed"]
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
const task = mongoose.model('tasks', TaskSchema);
module.exports = task;