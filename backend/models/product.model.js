import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
}, {
  timestamps: true, // add createdAt and updatedAt fields
});

const Product = mongoose.model("Product", productSchema);
// mongoose creates a collection called "products"


export default Product;