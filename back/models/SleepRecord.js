import mongoose from 'mongoose';

const sleepSchema = new mongoose.Schema({
    number_of_hours : {
        type : Number,
        required : false,
        unique : false
    },
    number_of_minutes : {
        type : Number,
        required : false,
        unique : false
    },
    rating : {
        type : Number,
        required : false,
        unique : false
    },
    user_id : {
        type : String,
        required : true
    }  

}, {timestamps : true})


export default mongoose.model('Sleep', sleepSchema);