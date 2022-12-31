const Models = require('../models')
const User = Models.User


const loggedUser = async (email) => {
    let user = await User.findAll({where: {email: email}});
    return user[0];
}

module.exports = loggedUser