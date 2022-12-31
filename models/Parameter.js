module.exports = (sequelize, Sequelize) => {
  const Parameter = sequelize.define(
    'parameters',
    {
      businessName: {
        type: Sequelize.STRING,
        required: true,
        min: 5,
      },
      businessId: {
        type: Sequelize.STRING,
        required: true,
      },
      businessBio: {
        type: Sequelize.STRING,
        required: true,
      },
      businessAddress: {
        type: Sequelize.STRING,
        required: true,
      },
      businessLocation: {
        type: Sequelize.STRING,
        required: true,
      },
      notifyLogin: {
        type: Sequelize.BOOLEAN,
      },
      uses_2fa: {
        type: Sequelize.BOOLEAN,
      },
      active: {
        type: Sequelize.INTEGER,
        default: 0
      },
      user_id: {
        // Set FK relationship (hasMany) with `User`
        type: Sequelize.INTEGER,
        required: true,
        references: {
          model: 'users',
          key: 'id',
        },
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );

  return Parameter;
};
