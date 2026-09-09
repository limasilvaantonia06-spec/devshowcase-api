import { DataTypes } from 'sequelize';
import { sequelize } from './db.js';

export const DeveloperProfile = sequelize.define('DeveloperProfile', {
  name: { type: DataTypes.STRING, allowNull: false },
  bio: { type: DataTypes.TEXT, allowNull: false },
  githubUrl: { type: DataTypes.STRING, allowNull: false, validate: { isUrl: true } },
  linkedinUrl: { type: DataTypes.STRING, allowNull: true, validate: { isUrl: true } },
});

export const Technology = sequelize.define('Technology', {
  name: { type: DataTypes.STRING, allowNull: false, unique: true },
  color: { type: DataTypes.STRING, allowNull: true },
});

export const Project = sequelize.define('Project', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },
  repoUrl: { type: DataTypes.STRING, allowNull: false, validate: { isUrl: true } },
  demoUrl: { type: DataTypes.STRING, allowNull: true, validate: { isUrl: true } },
});

export const Feedback = sequelize.define('Feedback', {
  author: { type: DataTypes.STRING, allowNull: false },
  comment: { type: DataTypes.TEXT, allowNull: false },
  rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
});

// Relacionamentos exigidos
DeveloperProfile.hasMany(Project, { foreignKey: 'profileId', onDelete: 'CASCADE' });
Project.belongsTo(DeveloperProfile, { foreignKey: 'profileId' });

Project.belongsToMany(Technology, { through: 'ProjectTechnologies' });
Technology.belongsToMany(Project, { through: 'ProjectTechnologies' });

Project.hasMany(Feedback, { foreignKey: 'projectId', onDelete: 'CASCADE' });
Feedback.belongsTo(Project, { foreignKey: 'projectId' });
