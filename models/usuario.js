const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true //No se duplique
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE'] // Valida que el rol sea uno de los dos 
    },
    estado: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false,
    },
});

UsuarioSchema.methods.toJSON = function(){
    const {__v, password, ...usuario} = this.toObject(); //Sacamos __v y el password, y todo lo demas lo retornamos en usuario
    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema )