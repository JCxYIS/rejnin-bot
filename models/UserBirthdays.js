module.exports = (sequelize, DataTypes) => {
  return sequelize.define("userbirthdays", {
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    birthday: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {
    timestamps: false,
  });
};
