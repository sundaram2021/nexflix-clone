import mongoose from "mongoose";

const { Schema } = mongoose

const RegistrationSchema = new Schema({
    email: String,
    password: String,
})

export default new mongoose.model("Registration ", RegistrationSchema);