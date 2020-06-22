module.exports = (sequelize, Sequelize) => {
    const Trajet = sequelize.define("trajet", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        id_users: {
            type: Sequelize.INTEGER
        },
        value: {
            type: Sequelize.STRING
        },
        title:{
            type: Sequelize.STRING
        },

    }, {
        timestamps: false,
        freezeTableName: true
    });

    return Trajet;
};