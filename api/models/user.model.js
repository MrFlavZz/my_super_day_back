module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,

        },
        username: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        adresse_domicile: {
            type: Sequelize.STRING
        },
        adresse_travail: {
            type: Sequelize.STRING,
        },
        birth_date: {
            type: Sequelize.DATE,
        }
    });

    return User;
};