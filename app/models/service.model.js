module.exports = (sequelize, DataTypes) => {
    const Service = sequelize.define("service", {
      description: {
        type: DataTypes.STRING
       
      },
      value: {
        type: DataTypes.FLOAT
      }
      
    });
  
    return Service;
  };