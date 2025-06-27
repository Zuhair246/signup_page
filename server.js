const { log } = require('console');
const express = require('express');
const app = express();
const hbs=require('hbs');
const nocache=require('nocache')
const session=require('express-session');

app.use(express.static('public'));
app.set('view engine' , 'hbs');
app.use(express.urlencoded({extended: true}))
app.use(express.json())

const username="Zuhair"
const password="Zuhair123"


app.use(session({
    secret:'keyboard cat',
    resave:false,
    saveUninitialized:true,
}))

app.use(nocache())

app.get('/' , (req,res)=>{
    if(req.session.user){
        res.render('home')
    }else{
          if(req.session.passwordwrong){
             res.render('login' , {msg:"Invalid Credentials"})
             req.session.passwordwrong=false;
        }else{
            res.render('login')
        }
    }
})

app.post('/verify', (req,res) => {
    console.log(req.body);
    
   if(req.body.username === username && req.body.password === password){
   req.session.user = req.body.username
    res.redirect('/home')
   }else{
        req.session.passwordwrong=true;
        res.redirect('/')
   }
})

app.get('/home', (req,res)=>{
    if(req.session.user){
        res.render('home')
    }else{
        if(req.session.passwordwrong){
            req.session.passwordwrong=false;
             res.render('login' , {msg:"Invalid Credentials"})
        }else{
            res.render('login')
        }
       
    }
})


app.get('/logout',(req,res)=>{
    req.session.destroy()
    res.render('login',{msg:"Logged Out Successfully"})
})

app.listen(3003, ()=> console.log('Server running on port 3003'));