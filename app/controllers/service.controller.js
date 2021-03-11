const db = require('../models')
const Service = db.services
const Op = db.Sequelize.Op;

// Create and Save a new service
exports.create = (req, res) => {

    //validate value name
    if (!req.body.description) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a service
    const service = {
        description: req.body.description,
        value: req.body.value
    };

    // Save service in the database
    Service.create(service)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the service."
            });
        });

};

// find all services from the database.


exports.findAll = (req, res) => {
    const description = req.query.description;
    var condition = description ? { description: { [Op.like]: `%${description}%` } } : null;

    Service.findAll({ where: condition})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving services."
            });
        });
};


// Find a single service with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Service.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving service with id=" + id
            });
        });
};

// Update a service by the id in the request
exports.update = (req, res) => {

    const id = req.params.id;

    Service.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "service was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update service with id=${id}. Maybe service was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating service with id=" + id + " Erro "+ err
            });
        });

};

// Delete a service with the specified id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

    Service.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "service was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete service with id=${id}. Maybe Task was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete service with id=" + id
            });
        });

};

// Delete all services from the database.
exports.deleteAll = (req, res) => {

};



