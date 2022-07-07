const { response, request} = require('express');
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async (req = request, res = response) => {

    // const {vida, defensa = '10'} = req.query; // Si no viene la defensa en la url, por defecto sera 10
    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true}

    // const usuarios = await Usuario.find(query) // No se acostumbra a borrar fisicamente el la BD, por eso se cambia el estado del usuario, y si figura false, es que no esta, lo cual no quiero obtener esos usuarios con estado false
    //     .skip(Number(desde)) // Trae desde tal posicion en adelante 
    //     .limit(Number(limite)); // Casteamos a integer, porque limite es un string y la funcion limit espera leer un numero no un string

    // const total = await Usuario.countDocuments(query);

    // Al tener dos await!, el problema es que si cada uno, tardara 4 segundos, tengo 8 segundos totales en espera
    // para eso, se hace una promesa donde le paso un arreglo de cada una de las promesas
    // En teoria, deberia tardar menos que hacer dos promesas por separado
    const [ total, usuarios] = await Promise.all([ // [total, usuarios] Es la destructuracion de devolver toda la respuesta (res)
        Usuario.countDocuments(query),
        Usuario.find(query).skip(Number(desde)).limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
        // res
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

    res.json(usuario)
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

const usuariosDelete = async (req, res = response) => {

    const { id } = req.params;

    // Borrar fisicamente (NO ES MUY RECOMENDABLE)
    // const usuario = await Usuario.findByIdAndDelete(id) // Borra el usuario con ese id

    // Lo "borramos", cambiando el estado
    const usuario = await Usuario.findByIdAndUpdate( id, {estado: false});

    res.json({
        msg: 'delete API - controlador',
        id
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}