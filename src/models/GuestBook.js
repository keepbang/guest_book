const mongoose = require('mongoose');

const GuestBookSchema = mongoose.Schema({
    name : {
        type: String,
        maxlength : 50
    },
    context : {
        type: String,
        maxlength: 2000
    }
});

const GuestBook = mongoose.model('GuestBook',GuestBookSchema);
module.exports = {GuestBook};