const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {UsuarioDTO,UsuarioDAO} = require('../models/Usuario');
const helpers = require('./helpers');

passport.use('local.signin',new LocalStrategy({
    usernameField: 'nombreusuario',
    passwordField: 'contrasenia',
    passReqToCallback: true
},async (req,username,password,done)=>{
    const dao = obtenerDao();
    const validarUsuario = await dao.validarUsuario(username);
    if(validarUsuario.length>0){
        const usuario = validarUsuario[0];
        const validacion = await helpers.verificarContrasenia(password,usuario.contrasenia);
        if(validacion){
            done(null,usuario,req.flash("mensaje","Bienvenido "+usuario.nombrecompleto));
        }else{
            done(null,false,req.flash("error","La contraseña es incorrecta"));
        }
    }else{
        done(null,false,req.flash("error","No existe el usuario"));
    }
}));

passport.use('local.signup',new LocalStrategy({
    usernameField:'nombreusuario',
    passwordField:'contrasenia',
    passReqToCallback: true
},async(req,username,password,done)=>{
    const {nombrecompleto} = req.body;
    password = await helpers.encriptarContrasenia(password);
    const nuevoUsuario = new UsuarioDTO(nombrecompleto,username,password);
    const dao = obtenerDao();
    const idRegistrado = await dao.guardarUsuario(nuevoUsuario);
    const usuario = {
        id : idRegistrado,
        nombrecompleto,
        nombreusuario : username,
        contrasenia : password
    }
    done(null,usuario);
}));

passport.serializeUser((usuario,done)=>{
    done(null,usuario.id);
});

passport.deserializeUser(async (id,done)=>{
    const dao = obtenerDao();
    const usuario = await dao.obtenerUsuario(id);
    done(null,usuario);
});


function obtenerDao(){
    const dao = new UsuarioDAO();
    return dao;
}