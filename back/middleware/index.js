exports.isLoggedIn = (req,res,next) => {
    if(req.isAuthenticated()) {
        next();
    } else {
        return res.status(401).send('로그인해야 할 수 있는 서비스 입니다');
    }
}

exports.isNotLoggedIn = (req,res,next) => {
    if(!req.isAuthenticated()) {
        next();
    } else {
        return res.status(401).send('이미 로그인이 되어 있습니다');
    }
}