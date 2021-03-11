module.exports = app => {
    const product = require('../controllers/product.controller')

    var router = require("express").Router();

    // Create a new Client

    router.post('/product', product.create);

    //Find all products
    router.get('/product', product.findAll);

    // Find by ID
    router.get("/product/:id", product.findOne);

    // Update a product
    router.put("/product/:id", product.update);

    router.delete("/product/:id", product.delete);

    app.use('/', router);


};