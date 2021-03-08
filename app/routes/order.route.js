module.exports = app => {
    const order = require('../controllers/order.controller')

    var router = require("express").Router();

    // Create a new order
    router.post('/order', order.create);

    //Find all orders
    router.get('/order', order.findAll);

    // Find by ID
    router.get("/order/:id", order.findOne);

    // Update a order
    router.put("/order/:id", order.update);

    router.delete("/order/:id", order.delete);

    app.use('/', router);


};