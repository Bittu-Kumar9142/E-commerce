import categoryModel from '../models/categoryModel.js'
import productModel from '../models/productModel.js'

 export const addProduct = async(req,res, next) =>{
   try {
    const category = await categoryModel.findById(req.body.category)
    if(!category){
        res.status(404).json({
            message:"not found categroy",
            success:false
        })
    }
    const {name, description,richDescription,image,brand,price,
        countInStock,rating,numReviews,isFeatued
    } = req.body

    const newproduct = new productModel({
     name,
     description,
     richDescription,
     image,
     brand,
     price,
     category : category,       
     countInStock,   
     rating,     
     numReviews,   
     isFeatued
        
    })
    const saveProduct = await newproduct.save()
    res.status(201).json({
        message:"product has been created",
        success:true,
        product:saveProduct
    })

} catch (error) {
    next(error)
   }
}

export const allProduct = async(req,res,next) =>{
    try {
        const product = await productModel.find()
        if(!product){
            res.status(404).json({
            
                messsage:"not found product",
              
            })
        }
        res.status(200).json({product:product}).populate('category')
    } catch (error) {
        next(error)
    }
}

export const singleProduct = async(req,res,next) =>{
    try {
        const{id} = req.params
        const product = await productModel.findById(id).populate('category')
        if(!product){
            res.status(404).json({messsage:"not found product"})
        }
        res.status(200).json({product:product})
    } catch (error) {
        next(error)
    }
}

export const deleteProduct = async(req,res,next) =>{
    try {
        const{id} = req.params
        const product = await productModel.findByIdAndDelete(id)
        if(!product){
            res.status(404).json({
            
                messsage:"not found product",
              
            })
        }
        res.status(200).json({
            message:"product delete successfully deleted",
            product:product})
    } catch (error) {
        next(error)
    }
}

export const updateProduct = async(req,res,next) =>{
    try {
        const{
     name,
     description,
     richDescription,
     image,
     brand,
     price,       
     countInStock,   
     rating,     
     numReviews,   
     isFeatued
        } = req.body
        const{id} = req.params
        const product = await productModel.findByIdAndUpdate(id,
            {
                name,
                description,
                richDescription,
                image,
                brand,
                price,       
                countInStock,   
                rating,     
                numReviews,   
                isFeatued   
            },
            {new:true})
        if(!product){
            res.status(404).json({messsage:"not found product",})
        }
        res.status(200).json({product:product})
    } catch (error) {
        next(error)
    }
}



