const express = require("express");
const router = express.Router();

// order 데이터 불러오기

router.get("/", (req, res) => {
    res.status(200).json({
        msg: "order get"
    });
});

// order 데이터 생성하기

router.post("/", (req,res) => {
    res.status(200).json({
        msg: "order post"
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