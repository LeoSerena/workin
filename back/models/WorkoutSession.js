import mongoose from 'mongoose';

const workoutSessionSchema = new mongoose.Schema(
    { workoutType : { type : String, required: true } }, 
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

const WeightWorkoutSession = workoutSessionSchema.discriminator(
    'Weight',
    new mongoose.Schema({
        workoutRecords : [{
            workoutType : String,
            sets : Number,
            repetitions : Number
        }]
    })
)

const BodyWeightWorkoutSession = workoutSessionSchema.discriminator(
    'BodyWeight',
    new mongoose.Schema({
        workoutRecords : [{
            workoutType : String,
            sets : Number,
            repetitions : Number
        }]
    })
)


export const runningSession = RunningWorkoutSession;
export const weightSession = WeightWorkoutSession;
export const bodySession = BodyWeightWorkoutSession;