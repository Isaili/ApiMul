import Products from "../models/Products";
import mongoose from "mongoose";

export const createProduct = async (req, res) => {
    try {
        const { name, description, imgUrl, price, typeProduct, amount, content } = req.body;
        const newProduct = new Products({ name, description, imgUrl, price, typeProduct, amount, content })
        const ProductSave = await newProduct.save();
        return res.status(201).json(ProductSave);

    } catch (error) {
        return res.status(500).json({ message: "Error the save product" }, error);
    }

}

export const getProducts = async (req, res) => {
    try {
        const ProductsSaved = await Products.find()
        return res.status(200).json(ProductsSaved);
        
    } catch (error) {
        return res.status(500).json({ message: "Error server" });
    }

}



export const getProductById = async (req, res) => {
    try {
        const isValidObjectId = mongoose.Types.ObjectId.isValid;
        if (!isValidObjectId(req.params.productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const product = await Products.findById(req.params.productId);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        return res.status(200).json(product);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProducById = async (req, res) => {
    try {

        const isValidObjectId = mongoose.Types.ObjectId.isValid;

        if (!isValidObjectId(req.params.productId)) {
            return res.status(400).json({ message: "Invalid product ID" });
        }

        const updateProduct = await Products.findByIdAndUpdate(req.params.productId, req.body, {
            new: true
        })

       return res.status(200).json(updateProduct);

    } catch (error) {
        return res.status(500).json({ message: "Error server" });
    }
}

export const deleteProductsById = async (req, res) => {
   try {

    const isValidObjectId = mongoose.Types.ObjectId.isValid;
    
    if (!isValidObjectId(req.params.productId)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    await Products.findByIdAndDelete(productId);
    return res.status(204).json({message: "Product deleted"})

   } catch (error) {
    return res.status(500).json({ message: "Error server" });
   }
}

