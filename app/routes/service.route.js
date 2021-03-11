module.exports = app => {
    const service = require('../controllers/service.controller')

    var router = require("express").Router();

    // Create a new service

    router.post('/service', service.create);

    //Find all services
    router.get('/service', service.findAll);

    // Find by ID
    router.get("/service/:id", service.findOne);

    // Update a service
    router.put("/service/:id", service.update);

    router.delete("/service/:id", service.delete);

    app.use('/', router);


};