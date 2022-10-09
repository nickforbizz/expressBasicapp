const User = require('../models/User');

const getUsers = async (req, res) => {
    let users = await User.find()
    res.send(users);
}


module.exports = {
    getUsers
}