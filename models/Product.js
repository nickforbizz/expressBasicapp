module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define(
    'products',
    {
      product_category_id: {
        type: Sequelize.INTEGER,
        required: true,
        references: {
            model: 'product_categories',
            key: 'id'
        },
      },
      vehicle_make_id: {
        type: Sequelize.INTEGER,
        required: true,
        references: {
            model: 'vehicle_makes',
            key: 'id'
        },
      },
      vehicle_model_id: {
        // Set FK relationship (hasMany) with `VehicleModel`
        type: Sequelize.INTEGER,
        required: true,
        references: {
          model: 'vehicle_models',
          key: 'id',
        },
      },
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
      quantity: {
        type: Sequelize.INTEGER,
      },
      size: {
        type: Sequelize.STRING,
        min: 2,
      },
      color: {
        type: Sequelize.STRING,
        min: 2,
      },
      discount: {
        type: Sequelize.BOOLEAN,
        dafault: false,
      },
      discount_amt: {
        type: Sequelize.INTEGER,
        min: 1,
      },
      is_sold: {
        type: Sequelize.BOOLEAN,
        default: 0,
      },
      price: {
        type: Sequelize.INTEGER,
        min: 2,
      },
      condition: {
        type: Sequelize.STRING,
        min: 2,
      },
      body_type: {
        type: Sequelize.STRING,
        min: 2,
      },
      business_id: {
        type: Sequelize.INTEGER,
        required: true,
        default: 0
      },
      image: {
        type: Sequelize.STRING,
      },

      image_url: {
        type: Sequelize.STRING,
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

  return Product;
};
