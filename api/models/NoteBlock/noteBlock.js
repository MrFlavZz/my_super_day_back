module.exports = (sequelize, Sequelize) => {
    const Noteblock = sequelize.define("noteblock", {
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

    }, {
        timestamps: false,
        freezeTableName: true
    });

    return Noteblock;
};