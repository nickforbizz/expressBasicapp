module.exports = (sequelize, Sequelize) => {
  const SoldProduct = sequelize.define(
    'sold_products',
    {
      fk_product: {
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

  return SoldProduct;
  
};
