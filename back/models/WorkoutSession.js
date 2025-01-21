import mongoose from 'mongoose';

const workoutSessionSchema = new mongoose.Schema(
    { 
        workoutType : { type : String, required: true },
        user_id : String
    }, 
    { timestamps : true }
)
const WokoutSession = mongoose.model('WorkoutSession', workoutSessionSchema)

const RunningWorkoutSession = WokoutSession.discriminator(
    'Running',
    new mongoose.Schema({
        workoutRecords : [{
            distance : Number,
            duration : String,
            repetitions : Number
        }]
    })
)

const WeightWorkoutSession = WokoutSession.discriminator(
    'Weight',
    new mongoose.Schema({
        workoutRecords : [{
            workoutType : String,
            sets : Number,
            repetitions : Number
        }]
    })
)

const BodyWeightWorkoutSession = WokoutSession.discriminator(
    'BodyWeight',
    new mongoose.Schema({
        workoutRecords : [{
            workoutType : String,
            sets : Number,
            repetitions : Number
        }]
    })
)


export const workoutSession = WokoutSession
export const runningSession = RunningWorkoutSession;
export const weightSession = WeightWorkoutSession;
export const bodySession = BodyWeightWorkoutSession;