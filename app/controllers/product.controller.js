const db = require('../models')
const Product = db.products
const Op = db.Sequelize.Op;

// Create and Save a new product
exports.create = (req, res) => {

    //validate value name
    if (!req.body.name) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a product
    const product = {
        name: req.body.name,
        value: req.body.value
    };

    // Save product in the database
    Product.create(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the product."
            });
        });

};

// find all products from the database.


exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? {  name: { [Op.like]: `%${name}%` } } : null;

    Product.findAll({ where: condition,attributes: ['id', 'name','value']})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving products."
            });
        });
};


// Find a single product with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Product.findByPk(id,{attributes: ['id', 'name','value']})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving product with id=" + id
            });
        });
};

// Update a product by the id in the request
exports.update = (req, res) => {

    const id = req.params.id;

    Product.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "product was updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update product with id=${id}. Maybe product was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating product with id=" + id + " Erro "+ err
            });
        });

};

// Delete a product with the specified id in the request
exports.delete = (req, res) => {

    const id = req.params.id;

    Product.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "product was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete product with id=${id}. Maybe Task was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete product with id=" + id
            });
        });

};

// Delete all products from the database.
exports.deleteAll = (req, res) => {

};



