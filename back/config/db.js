import mongoose from 'mongoose';

export function connectDB(){
    const username = encodeURIComponent(process.env.MONGODB_USR); 
    const password = encodeURIComponent(process.env.MONGODB_PWD); 
    const host = process.env.MONGODB_HOST || 'localhost'; 
    const port = process.env.MONGODB_PORT || '27017'; 

    const uri = `mongodb://${username}:${password}@${host}:${port}`;
    console.log(uri)
    mongoose.connect(
        uri, {}
    ).then(
        () => console.log("Mongo DB connection successful")
    ).catch((err) => {
        console.error("There was an error while trying to connect to the DB", err.message);
        process.exit(1);
    });
};

