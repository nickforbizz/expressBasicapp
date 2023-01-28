const { User } = require('../models');



const BusinessQuery = async (user_id) => {
    let bs_query = null;
    // check if user in db
    if(!user_id) return null;

    const user = await User.findByPk(user_id);
    if(!user) return null;
    if(user.is_admin == 1) return null;

    bs_query = {business_id: user.business_id}
    return bs_query;
}

module.exports = BusinessQuery