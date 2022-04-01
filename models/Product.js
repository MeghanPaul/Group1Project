const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Product extends Model {}

Product.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: true
        },
        img_link: {
            type: DataTypes.TEXT,
            allowNull: true,
            validate: {
                isUrl: true
            }
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'product'
    }
);

module.exports = Product;