// server and route variables
import express from 'express';
import path from 'path';
import routes from './controllers/index.js'
const app = express();
const PORT = process.env.PORT || 3001;

// handlebars and helper variables
import exphbs from 'express-handlebars';
const hbs = exphbs.create({});
import dotenv from 'dotenv';
dotenv.config();
// const helpers = require('./utils/helpers');

import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// sequelize and session variables
import sequelize from './config/connection.js';
import session from 'express-session';
import sequelize_store from 'connect-session-sequelize';
const SequelizeStore = sequelize_store(session.Store);

//const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
  secret: process.env.APP_SECRET,
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Rarin' ta go on http://localhost:${PORT}`)
  );
});
