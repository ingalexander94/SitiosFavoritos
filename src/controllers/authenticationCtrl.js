const express = require('express');
const router = express.Router();
const passport = require('passport');
const helpers = require('../lib/helpers');

router.get('/entrar',helpers.NoEstaLogueado,(req,res)=>{
    res.render('components/entrar');
})

router.get('/registrarse',helpers.NoEstaLogueado,(req,res)=>{
    res.render('components/registrarse');
});

router.post('/registrarse',passport.authenticate('local.signup',{
    successRedirect:'/perfil',
    failureRedirect:'/registrarse',
    failureFlash:true
}));

router.post('/entrar',(req,res,next)=>{
    passport.authenticate('local.signin',{
        successRedirect: '/perfil',
        failureRedirect:'/entrar',
        failureFlash:true
    })(req,res,next);
});

router.get('/salir',helpers.estaLogueado,(req,res)=>{
    req.logOut();
    res.redirect('/entrar');
});

router.get('/perfil',helpers.estaLogueado,(req,res)=>{
    res.render('components/perfil');
});

module.exports = router;