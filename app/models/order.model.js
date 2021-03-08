module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("order", {
      service: {
        type: DataTypes.STRING
       
      },
      value:{
          type: DataTypes.FLOAT
      }
      
    });
  
    return Order;
  };