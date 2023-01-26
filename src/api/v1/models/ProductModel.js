module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("product", {
    image: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    published: {
      type: DataTypes.BOOLEAN,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
    },
  });

  return Product;
};
