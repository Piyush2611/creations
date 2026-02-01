const { homepage } = require("..");

module.exports = (sequelize, Sequelize) => {
    const banner = sequelize.define(
        "Banner",
        {
            baner_id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            homepage_id :{
                type : Sequelize.INTEGER,
                allowNull:true,
                references :{
                    model : 'HomePage',
                    id:'home_id'
                }
            },
            images :{
                type : Sequelize.TEXT,
                defaultValue : true,
                allowNull: false,
            },
            postion :{
                type : Sequelize.INTEGER,
                defaultValue : 0
            },
            status: {
                type: Sequelize.ENUM("ACTIVE", "INACTIVE"),
                // defaultValue: "ACTIVE",
            },
            isDeleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            
        },
        {
            freezeTableName: true,
        }
    );

    return banner;
};
