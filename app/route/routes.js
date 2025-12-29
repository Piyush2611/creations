const controller = require("../controller/controller");
const upload = require("../multer");

module.exports = app =>{
    app.get('/getAllCatogories',controller.getAllCategories);
    app.post('/banner',upload.array('images'),controller.bannerimages);
    app.get('/getAllhomedata',controller.getAllhomedata);
}