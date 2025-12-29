module.exports = (sequelize, Sequelize) => {
    const homepage = sequelize.define(
        "HomePage",
        {
            home_id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            baner_id :{
                type : Sequelize.TEXT,
                defaultValue : true
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

    return homepage;
};
