const { response, request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = (req = request, res = response) => {

    

    const {vida, defensa = '10'} = req.query; // Si no viene la defensa en la url, por defecto sera 10

    res.json({
        msg: 'get API - controlador',
        vida,
        defensa
    });
}

const usuariosPost = async (req = request, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(); 
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en BD
    await usuario.save();

    res.json({
        usuario
    })
}

const usuariosPut = async (req, res = response) => {

    const {id} = req.params; //Id es el nombre del parametro de la ruta solicitada
    const {__id, password, google, correo, ...resto} = req.body;

    // TODO validar contra base de datos
    if(password){
        // Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(); 
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json({
        msg: 'put API - controlador',
        usuario
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