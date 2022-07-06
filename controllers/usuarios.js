const { response, request} = require('express');

const usuariosGet = (req = request, res = response) => {

    const {vida, defensa = '10'} = req.query; // Si no viene la defensa en la url, por defecto sera 10

    res.json({
        msg: 'get API - controlador',
        vida,
        defensa
    });
}

const usuariosPost = (req = request, res = response) => {

    const {nombre, edad} = req.body;

    req.status(201).json({
        msg: 'post API - controlador',
        nombre,
        edad
    })
}

const usuariosPut = (req, res = response) => {

    const {id} = req.params //Id es el nombre del parametro de la ruta solicitada

    res.json({
        msg: 'put API - controlador',
        id
    })
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controlador'
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}