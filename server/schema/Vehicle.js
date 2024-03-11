const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
  const Vehicle = sequelize.define('Vehicle', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Generate UUID automatically
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    variant: {
      type: DataTypes.STRING,
      allowNull: false
    },
    wheels: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    registration_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    }
  }, {
    timestamps: false
  });

  return Vehicle;
};
