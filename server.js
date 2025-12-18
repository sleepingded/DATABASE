const express = require('express');
const app = express();

app.get("/", (req, res)=> {
    res.send("Hello"); //метод get получает параметры: 1) url, 2) функцию collback с параметрами запрос и ответ
});


app.use(express.json());

require("dotenv").config(); // библиотека dotenv загружает переменные среды из файла .env

const port = process.env.port;

app.listen(port, () => console.log(`Сервер запущен! ${port}`));