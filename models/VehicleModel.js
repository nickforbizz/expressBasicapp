module.exports = (sequelize, Sequelize) => {
    const VehicleModel = sequelize.define(
      'vehicle_models',
      {
    vehicle_make_id: {
        type: Sequelize.INTEGER,
        references: {
            model: 'vehicle_makes',
            key: 'id'
        },
        required: true
    },
    business_id: {
      type: Sequelize.INTEGER,
      required: true,
      default: 0
    },
    title:{
        type: Sequelize.STRING,
        required: true,
        min: 5
    },
    description:{
        type: Sequelize.STRING,
        min: 5,
        max: 255,
    },
    yom:{
        type: Sequelize.STRING,
        min: 2
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

  return VehicleModel;
};