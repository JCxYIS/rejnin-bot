module.exports = (sequelize, DataTypes) => {
  return sequelize.define("userbalance", {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    lastDaily: {
      type: DataTypes.STRING,
      defaultValue: "nope",
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
};
