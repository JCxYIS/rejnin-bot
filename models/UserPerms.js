module.exports = (sequelize, DataTypes) => {
  return sequelize.define("users", {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    permissions: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
};
