const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    email:{
        type: String,       //이메일인지 아닌지 체크해줘야함
        required: true,     //한줄로 쭉 가면 헷갈린다.
        unique :true,    // 이메일 중복확인
        match : /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password:{
        type: String,
        required: true
    }
});

// 
module.exports = mongoose.model("users", userSchema);