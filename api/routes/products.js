const express = require('express');
const router = express.Router();

// 프러덕트 데이터 불러오기

router.get("/",(req,res) =>{
    res.status(200).json({
        msg: "product get"
    });
});

// 프로덕트 데이터 생성하기

router.post("/",(req,res) =>{

    const product = {
        name: req.body.name,
        price: req.body.price
    };
   

    res.status(200).json({
        msg: "product post",
        createdProduct: product
    });

});

// 프로덕트 데이터 수정하기

router.patch("/",(req,res) =>{
    res.status(200).json({
        msg: "product patch"
    });
});

// 프로덕트 데이터 삭제하기

router.delete("/",(req,res) => {
    res.status(200).json({
        msg: "product deleted"
    });
});



module.exports = router;
