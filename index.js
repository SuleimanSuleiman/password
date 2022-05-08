const express = require('express')
const app = express()
const {port} = require('./config')
const sessions = require('express-session')
const cookieParser = require('cookie-parser')
const { urlencoded } = require('body-parser')

app.set('view engine' , 'pug')
app.use(express.static('./views'))
app.use(express.static('./public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

const oneDay = 1000 * 60 * 60 * 24;

app.use(sessions({
    resave: false,
    saveUninitialized: true,
    secret: 'hellomrsuleimanfuckingyoubaby',
    cookie: {maxAge: oneDay}
}))


//username and password
const myusername = 'user1'
const mypassword = 'mypassword'

// a variable to save a session
var session;

app.get('/' , (req,res) =>{
    session = req.session
    if(session.userid){
        res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }else
    res.sendFile('views/index.html',{root:__dirname})
})

app.post('/user' , (req,res) =>{
    if(req.body.username === myusername && req.body.password === mypassword){
        session = req.session
        session.userid = req.body.username
        console.log(req.session)
        res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`);
    }
    else{
        res.send('Invalid username or password');
    }
})

app.get('/logout',(req,res) =>{
    req.session.destroy()
    res.redirect('/');
})

app.listen(port,() => console.log('running'))