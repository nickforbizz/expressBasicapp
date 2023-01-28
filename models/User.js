module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    'users',
    {
      name: {
        type: Sequelize.STRING,
        required: true,
        min: 5,
      },
      email: {
        type: Sequelize.STRING,
        required: true,
        min: 5,
        max: 255,
      },
      password: {
        type: Sequelize.STRING,
        required: true,
        min: 6,
        max: 1024,
      },
      image: {
        type: Sequelize.STRING,
      },

      imageUrl: {
        type: Sequelize.STRING,
      },
      business_id: {
        // Set FK relationship (hasMany) with `User`
        type: Sequelize.INTEGER,
        required: true,
        default: 0,
        references: {
          model: 'business',
          key: 'id',
        },
      },
      is_admin: {
        type: Sequelize.INTEGER,
        required: true,
        default: 0
      },
      is_super_admin: {
        type: Sequelize.INTEGER,
        required: true,
        default: 0
      },
      active: {
        type: Sequelize.INTEGER,
        default: 0
      },
    },
    {
      timestamps: true,
      underscored: true,
    }
  );

  return User;
};
