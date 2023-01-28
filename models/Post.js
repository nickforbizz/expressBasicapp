module.exports = (sequelize, Sequelize) => {
  const Post = sequelize.define(
    'posts',
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
      category: {
        type: Sequelize.STRING,
        min: 6,
        max: 1024,
      },
      image: {
        type: Sequelize.STRING,
      },

      image_url: {
        type: Sequelize.STRING,
      },
      business_id: {
        type: Sequelize.INTEGER,
        required: true,
        default: 0
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

  

  return Post;
};
