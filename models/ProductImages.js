module.exports = (sequelize, Sequelize) => {
  const ProductImages = sequelize.define(
    'product_images',
    {
      product_id: {
        type: Sequelize.INTEGER,
        required: true,
        references: {
          model: 'products',
          key: 'id',
        },
      },
      name: {
        type: Sequelize.STRING,
        min: 2,
        max: 255,
      },
      url: {
        type: Sequelize.STRING,
        min: 2,
        max: 255,
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

  return ProductImages;
  
};
