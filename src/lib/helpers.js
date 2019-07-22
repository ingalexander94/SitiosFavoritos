const {format} = require('timeago.js');
const bcryptjs = require('bcryptjs');
const helpers = {};

helpers.timeago = (timestamp)=>{
    return format(timestamp);
};

helpers.encriptarContrasenia = async (constrasenia)=>{
    const patron = await bcryptjs.genSalt(10);
    const encriptada = await bcryptjs.hash(constrasenia,patron);
    return encriptada;
};

helpers.verificarContrasenia = async (constrasenia,contraseniaguardada)=>{
    try {
        const validacion = await bcryptjs.compare(constrasenia,contraseniaguardada);
        return validacion;
    } catch (error) {
        console.log(error);
    }
}

helpers.estaLogueado = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/entrar');
}

helpers.NoEstaLogueado = (req,res,next)=>{
    if(req.isAuthenticated()){
        return res.redirect('/perfil');
    }
    return next();
}

module.exports = helpers;