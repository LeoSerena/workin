import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    measures : [
        { type : mongoose.Schema.Types.ObjectId, ref: 'Measures', unique: false, required: false } 
    ],
    workoutSessions : [ 
        { type : mongoose.Schema.Types.ObjectId, ref: 'WorkoutSession', unique: false, required: false } 
    ],
    sleepRecords : [
        { type : mongoose.Schema.Types.ObjectId, ref: 'SleepRecords', unique : false, required: false }
    ]
    

}, {timestamps : true})


export default mongoose.model('User', userSchema);