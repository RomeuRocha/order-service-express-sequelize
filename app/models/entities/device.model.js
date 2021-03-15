module.exports =  (sequelize, DataTypes) => {

    const Device = sequelize.define("device",{

        name: DataTypes.STRING,

    })

    return Device;

}