import categoryModel from '../models/categoryModel.js'


export const addCatgory = async(req, res, next) =>{
    try {
    const {name, icon, color} = req.body
    if(!name){
        return res.status(400).json({message:"catgory name provided"})
    }
    const newCatgory = new categoryModel({
        name,icon,color
    })
    const saveCatgory = await newCatgory.save()

    res.status(201).json({
        message:"catgory has been created",
        category:saveCatgory
    })
    } catch (error) {
       next(error) 
    }
}

export const deleteCategory = async(req, res, next) =>{
    try {
        const{id} = req.params
        if(!id){
           return res.status(400).json({message:"invaild categroy"})
        }
        const deletecategory = await categoryModel.findByIdAndDelete(id)
        if(!deletecategory){
            return res.status(404).json({
                message:"not found category"
            })
        }
        res.status(200).json({
            message:"category has been deleted"
        })
        
    } catch (error) {
       next(error) 
    }

}


export const allCategory = async(req,res) =>{
    const category = await categoryModel.find()
    if(!category){
        res.status(404).json({message:"not found category"})
    }
    res.status(200).json({category:category})
}

export const singleCategory = async(req, res) =>{
    const {id} = req.params
    const category = await categoryModel.findById(id)
    if(!category){
        res.status(404).json({message:"not found category"})
    }

res.status(200).json({category:category})
}


export const updateCategory = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedCategory = await categoryModel.findByIdAndUpdate(
            id,
            {
                name: req.body.name,
                icon: req.body.icon,
                color: req.body.color
            },
            { new: true } // `new: true` returns the updated document, `runValidators` ensures validation rules are applied
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.status(200).json({ category: updatedCategory });
    } catch (error) {
        next(error);
    }
};
