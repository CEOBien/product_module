const router = require("express").Router();
const productController = require("../controllers/productController");
const { uploadFile } = require("../middlewares/upload");
const { validProduct } = require("../middlewares/valid");
router.post(
  "/createProduct",
  uploadFile.single("image"),
  validProduct,
  productController.createProduct
);
router.get("/getProductId/:id", productController.getProductId);
router.get("/getAllProduct", productController.getAllProduct);
router.patch(
  "/updateProduct/:id",
  uploadFile.single("image"),
  productController.updateProduct
);
router.post("/searchProduct", productController.searchProduct);
router.delete("/deleteProduct/:id", productController.deleteProduct);

module.exports = router;
