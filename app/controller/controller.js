const db = require("../index");
const Category = db.categories;
const Banner = db.banner;
const BASE_URL = "https://creations-dsb1.onrender.com/uploads/"


exports.getAllCategories = async (req, res) => {
  try {
    // Raw query to fetch categories + subcategories
    const [rows] = await db.sequelize.query(`
      SELECT 
        c.cate_id,
        c.cate_name,
        c.is_active,

        sc.sub_cate_id,
        sc.sub_cate_name,
        sc.position,
        sc.status AS sub_status,
        sc.is_active AS sub_is_active

      FROM Categories c
      LEFT JOIN SubCategories sc 
        ON sc.categoty_id = c.cate_id
        AND sc.is_active = 1
        AND sc.isDeleted = 0

      WHERE c.is_active = 1
      ORDER BY c.cate_id ASC, sc.position ASC
    `);

    // Group subcategories under categories
    const categoriesMap = {};

    rows.forEach(row => {
      if (!categoriesMap[row.cate_id]) {
        categoriesMap[row.cate_id] = {
          cate_id: row.cate_id,
          cate_name: row.cate_name,
          is_active: row.is_active,
          subcategories: []
        };
      }

      if (row.sub_cate_id) {
        categoriesMap[row.cate_id].subcategories.push({
          sub_cate_id: row.sub_cate_id,
          sub_cate_name: row.sub_cate_name,
          position: row.position,
          status: row.sub_status,
          is_active: row.sub_is_active
        });
      }
    });

    // Convert object to array
    const categories = Object.values(categoriesMap);

    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};


exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.bannerimages = async (req, res) => {
    try {
        // Join paths into a single string
        const imagePaths = req.files.map(file => file.path).join(','); 

        const newBanner = await Banner.create({
            images: imagePaths,
            status: 'ACTIVE'
        });

        res.json(newBanner);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getAllhomedata = async (req, res) => {
    try {
        // Fetch banners
        const [banners] = await db.sequelize.query(`
            SELECT baner_id, images, status, createdAt, updatedAt 
            FROM Banner 
            WHERE status = 'ACTIVE'
        `);

        const bannersWithFullUrl = banners.map(b => ({
            ...b,
            images: b.images
                ? b.images.split(',').map(img => `${BASE_URL}/${img.replace(/\\/g, '/')}`)
                : []
        }));

        // Fetch categories
        const [categories] = await db.sequelize.query(`
            SELECT cate_id, cate_name, status, createdAt, updatedAt
            FROM Categories 
            WHERE status = 'ACTIVE'
        `);

        // Fetch all products
        const [products] = await db.sequelize.query(`
            SELECT prod_id, prod_name, category_id, is_active, position, status, isDeleted, createdAt, updatedAt
            FROM Products
            WHERE status = 'ACTIVE'
        `);

        // Fetch all sizes
        // const [sizes] = await db.sequelize.query(`
        //     SELECT size_id, size_code, size_label, product_id, createdAt, updatedAt
        //     FROM Prod_Size
        // `);

        // Map products to include their sizes
        const productsWithSizes = products.map(prod => ({
            ...prod,
            sizes: sizes.filter(size => size.product_id === prod.prod_id)
        }));

        // Map categories to include products
        const categoriesWithProducts = categories.map(cat => ({
            ...cat,
            products: productsWithSizes.filter(prod => prod.category_id === cat.cate_id)
        }));

        // Return structured JSON
        res.json({
            banners: bannersWithFullUrl,
            categories: categoriesWithProducts
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

