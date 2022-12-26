module.exports = (sequelize, Sequelize) => {
    const VehicleModel = sequelize.define(
      'vehicle_models',
      {
    fk_veh_make: {
        type: Sequelize.INTEGER,
        references: {
            model: 'vehicle_makes',
            key: 'id'
        },
        required: true
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
    created_by: {
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