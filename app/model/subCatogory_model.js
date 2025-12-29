module.exports = (sequelize, Sequelize) => {
    const subcategories = sequelize.define(
        "SubCategories",
        {
            sub_cate_id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            sub_cate_name :{
                type : Sequelize.STRING,
                // defaultValue:null
                allowNull: false,
            },
            categoty_id :{
                type : Sequelize.INTEGER,
                references: {
                    model: 'Categories', 
                    key: 'cate_id',
                }
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

    return subcategories;
};
