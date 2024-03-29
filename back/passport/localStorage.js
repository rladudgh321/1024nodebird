const passport = require('passport');
const { Strategy: LocalStorage } = require('passport-local');
const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = () => {
    passport.use('local', new LocalStorage({
        usernameField:'id',
        passwordField:'pwd',
        passReqToCallback:false,
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({
                where : { email }
            });
            if(user) {
                const result = await bcrypt.compare(password, user.password);
                if(result) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: '비밀번호 오류' });
                }
            } else {
                return done(null, false, { message: '이메일 오류' });
            }
        } catch (err) {
            console.error(err);
            return done(err);
        }
    }));
}
