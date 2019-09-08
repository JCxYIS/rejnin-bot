module.exports = (sequelize, DataTypes) => {
  return sequelize.define('quotes', {
    user_id: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT,
    },
    usage_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
  });
};
