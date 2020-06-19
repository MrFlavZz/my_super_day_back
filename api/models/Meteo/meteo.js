module.exports = (sequelize, Sequelize) => {
    const Weather = sequelize.define("weather", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        id_users: {
            type: Sequelize.INTEGER
        },
        address: {
            type: Sequelize.STRING
        },

    }, {
        timestamps: false,
        freezeTableName: true
    });

    return Weather;
};