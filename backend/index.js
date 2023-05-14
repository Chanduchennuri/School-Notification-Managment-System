require("dotenv").config();

const express = require('express')
const session = require('express-session');
const mongoose = require('mongoose')
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cors = require('cors');

//mongoose db connection.
const {connectToMongoose} = require('./db')
connectToMongoose()
.then(() => {
    console.log('Mongodb connected success')
})

const app = express();

//testing models
const stud = require('./models/student')
const clas = require('./models/clas')
const teacher = require('./models/teacher')

//create a teacher
// const {createTeacher} = require('./controllers/teacher.js')
// createTeacher().then(console.log('techer created'))

//create student
// const {createStudent} = require('./controllers/student')
// createStudent().then(console.log('student created'))

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
    async (req, res) => {
        let flag = 0
        //admin login
        if(req.user._json.email==process.env.adminMail1 || req.user._json.email==process.env.adminMail2)
        {
            req.session.role = 'admin'
            flag = 1
        }
        else{
            //teacher login
            
            const {createTeacher , findByEmailT} = require('./controllers/teacher')
            data = await findByEmailT(req.user._json.email)
            if(data && req.user._json.email===data.email){
                req.session.role = 'teacher'
                flag = 1
            }
            //parent and student login
            if(flag === 0){
                const {findByEmailS} = require('./controllers/student')
                data1 = await findByEmailS(req.user._json.email)
                if(data1 && req.user._json.email===data1.email){
                    req.session.role = 'student'
                    flag = 1
                }
            }
            if(flag === 0){
                const {findByEmailP} = require('./controllers/student')
                data2 = await findByEmailP(req.user._json.email)
                if(data2 && req.user._json.email===data2.parentEmail){
                    req.session.role = 'parent'
                    flag = 1
                }
            }
            
        }
        if(flag===0){
            console.log("user not login")
            req.logout((err) => { console.log(err) });
        }
        console.log(req.session.role)

        // Redirect to the frontend after successful authentication
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
