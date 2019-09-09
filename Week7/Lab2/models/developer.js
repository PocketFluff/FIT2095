var mongoose = require('mongoose');

var developerSchema = mongoose.Schema({
    _ID: Number,
    name: {
        firstName: {
            type: String,
            required: true
        },
        lastName: String
    },
    level: {
        type: String,
        required: true,
        uppercase: true,
        validate: {
            validator: function(developerLevel){
                return developerLevel.toUpperCase() == "BEGINNER" || developerLevel.toUpperCase() == "EXPERT";
            },
            message: 'Value entered is not \'Beginner\' or \'Expert\''
        }
    },
    address: {
        state: String,
        suburb: String,
        street: String,
        unit: String
    }
});

module.exports = mongoose.model('Developer', developerSchema);

