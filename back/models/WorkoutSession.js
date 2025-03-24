import mongoose from 'mongoose';

const sessionSchema = new mongoose.Schema(
    { 
        sessionType : { type : String, required: true },
        sessionName : { type : String, required: false },
        user_id : String
    }, 
    { timestamps : true }
)
const WokoutSession = mongoose.model('WorkoutSession', sessionSchema)

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