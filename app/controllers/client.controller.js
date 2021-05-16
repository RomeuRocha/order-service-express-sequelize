const db = require('../models')
const Client = db.clients
const Op = db.Sequelize.Op;

// Create and Save a new Client
exports.create = (req, res) => {

    //validate value name
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Client
    const client = {
        name: req.body.name,
        birthDate: req.body.birthDate,
        cpf: req.body.cpf
    };

    // Save client in the database
    Client.create(client)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Client."
            });
        });

};

// find all Clients from the database.


exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

    Client.findAll({ where: condition,include: db.orders })
        .then(data => {    
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Clients."
            });
        });
};


// Find a single Client with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Client.findByPk(id,{include: db.orders })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Client with id=" + id
            });
        });
};

// Update a Client by the id in the request
exports.update = (req, res) => {

    const id = req.params.id;

    Client.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Client was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update Client with id=${id}. Maybe Client was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating CLient with id=" + id + " Erro "+ err
            });
        });

};

// Delete a Client with the specified id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

    Client.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Client was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete Client with id=${id}. Maybe Task was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Client with id=" + id
            });
        });

};

// Delete all Clients from the database.
exports.deleteAll = (req, res) => {

};



