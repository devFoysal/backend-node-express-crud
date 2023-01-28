module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("category", {
    parentId: {
      type: DataTypes.INTEGER,
      references: {
        model: { tableName: "categories" },
        key: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"),
      defaultValue: "active",
    },
  });

  return Category;
};
