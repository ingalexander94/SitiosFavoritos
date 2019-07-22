const connection = require('../conexion');

class UsuarioDTO{

    constructor(nombreCompleto,nombreUsuario,contrasenia){
        this.nombreCompleto = nombreCompleto;
        this.nombreUsuario = nombreUsuario;
        this.contrasenia = contrasenia;
    }

    getNombreCompleto(){
        return this.nombreCompleto;
    }

    getNombreUsuario(){
        return this.nombreUsuario;
    }

    getContrasenia(){
        return this.contrasenia;
    }

}

class UsuarioDAO{

    constructor(){};

    async guardarUsuario(UsuarioDTO){
        const nuevoUsuario = {
            nombrecompleto : UsuarioDTO.getNombreCompleto(),
            nombreusuario : UsuarioDTO.getNombreUsuario(),
            contrasenia : UsuarioDTO.getContrasenia()
        }
        const resultado = await connection.query('INSERT INTO usuario SET ?',[nuevoUsuario]);
        return resultado.insertId;
    };

    async obtenerUsuario(id){
        const usuario = await connection.query('SELECT * FROM usuario WHERE id = ?',[id]);
        return usuario[0];
    }

    async validarUsuario(nombreusuario){
        const usuario = await connection.query('SELECT * FROM usuario WHERE nombreusuario = ?',[nombreusuario]);
        return usuario;
    }

}

module.exports = {
    UsuarioDTO,
    UsuarioDAO
}