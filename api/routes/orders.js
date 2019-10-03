const express = require("express");
const router = express.Router();
const orderModel = require("../model/orders");
const productModel = require("../model/products");

// order 데이터 불러오기

router.get("/", (req, res) => {
    orderModel
        .find()
        .exec()
        .then(docs => {
            // console.log(docs);
            res.status(201).json({
                msg : "상품 주문 리스트입니다.",
                count : "주문수는 "+ docs.length+"입니다.",
                // orders1 : docs,
                orders2 : docs.map(doc => {
                    return { 
                        _id : doc._id,
                        product : doc.productID,
                        quantity: doc.quantity,
                        // 모델과 있는 키값과 같지 않으면 보여지지 않는다. 못찾는다.
                        // 리턴 잊지말자
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/orders/"+doc._id
                        }
                    }
                }),
               
            });
        })
        .catch(err => {
            res.status(500).json({
                error : err
            });
        })
});

//order 데이터 상세 불러오기

router.get("/:orderID", (req,res) => {

    const ID = req.params.orderID;
    orderModel
        .findById(ID)   // 배열로 안나옴
        // .find({_id:ID}) //배열로 나옴
        .then(result => {
            if(result){
                return res.status(200).json({
                    msg: result._id+"해당 주문에 대한 상세 정보입니다.",
                    // orderInfo: {
                    //     _id: result._id,
                    //     productID: result.product,
                    //     quantity: result.quantity
                    // },
                    order : result ,
                    request: {
                        type: "GET",
                        url:"http://localhost:3000/orders"
                    }
                })
            }else{

            }
        })
        .catch(err => {
            res.status(500).json({
                error : err
            });
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

router.delete("/:orderID", (req, res) => {
    // const ID = req.params.orderID;
    orderModel
        // .remove({_id:ID}) , 그냥 바로 req.params.order 하는게 나음
        .remove({_id:req.params.orderID})
        .then(result => {
            if(result){
                return res.status(200).json({
                    msg: "상품주문 삭제됨",
                    result: result, // 없어도 됨
                    request:{
                        type: "GET",
                        url:"http://localhost:3000/orders"
                    }
                });
            }else{
                res.status(400).json({
                    msg: "상품주문 아이디가 없습니다. 삭제 할거 없습니다."
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error : err
            })
        })
});

module.exports = router;