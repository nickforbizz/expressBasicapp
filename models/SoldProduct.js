module.exports = (sequelize, Sequelize) => {
  const SoldProduct = sequelize.define(
    'sold_products',
    {
      product_id: {
        type: Sequelize.INTEGER,
        required: true,
        references: {
          model: 'products',
          key: 'id',
        },
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

  return SoldProduct;
  
};
