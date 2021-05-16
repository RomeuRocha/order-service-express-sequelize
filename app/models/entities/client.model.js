module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define("client", {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      birthDate: {
        type: DataTypes.DATE
      },
      cpf: {
        type: DataTypes.STRING
      },
      
      
    });
  
    return Client;
  };