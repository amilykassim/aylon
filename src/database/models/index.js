import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configJs from '../config/config';

const basename = path.basename(__filename);
const env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';

const config = configJs[env];

const db = {};

let sequelize;
if (env === 'production') {
  sequelize = new Sequelize(
    process.env[config.use_env_variable], config,
  );
} else {
  sequelize = new Sequelize(
    config.database, config.username, config.password, config,
  );
}

fs
  .readdirSync(__dirname)
  .filter((file) => (file.indexOf('.') !== 0)
           && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
