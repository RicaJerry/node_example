var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy; // Export strategy to use in app
var User = require('./models/user');
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