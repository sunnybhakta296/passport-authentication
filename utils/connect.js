const mongoose = require('mongoose');


const connect = async()=>{
    const dbUri="mongodb+srv://test:test@cluster0.6ku5emq.mongodb.net/?retryWrites=true&w=majority"
    try {
        await mongoose.connect(dbUri)
        console.log('Connected to db')
    } catch(err) {
        console.log("could not connect to db", err)
        process.exit(1)
    }
}
module.exports = connect