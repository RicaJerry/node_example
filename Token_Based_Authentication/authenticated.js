var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy; // Export strategy to use in app
var User = require('./models/user');

/**
 * JSON web token strategy - only on JWT 
 */
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config');

/**
 * .authenticate() is  Function supported by passport-local-mongoose
 *  */ 
exports.local = passport.use(new LocalStrategy(User.authenticate()));
/**
 * Serialize and deserialize to use
 * 
 * All provided by passport-local-mongoose
 *  */ 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/**
 * 
 * @param {*} user 
 * create token params for user 
 * 
 */
exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, {expiresIn: 360000});
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts, 
    function(jwt_payload, done)  {
        console.log("JWT payload", jwt_payload);

        User.findOne({_id: jwt_payload._id}, (err, user) => {
        console.log("LL: user", user)
            if(err){
                return done(err, false);
            }
            else if(user){
                console.log("LL: user", user.username)
                return done(null, user);
            }
            else{
                return done(null, false);
            }
        });
    })
);
/**
 * Token will be include in header
 */
exports.verifyUser = passport.authenticate('jwt', { session: false })
