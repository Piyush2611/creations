module.exports = (sequelize, Sequelize) => {
    const categories = sequelize.define(
        "Categories",
        {
            cate_id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            cate_name :{
                type : Sequelize.STRING,
                // defaultValue:null
                allowNull: false,
            },
            is_active :{
                type:Sequelize.BOOLEAN,
                defaultValue:true
            },
            position :{
                type:Sequelize.INTEGER,
                defaultValue:0
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

    return categories;
};
