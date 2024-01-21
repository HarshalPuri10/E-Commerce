import { Product as Model } from "../index.js";

async function createProduct(obj) {
  return Model.create(obj);
}

async function getAllProductList(pipeline) {
  let rows = await Model.aggregate(pipeline);
  return rows;
}
async function getProductById(id, options = {}) {
  return Model.findById(id, options);
}
async function getProductByConditions(conditions, options) {
  return await Model.findOne(conditions, options);
}
async function updateProduct(existing, updateBody) {
  Object.assign(existing, updateBody);
  return existing.save();
}
async function deleteProduct(deleteItem) {
  return await deleteItem.remove();
}
async function findOneProduct(match, project = {}) {
  return await Model.findOne(match, project);
}
async function findOneAndUpdateProduct(match, update, options = {}) {
  return await Model.findOneAndUpdate(match, update, options);
}
async function findProducts(match, project = {}) {
  return await Model.find(match, project);
}
async function getProductsCount(match) {
  return await Model.find(match).count();
}
export {
  createProduct,
  getAllProductList,
  getProductById,
  getProductByConditions,
  updateProduct,
  deleteProduct,
  findOneProduct,
  getProductsCount,
  findProducts,
  findOneAndUpdateProduct,
};
