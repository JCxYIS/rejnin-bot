module.exports = (sequelize, DataTypes) => {
  return sequelize.define("UserBalanceHistory", {
    user_id: {
      type: DataTypes.STRING,
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {
    updatedAt: false,
    createdAt: "timestamp",
  });
};
