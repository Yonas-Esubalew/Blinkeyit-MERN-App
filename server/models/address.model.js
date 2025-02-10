import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
    address_line: {
        type: String,
        default: ""
    },
    city:{
        type: String,
        default: ""
    },
    state: {
        type: String,
        default: ""
    },
    pincode: {
        type: String,
        default: ""
    },
    conutry: {
        type: String,
        default: ""
    },
    mobile: {
        type: Number,
        default: 0
    },
    status: {
        type: Boolean,
        default: null
    }
},{
    timestamps : true
})

const AddressModel = mongoose.model("address", addressSchema)

export default AddressModel