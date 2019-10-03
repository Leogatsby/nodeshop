const express = require("express"); //상수는 데이터에 값이 못들어간다. 플러스가 된다거나 마이너스가 된다거나 변하지 못함 , 압축화 시킴
const app = express();  // 여러함수중에 함수들을 통화해서  , 상수로 대체한다.
const http = require("http");   //익스플레스 안에 같이 포함되어 있음
const morgan = require("morgan");
const productsRoutes = require("./api/routes/products");
const ordersRoutes = require("./api/routes/orders");
const usersRoutes = require("./api/routes/users");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
// app.use((req,res) => {
//     res.status(200).json({
//         message: "It works"
//     });
// });

// app.use(morgan("dev"));  // dev도 있고, combined => 이렇게 나온다 : PATCH /order 200 28.640 ms - 21         200~300 네트워크 성공 , 400~500 인터넷 실패
app.use(bodyParser.json()); app.use(bodyParser.urlencoded({ extended: false})); // 바디파서 세트다

app.use("/products", productsRoutes);
app.use("/orders", ordersRoutes);
app.use("/users", usersRoutes);

// 몽고 커넥티드 
const db = "mongodb+srv://baek:tkfkdgody1!@cluster0-drx3a.mongodb.net/test?retryWrites=true&w=majority";
// const db = "mongodb://teddykwak:k9915402@ds141294.mlab.com:41294/node-rest-shop"
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex: true })
    .then( () => console.log("몽고디비 연결됨..."))                                         //정상적으로 처리되면 then
    .catch(err => console.log(err));                                       //err를 잡아줄때 접속오류, 네트워크 오류



const PORT = 3000;  // 포트는 항구
const server = http.createServer(app);

server.listen(PORT, console.log("server started"));