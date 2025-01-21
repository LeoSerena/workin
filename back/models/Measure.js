import mongoose from 'mongoose';

const measureSchema = new mongoose.Schema({
    value : {
        type : Number,
        required : true,
        unique : false
    },
    unit : {
        type : String,
        required : true,
        unique : false
    },
    type : {
        type : String,
        required : true,
        unique : false
    }

}, {timestamps : true})


export default mongoose.model('Measure', measureSchema);