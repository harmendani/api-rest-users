const mongoose = require('mongoose');
const config = require('../config/index').dataBase;

// Connect MongoDB 
module.exports.connect = async () => {
    
    try {
        await mongoose.connect(`mongodb://localhost:27017/${config}`, { useNewUrlParser: true });        
    } catch (error) {
        console.log('DB Connection Error: ' + error);
        throw new Error(error);
    }
};