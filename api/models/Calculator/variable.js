module.exports = (sequelize, Sequelize) => {
    const Var = sequelize.define("calculator_variable", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        id_users: {
            type: Sequelize.INTEGER
        },
        variable: {
            type: Sequelize.STRING
        },

    }, {
        timestamps: false,
        freezeTableName: true

    });

    return Var;
};