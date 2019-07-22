const connection = require('../conexion');

class LinkDTO {

    constructor(titulo, url, descripcion,usuario) {
        this.titulo = titulo;
        this.url = url;
        this.descripcion = descripcion;
        this.usuario = usuario;
    }

    getTitulo(){
        return this.titulo;
    }

    getUrl(){
        return this.url;
    }

    getDescripcion(){
        return this.descripcion;
    }
    
    getUsuario(){
        return this.usuario;
    }

};

class LinkDA0 {

    constructor(){};

    async guardarLink(LinkDTO){
        const newLink = {
            titulo : LinkDTO.getTitulo(),
            url : LinkDTO.getUrl(),
            descripcion : LinkDTO.getDescripcion(),
            usuario : LinkDTO.getUsuario()
        }
       await connection.query('INSERT INTO link SET ?',[newLink]);
    }

    async obtenerLinks(idUsuario){
    const listado = await connection.query('SELECT * FROM link WHERE usuario = ?',[idUsuario]);
    return listado;
    }

    async eliminarLink(id){
        await connection.query('DELETE FROM link WHERE id = ?',[id]);
    }

    async obtenerLink(id){
        const link = await connection.query('SELECT * FROM link WHERE id = ?',[id]);
        return link;
    }

    async actualizarLink(nuevosDatos,id){
        await connection.query('UPDATE link SET ? WHERE id = ?',[nuevosDatos,id]);
    }
}

module.exports = {
    LinkDTO,
    LinkDA0
}
