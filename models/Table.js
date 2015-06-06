var mongoose = require('mongoose'),
    shortid = require('shortid32');

// 32 custom unicode string
shortid.characters('123456abcdefghijklmnopqrstuvwxyz');

module.exports = mongoose.model('Table', {
    _id: {
        type: String,
        unique: true,
        'default': shortid.generate()
    },
    data: Array,
    update_code: {
        type: String,
        unique: false,
        'default': shortid.generate()
    },
    created_at: String,
    updated_at: String
});
