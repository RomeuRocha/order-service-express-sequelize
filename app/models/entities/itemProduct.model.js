module.exports = (sequelize, DataTypes) => {
    const itemProduct = sequelize.define("itemProduct", {
      
      value: {
        type: DataTypes.FLOAT
      },
      quantity:{
        type: 
        DataTypes.INTEGER
      }
      
      
    });
  
    return itemProduct;
  };