module.exports = app => {
    const client = require('../controllers/client.controller')

    var router = require("express").Router();

    // Create a new Client

    router.post('/client', client.create);

    //Find all clients
    router.get('/client', client.findAll);

    // Find by ID
    router.get("/client/:id", client.findOne);

    // Update a client
    router.put("/client/:id", client.update);

    router.delete("/client/:id", client.delete);

    app.use('/', router);


};