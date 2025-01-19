const mongoose = require('mongoose');

const workoutSessionSchema = new mongoose.Schema(
    { workoutType : { type : string, required: true } }, 
    { timestamps : true }
)
mongoose.model('WorkoutSession', workoutSessionSchema)

const RunningWorkoutSession = workoutSessionSchema.discriminator(
    'Running',
    new mongoose.Schema({
        workoutRecords : [{
            distance : Number,
            duration : String,
            repetitions : Number
        }]
    })
)

const WeightWorkoutSession = workoutRecordSchema.discriminator(
    'Weight',
    new mongoose.Schema({
        workoutRecords : [{
            workoutType : String,
            sets : Number,
            repetitions : Number
        }]
    })
)

const BodyWeightWorkoutSession = workoutRecordSchema.discriminator(
    'Weight',
    new mongoose.Schema({
        workoutRecords : [{
            workoutType : String,
            sets : Number,
            repetitions : Number
        }]
    })
)


module.exports = {
    RunningWorkoutSession,
    WeightWorkoutSession,
    BodyWeightWorkoutSession
}