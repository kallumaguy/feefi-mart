import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// Function for adding product
const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      subCategory,
      sizes,
      bestSeller,
    } = req.body;
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      category,
      price: Number(price),
      subCategory,
      bestSeller: bestSeller === "true" ? true : false,
      sizes: JSON.parse(sizes),
      image: imagesUrl,
      date: Date.now(),
    };

    console.log(productData);

    const product = new productModel(productData);
    await product.save();

    // console.log(name, price, description, category, subCategory, sizes, bestSeller);
    // console.log(imagesUrl);

    res.json({ success: true, message: "Product added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// function for listing all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Reomove product
const removeProduct = async (req, res) => {
    try {

        await productModel.findByIdAndDelete(req.body.id)
        
    } catch (error) {
        console.log(error)
    }
};

// Function for single product info
const singleProduct = async (req, res) => {};

export { addProduct, listProducts, removeProduct, singleProduct };
