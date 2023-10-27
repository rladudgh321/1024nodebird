const passport = require('passport');
const { Strategy: LocalStorage } = require('passport-local');
const { User } = require('../models');
const bcrypt = require('bcrypt');

module.exports = () => {
    const message = { message: '잘못된 정보입니다' };
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
                    done(null, user);
                } else {
                    done(null, false, message);
                }
            } else {
                done(null, false, message);
            }
        } catch (err) {
            done(err);
        }
    }));
}
