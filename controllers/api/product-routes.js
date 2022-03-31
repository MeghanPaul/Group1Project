const router = require('express').Router();
const withAuth = require('../utils/auth');

//Theorhetical spaceholders for product model
const Products = require('../../models');

//GET for the products homepage
router.get('/:filter', async (req, res) => {
    try
    {
        const dbProductData = await Products.findAll({
            include:
            [
                {
                    model: Products,
                    //theorhetical attribute names
                    attributes: [
                        'img_link',
                        'title',
                        'description',
                        'price',
                        'user_id',
                        'votes',
                        'creation_time'
                    ]
                },
            ],
        });

        const productPage = dbProductData.map((product)=> {
            product.get({plain:true});
        });

        res.render('home', {
            productPage,
            loggedIn: req.session.loggedIn,
            filterValue: req.params.filter,
        });
    }catch (err) {
        console.log(err);
        //status 500 -> server error, server doesn't know how to handle the route
        res.status(500).json(err);
    }
});