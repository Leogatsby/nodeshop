const express = require("express");
const router = express.Router();
const userModel = require("../model/users");
const bcrypt = require("bcryptjs");

// 회원가입 => 회원 정보 등록 던져줘야 하니깐 포스트다.
router.post("/register" ,(req,res) => {

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
                 res.status(500).json({
                     error : err
                 });
             });
        }
    });


 
});

// 로그인  => 이메일과 패스워드를 던져줘야 하니깐 포스트다.
router.post("/login", (req,res) => {
    
});

module.exports = router;