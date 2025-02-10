import mongoose from "mongoose";

const subCactegorySchema = new mongoose.Schema({
    name : {
        type: String,
        default : ""
    },
    image : {
        type: String,
        default: ""
    },
    categoryId: [
        {
            type: mongoose.Schema.ObjectId,
            ref : "category"
        }
    ]
},{
    timestamps : true

})

const SubCategoryModel = mongoose.model("subCategory", subCactegorySchema)

export default SubCategoryModel