import { User as Model } from "../index.js";

async function createUser(user) {
  return Model.create(user);
}

async function getAllUserList(pipeline) {
  let rows = await Model.aggregate(pipeline);
  return rows;
}
async function getUserById(userId, options = {}) {
  return Model.findById(userId, options);
}
async function getUserByConditions(conditions, options) {
  return await Model.findOne(conditions, options);
}
async function getUsersByConditions(conditions, options) {
  return await Model.findOne(conditions, options);
}
async function updateUser(existing, updateBody) {
  Object.assign(existing, updateBody);
  return existing.save();
}
async function deleteUser(deleteItem) {
  return await deleteItem.remove();
}
async function findOneUser(match, project = {}) {
  return await Model.findOne(match, project);
}
async function findOneAndUpdateUser(match, update, options = {}) {
  return await Model.findOneAndUpdate(match, update, options);
}

export {
  createUser,
  getAllUserList,
  getUserById,
  getUserByConditions,
  getUsersByConditions,
  updateUser,
  deleteUser,
  findOneUser,
  findOneAndUpdateUser,
};
