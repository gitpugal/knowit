var mongoose = require('mongoose');


var userSchema = mongoose.Schema({
    email: String,
    password: String,
    username: String,
    estatus: String,
    resume: String
});

const Users = mongoose.model('Clients', userSchema);

module.exports = Users;


