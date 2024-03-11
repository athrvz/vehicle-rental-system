const { DataTypes } = require('sequelize');
const User = require('./User');
const Vehicle = require('./Vehicle');

module.exports = (sequelize) => {
  const Rental = sequelize.define('Rental', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    vehicleId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'Vehicle',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    fromDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    toDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    createAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    timestamps: false
  });

  // Rental.belongsTo(User, { onDelete: 'CASCADE', foreignKey: 'userId' });
  // Rental.belongsTo(Vehicle, { onDelete: 'CASCADE', foreignKey: 'vehicleId' });


  return Rental;
};
