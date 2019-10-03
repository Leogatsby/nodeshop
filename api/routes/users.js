const express = require("express");
const router = express.Router();


// 회원가입 => 회원 정보 등록 던져줘야 하니깐 포스트다.
router.post("/register" ,(req,res) => {
    
});

// 로그인  => 이메일과 패스워드를 던져줘야 하니깐 포스트다.
router.post("/login", (req,res) => {
    
});

module.exports = router;