import asyncHandler from "express-async-handler";
import MESSAGES from "../../../../helpers/messages.js";
import {
  createProduct,
  findOneAndUpdateProduct,
  findOneProduct,
  findProducts,
  getAllProductList,
  getProductById,
  getProductsCount,
} from "../../../../models/sales/repository/productRepository.js";
import {
  getMatchData,
  outputData,
  removeFilesInError,
} from "../../../../helpers/utility.js";
import { CONSTANTS } from "../../../../../configuration/config.js";

export const getAll = asyncHandler(async (req, res) => {
  try {
    const {
      search = null,
      page = 1,
      pageSize = 10,
      column = "createdAt",
      direction = -1,
    } = req.query;
    let project = {
      name: 1,
      category: 1,
      description: 1,
      price: 1,
      currency: 1,
      freeShipping: 1,
      isActive: 1,
    };
    let skip = Math.max(0, +page - 1) * +pageSize;
    let match = await getMatchData(project, search);
    let pagination = [{ $skip: +skip }, { $limit: +pageSize }];

    let rows = await getAllProductList([
      { $project: project },
      { $match: match },
      { $sort: { [column]: +direction } },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: pagination,
        },
      },
    ]);
    return res.send({ ...outputData(rows) });
  } catch (e) {
    console.error(e);
    return res.sendStatus(500).send({ error: "Internal Server Error" });
  }
});

export const getAllHome = asyncHandler(async (req, res) => {
  try {
    let project = {
      name: 1,
      category: 1,
      description: 1,
      price: 1,
      currency: 1,
      freeShipping: 1,

      isActive: 1,
      images: {
        $map: {
          input: "$images",
          as: "image",
          in: { $concat: [CONSTANTS.domainUrl, "productImages/", "$$image"] },
        },
      },
    };
    let rows = await getAllProductList([
      {
        $match: {
          addToCart: false,
        },
      },
      { $project: project },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          data: [],
        },
      },
    ]);
    return res.send({ ...outputData(rows) });
  } catch (e) {
    console.error(e);
    return res.sendStatus(500).send({ error: "Internal Server Error" });
  }
});
export const create = asyncHandler(async (req, res) => {
  try {
    let exists = await findOneProduct(
      {
        name: req.body.name,
      },
      { _id: 1 }
    );
    if (exists) {
      let error = MESSAGES.apiErrorStrings.DATA_ALREADY_EXISTS("Product");
      return res.preconditionFailed(error);
    }
    let createObj = { images: [], ...req.body };
    if (req.files) {
      if (req.files.images && req.files.images.length > 0) {
        for (let i = 0; i < req.files.images.length; i++) {
          createObj["images"][i] = req.files.images[i].filename;
        }
      }
    }
    const saveObj = await createProduct(createObj);
    if (saveObj) {
      res.send({ message: MESSAGES.apiSuccessStrings.CREATE("Product") });
    }
  } catch (e) {
    console.error(e);
    if (req.files) {
      removeFilesInError(req.files.images);
    }
    return res.sendStatus(500).send({ error: "Internal Server Error" });
  }
});
export async function update(req, res) {
  try {
    let updateObj = { ...req.body };
    if (req.files) {
      if (req.files.images && req.files.images.length > 0) {
        for (let i = 0; i < req.files.images.length; i++) {
          updateObj.images = [];
          updateObj["images"][i] = req.files.images[i].filename;
        }
      }
    }
    updateObj = await findOneAndUpdateProduct(
      { _id: req.params.id },
      updateObj,
      {
        upsert: true,
        new: true,
        rawResult: true,
      }
    );
    if (!updateObj) {
      return res.preconditionFailed(errors);
    }
    res.send({
      message: MESSAGES.apiSuccessStrings.UPDATE("Product"),
    });
  } catch (e) {
    console.error(e);
    return res.sendStatus(500).send({ error: "Internal Server Error" });
  }
}
export const deleteById = asyncHandler(async (req, res) => {
  try {
    const deleteItem = await getProductById(req.params.id);
    if (deleteItem) {
      await deleteItem.remove();
      return res.send({ message: MESSAGES.apiSuccessStrings.DELETE });
    }
  } catch (e) {
    console.error(e);
    return res.sendStatus(500).send({ error: "Internal Server Error" });
  }
});
export const getById = asyncHandler(async (req, res) => {
  try {
    let existing = await getProductById({
      _id: req.params.id,
    });
    if (!existing) {
      return res.unprocessableEntity(errors);
    }
    return res.send(existing);
  } catch (e) {
    console.error(e);
    return res.sendStatus(500).send({ error: "Internal Server Error" });
  }
});
export const getAllMasterData = asyncHandler(async (req, res) => {
  try {
    return res.send();
  } catch (error) {
    console.error("getAllMasterDataForProduct", error);
    res.sendStatus(400);
    throw new Error("Invalid Model data");
  }
});
export async function getAllProducts() {
  let rows = await findProducts({
    isActive: true,
  }).sort({ createdAt: -1 });
  return rows;
}

export const getAllProductsAddToCartCount = asyncHandler(async (req, res) => {
  try {
    let counts = await getProductsCount({
      addToCart: true,
    });
    return res.send({ counts });
  } catch (error) {
    console.error("getAllProductsAddToCartCount", error);
    res.sendStatus(400);
    throw new Error("Invalid Model data");
  }
});
export const getAllProductsAddToCart = asyncHandler(async (req, res) => {
  try {
    let rows = await findProducts({
      addToCart: true,
    });
    return res.send(rows);
  } catch (error) {
    console.error("getAllProductsAddToCart", error);
    res.sendStatus(400);
    throw new Error("Invalid Model data");
  }
});
