import User from './User.js';
import Post from './Post.js';
import Comment from './Comment.js';
import Vote from './Vote.js';
import Product from './Product.js';

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

export { User, Post, Comment, Vote, Product }