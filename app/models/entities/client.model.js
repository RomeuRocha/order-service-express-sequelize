module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define("client", {
      name: {
        type: DataTypes.STRING
       
      },
      birthDate: {
        type: DataTypes.DATE
      }
      
    });
  
    return Client;
  };