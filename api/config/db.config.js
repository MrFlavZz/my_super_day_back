module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "CBISEN1597F7",
    DB: "mysuperday",
    dialect: "mysql",
    dialectOptions : {
        socketPath : "/srv/run/mysqld/mysqld.sock"
    },
    pool: {
        max: 30,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};