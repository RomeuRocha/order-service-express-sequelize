module.exports =  (sequelize, DataTypes) => {

    const Product = sequelize.define("product",{

        name: DataTypes.STRING,
        value: DataTypes.FLOAT

    })

    return Product;

}