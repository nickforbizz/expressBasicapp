module.exports = (sequelize, Sequelize) => {
  const Business = sequelize.define(
    'business',
    {
      title: {
        type: Sequelize.STRING,
        required: true,
        min: 5,
      },
      description: {
        type: Sequelize.STRING,
        min: 5,
        max: 255,
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

  return Business;
};
