module.exports = (sequelize, DataTypes) => {
    const ItemService = sequelize.define("itemService", {
      
      value: {
        type: DataTypes.FLOAT
      }
      
    });
  
    return ItemService;
  };