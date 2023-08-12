const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    healthScore: {
      type: DataTypes.INTEGER,
      validate: {
        min: 0,
        max: 100,
      },
      allowNull: false, 
    },
    steps: {
      type: DataTypes.ARRAY(DataTypes.JSON),
    },
    diets: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  }, { timestamps: false });
};
