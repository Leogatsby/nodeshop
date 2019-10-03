const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    // name: String,
    // price: String
    name: {
        type: String , 
        required: true
    },
    price: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("products",productSchema);






// 스키마 만들기 2.이 스키마를 접근 모델러 만들기

