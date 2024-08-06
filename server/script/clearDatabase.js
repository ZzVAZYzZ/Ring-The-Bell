const mongoose = require('mongoose');
const resultModel = require('../resultModel');
const connectDb = require('../dbConnect');
const dotenv = require("dotenv").config();

const clearDataExceptLast = async () => {
    try{
        await connectDb()
        const lastDocument = await resultModel.findOne().sort({ _id: -1 }).exec();
        if(lastDocument){
            await resultModel.deleteMany({ _id: { $ne: lastDocument._id } });
            console.log('Cleared all data except the last document successfully');
        }else{
            console.log('No documents found in the collection');
        }
    }
    catch(error){
        console.error('Error clearing data:', error);
        process.exit(1);
    }
    finally {
        
        await mongoose.disconnect();
    }
}

clearDataExceptLast();