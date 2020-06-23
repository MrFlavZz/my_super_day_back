
const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        dialectOptions:config.dialectOptions,

        pool: {
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.variable = require("./Calculator/variable")(sequelize, Sequelize);
db.function = require("./Calculator/function")(sequelize, Sequelize);
db.noteBlock = require("./NoteBlock/noteBlock")(sequelize, Sequelize);
db.meteo= require("./Meteo/meteo")(sequelize, Sequelize);
db.horoscope= require("./Horoscope/horoscope")(sequelize, Sequelize);
db.agenda= require("./Agenda/agenda")(sequelize, Sequelize);
db.trajet= require("./Trajet/trajet")(sequelize, Sequelize);



module.exports = db;