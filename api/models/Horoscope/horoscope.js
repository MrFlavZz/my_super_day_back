module.exports = (sequelize, Sequelize) => {
    const Horoscope = sequelize.define("horoscope", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
       aries: {
            type: Sequelize.STRING
        },
        taurus: {
            type: Sequelize.STRING
        },
        gemini: {
            type: Sequelize.STRING
        },
        cancer: {
            type: Sequelize.STRING
        },
        leo: {
            type: Sequelize.STRING
        },
        virgo: {
            type: Sequelize.STRING
        },
        libra: {
            type: Sequelize.STRING
        },
        scorpio: {
            type: Sequelize.STRING
        },
        sagittarius: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.STRING
        },


    }, {
        timestamps: false,
        freezeTableName: true
    });

    return Horoscope;
};