const express = require('express');
const {LinkDTO,LinkDA0} = require('../models/Link');
const router = express.Router();
const helpers = require('../lib/helpers');

router.get('/crear',helpers.estaLogueado,(req,res)=>{
    res.render('components/crearlink');
});

router.post('/crear',async (req,res)=>{
    const {titulo,url,descripcion} = req.body;
    const newLink = new LinkDTO(titulo,url,descripcion,req.user.id);
    const dao = obtenerDao();;
    await dao.guardarLink(newLink);
    req.flash("mensaje","Link Guardado correctamente");
    res.redirect('/links');
});

router.get('/',helpers.estaLogueado,async (req,res)=>{
    const dao = obtenerDao();
    const idUsuario = req.user.id;
    const listado = await dao.obtenerLinks(idUsuario);
    res.render('components/listar',{listado});
});

router.get('/eliminar/:id',helpers.estaLogueado, async (req,res)=>{
    const {id} = req.params;
    const dao = obtenerDao();
    await dao.eliminarLink(id);
    req.flash("mensaje","Link Eliminado correctamente");
    res.redirect('/links');
});

router.get('/editar/:id',helpers.estaLogueado,async (req,res)=>{
    const {id} = req.params;
    const dao = obtenerDao();
    const datosActuales = await dao.obtenerLink(id);
    console.log(datosActuales);
    res.render('components/editar',{datosActuales:datosActuales[0]})
});

router.post('/editar/:id',async (req,res)=>{
    const {id} = req.params;
    const {titulo,url,descripcion} = req.body;
    const newDates = new LinkDTO(titulo,url,descripcion);
    const dao = obtenerDao();
    await dao.actualizarLink(newDates,id);
    req.flash("mensaje","Link Actualizado correctamente");
    res.redirect('/links');
});

function obtenerDao(){
    const dao = new LinkDA0();
    return dao;
}

module.exports = router;