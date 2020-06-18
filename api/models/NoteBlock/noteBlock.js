module.exports = (sequelize, Sequelize) => {
    const Noteblock = sequelize.define("noteBlock", {
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
        value: {
            type: Sequelize.STRING
        },

    }, {
        timestamps: false,
        freezeTableName: true
    });

    return Noteblock;
};