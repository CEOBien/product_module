const createError = require("http-errors");
const productService = require("../services/productService");
const createSuccess = require("../helpers/createSuccess");

const productController = {
  createProduct: async (req, res, next) => {
    try {
      const { NAME, DESC, PRICE, CATEGORY_ID, CD } = req.body;
      const IMAGE_NAME = req.file.filename;
      if (!IMAGE_NAME) throw createError.BadRequest("Imgae name not exist");
      const { status, message } = await productService.createProduct({
        NAME,
        DESC,
        PRICE,
        CATEGORY_ID,
        IMAGE_NAME,
        CD,
      });
      return res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  getProductId: async (req, res, next) => {
    try {
      const { id } = req.params;
      const { status, message, elements, baseUrl } =
        await productService.getProductId(id);
      return res
        .status(status)
        .json(createSuccess(status, message, elements, baseUrl));
    } catch (error) {
      next(error);
    }
  },
  getAllProduct: async (req, res, next) => {
    try {
      const { status, message, elements, baseUrl } =
        await productService.getAllProduct();
      return res
        .status(status)
        .json(createSuccess(status, message, elements, baseUrl));
    } catch (error) {
      next(error);
    }
  },
  updateProduct: async (req, res, next) => {
    try {
      const { NAME, DESC, PRICE, CATEGORY_ID, CD } = req.body;
      const IMAGE_NAME = req.file.filename;
      if (!IMAGE_NAME) throw createError.BadRequest("Image name not exist");
      const { id } = req.params;
      const check = await productService.getProductById(id);
      if (!check) throw createError.NotFound("Id not found");
      const { status, message } = await productService.updateProduct(
        {
          NAME,
          DESC,
          PRICE,
          CATEGORY_ID,
          CD,
          IMAGE_NAME,
        },
        id
      );
      res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  deleteProduct: async (req, res, next) => {
    try {
      const { id } = req.params;
      const check = await productService.getProductById(id);
      if (!check) throw createError.NotFound("Id not found");
      const { status, message } = await productService.deleteProduct(id);
      return res.status(status).json(createSuccess(status, message));
    } catch (error) {
      next(error);
    }
  },
  searchProduct: async (req, res, next) => {
    try {
      const { status, message, elements, baseUrl } =
        await productService.searchProduct(req.body);
      res
        .status(status)
        .json(createSuccess(status, message, elements, baseUrl));
    } catch (error) {
      next(error);
      console.log(error)
    }
  },
};
module.exports = productController;
