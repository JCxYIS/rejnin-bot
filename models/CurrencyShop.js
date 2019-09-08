module.exports = (sequelize, DataTypes) => {
  return sequelize.define("currencyShop", {
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
};
