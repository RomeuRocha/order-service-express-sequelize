module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("order", {

      value:{
          type: DataTypes.FLOAT
      }
      
    });
  
    return Order;
  };