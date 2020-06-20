module.exports = (sequelize, Sequelize) => {
    const Agenda = sequelize.define("agenda", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        id_users: {
            type: Sequelize.INTEGER
        },
        title: {
            type: Sequelize.STRING
        },
        start: {
            type: Sequelize.STRING
        },
        end: {
            type: Sequelize.STRING
        },

    }, {
        timestamps: false,
        freezeTableName: true
    });

    return Agenda;
};