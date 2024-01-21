import { Schema, model } from "mongoose";
import { CONSTANTS } from "../../../configuration/config.js";
const productSchema = Schema(
  {
    name: {
      type: String,
      required: false,
    },
    category: {
      type: String,
      required: false,
    },
    images: [],
    description: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: false,
    },
    currency: {
      type: String,
      required: false,
    },
    freeShipping: {
      type: Boolean,
      required: false,
      default: true,
    },
    addToCart: {
      type: Boolean,
      required: false,
      default: false,
    },
    isActive: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "Product",
    versionKey: false,
  }
);
productSchema.set("toJSON", { virtuals: true });
productSchema.virtual("urls").get(function () {
  console.log("images", this.images);
  return this.images.map((image) => {
    if (image && image != "undefined") {
      return `${CONSTANTS.domainUrl}productImages/${image}`;
    }
  });
});

const Product = model("Product", productSchema);

export default Product;
