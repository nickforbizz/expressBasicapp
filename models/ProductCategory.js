module.exports = (sequelize, Sequelize) => {
  const ProductCategory = sequelize.define(
    'product_categories',
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

  return ProductCategory;
};
