const { DataTypes } = require('sequelize');

// Define the user model
module.exports = (sequelize) => {
  const MigrationSchema = sequelize.define('migration_schemas', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, // Generate UUID automatically
      primaryKey: true
    },
    migration_script_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });

  return MigrationSchema;
};
