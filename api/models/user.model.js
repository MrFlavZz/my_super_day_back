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
        homeAddress: {
            type: Sequelize.STRING
        },
        workAddress: {
            type: Sequelize.STRING,
        },
        birthDate: {
            type: Sequelize.DATE,
        }
    }, {
        timestamps: false
    });

    return User;
};