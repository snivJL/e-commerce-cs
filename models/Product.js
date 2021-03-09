const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    images: [{ imageUrl: { type: String, required: true } }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);
productSchema.plugin(require("./plugins/isDeletedFalse"));

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
