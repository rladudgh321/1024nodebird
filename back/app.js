const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const { sequelize } = require('./models');
const cors = require('cors');
const app = express();
dotenv.config();

app.set('port', process.env.NODE_ENV || 3065);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
    origin:true,
    credentials:true,
}))

app.use((cookieParser(process.env.COOKIE_SECRETE)));
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:process.env.COOKIE_SECRETE,
    cookie:{
        secure:false,
        httpOnly:true,
    },
}));

sequelize.sync({ force: false })
    .then(()=>{
        console.log('DB연결 성공');
    })
    .catch((err)=>{
        console.error(err);
    });

const passport = require('passport');
const passportConfig = require('./passport');
app.use(passport.initialize());
app.use(passport.session());
passportConfig();

const userRouter = require('./routes/user');
app.use('/user', userRouter);

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 서버 대기중');
});