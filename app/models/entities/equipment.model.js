module.exports =  (sequelize, DataTypes) => {

    const Equipment = sequelize.define("equipment",{

        serialNumber: DataTypes.STRING,

    })

    return Equipment;

}