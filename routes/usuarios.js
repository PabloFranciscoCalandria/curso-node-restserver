
const { Router } = require('express');

const { usuariosGet, 
        usuariosPost,
        usuariosPut,
        usuariosDelete } = require('../controllers/usuarios')

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', usuariosPut); //:id parametro de segmento

router.post('/', usuariosPost);

router.delete('/', usuariosDelete);


module.exports = router;