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

//testing models for syntax errors
const stud = require('./models/student')
const clas = require('./models/clas')
const teacher = require('./models/teacher')
const feed = require('./models/feed')

//testing novu
const novu = require('./controllers/novu')

// Middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configure session
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
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

app.get('/auth/success',async(req,res)=>{
    try {
        res.json(req.session);
    } catch (e) {
        console.log(e);
    }
})

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: process.env.CLIENT_URL}),
    async (req, res) => {
        let flag = 0
        let role = ""
        //admin login
        if(req.user._json.email==process.env.adminMail1 || req.user._json.email==process.env.adminMail2)
        {
            role = 'admin'
            flag = 1
        }
        else{
            //teacher login

            const {createTeacher , findByEmailT} = require('./controllers/teacher')
            data = await findByEmailT(req.user._json.email)
            if(data && req.user._json.email===data.email){
                role = 'teacher'
                flag = 1

            }
            //parent and student login
            if(flag === 0){
                const {findByEmailS} = require('./controllers/student')
                data1 = await findByEmailS(req.user._json.email)
                if(data1 && req.user._json.email===data1.email){
                    role = 'student'
                    flag = 1
                    req.session.clas = data1.class
                }
            }
            if(flag === 0){
                const {findByEmailP} = require('./controllers/student')
                data2 = await findByEmailP(req.user._json.email)
                if(data2 && req.user._json.email===data2.parentEmail){
                    role = 'parent'
                    flag = 1
                    req.session.clas = data1.class
                }
            }
            
        }
        if(flag===0){
            console.log("user not login")
            req.logout((err) => { console.log(err) });
        }
        else{
            req.session.role = role
            req.session.email = req.user._json.email
        }
        if(role === 'admin'){
            res.redirect(process.env.frontend_url_admin);
        }else if(role === 'student' || role === 'parent'){
            res.redirect(process.env.frontend_url);
        }
        // Redirect to the frontend after successful authentication
        
    }
);

app.get('/auth/user', (req, res) => {
    // console.log(req.user)
    res.json(req.user);
});


app.get('/logout', (req, res) => {
    req.logout((err) => { console.log(err) });
    res.json({ logout: "true" });
});


//Other Routes
const userRouter = require('./routes/user.js')
app.use('/user',userRouter)

const adminRouter = require('./routes/admin.js')
app.use('/admin',adminRouter)

const teacherRouter = require('./routes/teacher.js')
app.use('/teacher',teacherRouter)

const studentRouter = require('./routes/student')
app.use('/student' , studentRouter)

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
