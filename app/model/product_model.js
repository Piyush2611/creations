module.exports = (sequelize, Sequelize) => {
    const products = sequelize.define(
        "Products",
        {
            prod_id: {
                type: Sequelize.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            prod_name :{
                type : Sequelize.STRING,
                // defaultValue:null
                allowNull: false,
            },
            category_id :{
                type : Sequelize.INTEGER,
                references: {
                model: 'Categories', 
                key: 'cate_id',
            }
            },
            sub_category_id :{
                type : Sequelize.INTEGER,
                references: {
                    model: 'SubCategories', 
                    key: 'sub_cate_id',
                }
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

    return products;
};
