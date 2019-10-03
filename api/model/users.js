const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email:{
        type: String,
        required: true       //한줄로 쭉 가면 헷갈린다.
    },
    password:{
        type: String,
        required: true
    }
});

// 
module.exports = mongoose.model("users", userSchema);