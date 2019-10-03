const express = require("express");
const router = express.Router();
const orderModel = require("../model/orders");
const productModel = require("../model/products");

// order 데이터 불러오기

router.get("/", (req, res) => {
    res.status(200).json({
        msg: "order get"
    });
});

// order 데이터 생성하기

router.post("/", (req,res) => {
    productModel
        .findById(req.body.productID) //아이디가 있는지 없는지를 , 제품이 있는지 없는지를 먼저 찾아야한다.
        .then(product => {
            if(!product){
                return res.status(404).json({
                    msg : "제품 없어 !!!"
                });
            }else{
                const order = new orderModel({
                    product : req.body.productID,
                    quantity : req.body.quantity
                });
                return order.save();
            }
        })             //
        .then(result => {
            res.status(200).json({
                msg : "오더가 저장되었습니다.",
                createdOrder1 : result,
                createdOrder2 : {
                    product : result.product,
                    quantity : result.quantity,
                    _id : result._id
                },
                request : {
                    type : "GET",
                    url: "http://localhost:3000/orders/"+result._id
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error : err
            });
        });
});
// order 데이터 수정하기
router.patch("/",(req,res) => {
    res.status(200).json({
        msg: "order patch"
    });
});

// order 데이터 삭제하기 

router.delete("/", (req, res) => {
    res.status(200).json({
        msg: "order delete"
    });
});

module.exports = router;