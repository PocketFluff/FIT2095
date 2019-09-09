var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
    _ID: Number,
    name: String,
    assignTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Developer'
    },
    dueDate: Date,
    status: {
        type: String,
        validate: {
            validator: function(taskStatus){
                return taskStatus.toLowerCase() === 'completed' || taskStatus.toLowerCase() === 'in progress';
            },
            message: 'Value entered is not \'Completed\' or \'In Progress\''
        }
    },
    description: String
});

module.exports = mongoose.model('Task', taskSchema);
