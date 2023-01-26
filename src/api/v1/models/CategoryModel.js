module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("category", {
    parentId: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue:'active'
    }
  });

  return Category;
  
};
