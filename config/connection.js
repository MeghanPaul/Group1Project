import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

let sql;

if (process.env.JAWSDB_URL) {
  sql = new Sequelize(process.env.JAWSDB_URL);
} else {
  sql = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: "localhost",
      dialect: "mysql",
      port: 3306,
      logging: false,
    }
  );
}

export {sql as default};
