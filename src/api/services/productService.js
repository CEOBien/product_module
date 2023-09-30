const { logUpdate, logCreate } = require("../helpers/logQuery");
const createError = require("http-errors");
const { Products } = require("../models");
const { Op } = require("sequelize");
const fs = require("fs");
const productService = {
  createProduct: async (product) => {
    return new Promise(async (resolve, reject) => {
      try {
        const exist = await Products.findOne({
          where: {
            CD: product.CD,
            IS_DELETED: false,
          },
        });
        if (exist) throw createError.BadRequest("CD product existed");
        await Products.create({
          ...product,
          ...logCreate(Products.CREATED_BY),
        });
        resolve({
          status: 200,
          message: "Create product successfully",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getProductId: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getProductId = await Products.findOne({
          where: {
            id: id,
            IS_DELETED: false,
          },
        });
        const filePath = `${process.env.BASE_URL}/files`;
        resolve({
          status: 200,
          message: "Get product id successfully",
          elements: getProductId,
          baseUrl: filePath,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getAllProduct: async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const getAllProduct = await Products.findAll({
          where: {
            IS_DELETED: false,
          },
        });
        const filePath = `${process.env.BASE_URL}/files`;
        resolve({
          status: 200,
          message: "Get all product successfully",
          elements: getAllProduct,
          baseUrl: filePath,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  updateProduct: async (product, id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const exist = await Products.findOne({
          where: {
            id: id,
            IS_DELETED: false,
          },
          raw:true
        });
        //check if exist or not
        if (!exist) throw createError.BadRequest("Product not found");
        const filePath = `${process.env.UPLOADED_FOLDER}/files/${exist.IMAGE_NAME}`;
        fs.unlinkSync(filePath, (err) => {
          if (err) {
            throw err;
          }
        });
        await Products.update(
          {
            ...product,
            ...logUpdate(product.UPDATED_BY),
          },
          {
            where: {
              id: id,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: 200,
          message: "Update product successfully",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  deleteProduct: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        await Products.update(
          {
            IS_DELETED: true,
          },
          {
            where: {
              id: id,
              IS_DELETED: false,
            },
          }
        );
        resolve({
          status: 200,
          message: "Delete product successfully",
        });
      } catch (error) {
        reject(error);
      }
    });
  },
  getProductById: async (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const getById = await Products.findOne({
          where: {
            id: id,
            IS_DELETED: false,
          },
        });
        resolve(getById);
      } catch (error) {
        reject(error);
      }
    });
  },
  searchProduct: async ({NAME}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const products = await Products.findAll({
          where: {
            NAME:{
              [Op.like]: '%' + NAME + '%',
            },
            IS_DELETED: false,
          },
        });
        const filePath = `${process.env.BASE_URL}/files`;
        resolve({
          status: 200,
          message: "Search product successfully",
          elements: products,
          baseUrl: filePath,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

module.exports = productService;
