// 

import mongoose from "mongoose"


const connect = async() => {
    await mongoose.connect(`mongodb+srv://${process.env.PROJECT_NAME}:${process.env.PROJECT_PASSWORD}@cluster0.wc8eqjy.mongodb.net/?retryWrites=true&w=majority`)
    console.log('server is connected to the database');
}

export default connect

