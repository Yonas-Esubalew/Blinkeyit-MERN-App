import CategoryModel from "../models/category.model.js"

export async function AddCategoryController(req, res) {
    try {
        const {name, image} = req.body
        if(!name || !image){
            return res.status(400).json({
                message: "Enter required field",
                error: true,
                success : false
            })
        }

        const addCategory = new CategoryModel({
            name,
            image
        })

        const saveCategory = await addCategory.save()
        if(!saveCategory){
            return res.status(500).json({
                message: "Category not created",
                error: true,
                success: false
            })
        }

        return res.json({
            message: "Added Category",
            data: saveCategory,
            error: false,
            success: true
        });
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        });
    }
}