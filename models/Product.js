const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Product extends Model {
  static upvote(body, models) {
    return models.Vote.create({
      user_id: body.user_id,
      product_id: body.product_id,
    }).then(() => {
      return Product.findOne({
        where: {
          id: body.product_id,
        },
        attributes: [
          "id",
          "title",
          "description",
          "price",
          "img_link",
          "created_at",
          [
            sequelize.literal(
              "(SELECT COUNT(*) FROM vote WHERE product.id = vote.product_id)"
            ),
            "vote_count",
          ],
        ],
        include: [
          {
            model: models.Comment,
            attributes: ["id", "text", "product_id", "user_id", "created_at"],
            include: {
              model: models.User,
              attributes: ["username"],
            },
          },
        ],
      });
    });
  }
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    img_link: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      references: {
        model: "user",
        key: "id",
      },
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn("NOW"),
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "product",
  }
);

module.exports = Product;
