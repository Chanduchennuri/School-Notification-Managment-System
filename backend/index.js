require("dotenv").config();

const express = require('express')
const session = require('express-session');
const mongoose = require('mongoose')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');

const app = express();

//testing models
const stud = require('./models/student')
const clas = require('./models/clas')
const teacher = require('./models/teacher')

// Middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configure session
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));


//cors
app.use(cors({ origin: true, credentials: true }));

//oauth code
// Configure Passport with Google OAuth credentials
passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },
        (accessToken, refreshToken, profile, done) => {
            // Handle user authentication logic here
            // The 'profile' parameter contains user information
            // Call 'done' with user data to complete the authentication process
            // console.log(profile)
            done(null, profile);
        })
);


// Serialize and deserialize user data
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    // console.log(user)
    done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());



//Routes
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: process.env.frontend_url }),
    (req, res) => {
        // Redirect to the frontend after successful authentication
        
        
        if(req.user._json.email==process.env.adminMail1 || req.user._json.email==process.env.adminMail2)
        {
            //admin login
            req.session.role = 'admin'
        }

        console.log(req.session.role)

        res.redirect(process.env.frontend_url);
    }
);

app.get('/auth/user', (req, res) => {
    // console.log(req.user)
    res.json(req.user);
});


app.get('/auth/logout', (req, res) => {
    req.logout((err) => { console.log(err) });
    res.json({ logout: "true" });
});


const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
