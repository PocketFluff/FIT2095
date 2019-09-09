var mongoose = require('mongoose');         //Reference to Mongoose package.

/*  
    Create Mongoose Schema, each document will have the following format of 4 items/attributes.
    Name is a mandatory field.  
    To make a field mandatory when document is created, set required attribute to true like below.
*/

var bookSchema = mongoose.Schema({
    _ID: mongoose.Schema.Types.ObjectId,
    title: {
        required: true,
        type: String
    },
    isbn: {
        type: String
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author'
    },
    created: {
        type: Date,
        default: Date.now
    }
});

// Invoke the Model Constructor, passing it the name of the collection and the Schema, and then export that.
module.exports = mongoose.model('Book', bookSchema);
