module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("order", {

      value:{
          type: DataTypes.FLOAT
      },
      description: {
        type: DataTypes.STRING
      }
      
    });
  
    return Order;
  };