const db = require('../models')
const Order = db.orders
const Op = db.Sequelize.Op;

// Create and Save a new Order
exports.create = (req, res) => {

    //validate value service
    if (!req.body.clientId) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Order
    const order = {
        clientId: req.body.clientId,
        value: req.body.value
    };

    // Save Order in the database
    Order.create(order)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Order."
            });
        });

};

// find all Orders from the database.


exports.findAll = (req, res) => {
    const service = req.query.service;
    var condition = service ? { service: { [Op.like]: `%${service}%` } } : null;

    Order.findAll(
        {
            attributes: { exclude: ['createdAt', 'updatedAt', 'clientId'] },
            where: condition,
            include: [
                {
                    model: db.clients,
                    required: true,
                    attributes: ['id', 'name']
                },
                {
                    model: db.itemServices,
                    attributes: ['id', 'value'],
                    include: [
                        { 
                            model: db.services,
                            attributes: ['description'],
                            required: true
                        }
                    ]
                    
                }
            ]
        })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Orders."
            });
        });
};


// Find a single Order with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Order.findByPk(id, { include: db.clients })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Order with id=" + id
            });
        });
};

// Update a Order by the id in the request
exports.update = (req, res) => {

    const id = req.params.id;

    Order.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Order was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Order with id=${id}. Maybe Order was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Order with id=" + id + " Erro " + err
            });
        });

};

// Delete a Order with the specified id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

    Order.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Order was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Order with id=${id}. Maybe Task was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Order with id=" + id
            });
        });

};

// Delete all Orders from the database.
exports.deleteAll = (req, res) => {

};



