const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');
const Vote = require('./Vote');
const Product = require('./Product');

// associations
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

User.belongsToMany(Product, {
    through: Vote,
    as: 'voted_products',
    foreignKey: 'user_id'
});

Product.belongsToMany(User, {
    through: Vote,
    as: 'voted_products',
    foreignKey: 'product_id'
});

Vote.belongsTo(User, {
    foreignKey: 'user_id'
});

Vote.belongsTo(Product, {
    foreignKey: 'product_id'
});

User.hasMany(Vote, {
    foreignKey: 'user_id'
});

Product.hasMany(Vote, {
    foreignKey: 'product_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(Product, {
    foreignKey: 'product_id'
});

User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Product.hasMany(Comment, {
    foreignKey: 'product_id'
});

User.hasMany(Product, {
    foreignKey: 'product_id'
});

Product.belongsTo(User, {
    foreignKey: 'product_id'
});

module.exports = { User, Post, Comment, Vote, Product };