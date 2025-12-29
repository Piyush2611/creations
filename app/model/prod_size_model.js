module.exports = (sequelize, Sequelize) => {
    const Size = sequelize.define("Prod_Size", {
        size_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        size_code: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
        },
        product_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            references: {
                model: 'Products',
                key: 'prod_id',
            }
        },
        size_label: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    });

    return Size;
};
