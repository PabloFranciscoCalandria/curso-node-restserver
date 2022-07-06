const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRoleValido = async (rol = '') => {
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
            throw new Error(`El rol ${rol} no esta registrado en la BD`) // Asi funciona el express-validator
    }
}

const emailExiste = async (correo = '') => {
    const existeMail = await Usuario.findOne({ correo }); // Busca si existe el correo en la base de datos
    if(existeMail){
        throw new Error(`El email ${correo} ya existe`)
    }
}

const emailUsuarioPorId = async (id) => {
    const existeUsuario = await Usuario.findById({ id }); // Busca si existe el id en la base de datos
    if(!existeUsuario){
        throw new Error(`El id no existe ${id}`)
    }
}

module.exports = {
    esRoleValido,
    emailExiste,
    emailUsuarioPorId
}