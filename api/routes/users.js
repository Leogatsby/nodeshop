const express = require("express");
const router = express.Router();
const userModel = require("../model/users");
const bcrypt = require("bcryptjs");

//전체회원 보기
router.get("/all", (req,res) => {
    userModel
        .find()
        .then(users => {
            // console.log(users);
            res.status(201).json({
                msg : "우리 고객님들의 소중한 정보입니다.",
                count : "우리 회사 회원님수: "+users.length,
                users: users,
                request:{
                    생략 : "집에가서"
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
})



// 회원가입 => 회원 정보 등록 던져줘야 하니깐 포스트다.
router.post("/register" ,(req,res) => {

    // 기존에 사용자가 있는지 없는지 체크해야한다.
    userModel
        .find({email:req.body.email})
        .then(user => {
            if(user.length == 1){   //user로 하면 find가 배열데이터라서 ㄴㄴ함
                console.log(user);
                return res.status(400).json({
                    msg: "이미 이메일 가입하심,"
                });
            }else{
                console.log(user);
                bcrypt.hash(req.body.password, 10, (err,hash) => {
                    if(err){
                        return res.status(500).json({
                            error: err
                        });
                    }else{
                        const user = new userModel({
                            email : req.body.email,
                            password : hash     //req.body.password가 암호화 되었으니 hash로 친다.
                        });
                    
                        user
                         .save()
                         .then(result => {
                             res.status(200).json({
                                 msg : "user created, 회원가입 되셨습니다.",
                                 userInfo: result
                             });
                         })
                         .catch(err => {
                            console.log(user);
                             res.status(500).json({
                                 error : err
                             });
                         });
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });

    
});

// 로그인  => 이메일과 패스워드를 던져줘야 하니깐 포스트다.
router.post("/login", (req,res) => {
    
});

module.exports = router;