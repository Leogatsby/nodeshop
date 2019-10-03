const express = require('express');
const router = express.Router();
const productModel = require("../model/products");
// 프러덕트 데이터 불러오기

router.get("/",(req,res) =>{
    // res.status(200).json({
    //     msg: "product get"
    // });
    productModel
        .find()
        .then(docs => {
            console.log(docs);
            res.status(201).json({
                msg: "successful productData get",
                count: docs.length,
                // products: docs
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        // price: doc.price,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/products/"+doc._id
                        }
                    }
                })         //mapping은 커스터마이징 한다.
            })
        })  //docs = documents
        .catch(err => {
            res.status(500).json({
                error : err
            });
        });
});


// 상세 데이터 프로덕트 한개만 불러오기

router.get("/:productID",(req,res) => { // "/:productName" 응용도 당연히 가능
    // const name = req.params.productName;
    const ID = req.params.productID;
    productModel
        .find({_id:ID}) //세부적으로 아이디이나 이름값을 찾는다. // 키값은 스키마에 있는 키값
        .then(result => {
            if(result){
                // console.log(result);
                return  res.status(200).json({
                        msg: "successful product detail data get",
                        // productInfo: result
                        productInfo: {
                            name: result[0].name,
                            price: result[0].price,
                            _id: result[0]._id,
                            request: {
                                type: "GET",
                                url:"http://localhost:3000/products"
                            }
                        }

                });
            } else{
                res.status(400).json({
                    msg: "프로덕트 아이디 못찾았어요."
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});




// 프로덕트 데이터 생성하기

router.post("/", (req,res) =>{

    const product = new productModel({
        name: req.body.name,
        price: req.body.price
    });


    product
        .save()
        .then(result => {
            res.status(201).json({
                msg: 'created product',
                productInfo: {
                    _id: result._id,
                    name: result.name ,
                    price: result.price
                },
                request: {
                    type: "POST",
                    url:"http://localhost:3000/products"    // 링크를 누를시 post로 이동 어떻게 하니?
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error : err
            });
        });

    // const product = {
    //     name: req.body.name,
    //     price: req.body.price
    // };
   

    // res.status(200).json({
    //     msg: "product post",
    //     createdProduct: product
    // });

});

// 프로덕트 데이터 수정하기

router.patch("/:productID",(req,res) =>{

    const ID = req.params.productID;
    const props = req.body;
    
    productModel
        .update({_id:ID} ,props)
        // .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                msg: "updated product",
                productInfo: {
                    result: result,
                    electionId: result.electionId,
                    request: {
                        type: "GET", // 타입은 모두 겟이다. patch
                        url:"http://localhost:3000/products/"+result._id    // 링크를 누를시 patch로 이동 어떻게 하니?
                    }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

        //업데이트는 exec 실행을 해줘야 한다. => CRUD productModel이 각각 명령이 어떻게 되는지 비교하자

    // res.status(200).json({
    //     msg: "product patch"
    // });
});

// 프로덕트 데이터 삭제하기

router.delete("/:productID",(req,res) => {
    // res.status(200).json({
    //     msg: "product deleted"
    // });
    const ID = req.params.productID;

    productModel
        .remove({_id:ID}) // ()이면 전체 삭제
        .then(result => {
            if(result){
                return res.status(200).json({
                    msg: "deleted product",
                    result: result, //큰 의미가 없는 result 이다.
                    request: {
                        type: "GET",
                        url:"http://localhost:3000/proucts/"
                    }
                })
            }else{
                res.status(400).json({
                    msg: "프로덕트 아이디가 없습니다. 삭제할거 못찾음"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

});





module.exports = router;
