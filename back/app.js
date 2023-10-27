const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
dotenv.config();

app.set('port', process.env.NODE_ENV || 3065);

app.get('/', (req,res,next) => {
    res.send('hihihi');
})

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 대기중');
});