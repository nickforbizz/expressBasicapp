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
    },
    {
      timestamps: true,
      underscored: true,
    }
  );

  return User;
};
