
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, emailUsuarioPorId} = require('../helpers/db-validators')

const { usuariosGet, 
        usuariosPost,
        usuariosPut,
        usuariosDelete } = require('../controllers/usuarios')

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [ 
        check('id', 'No es un ID valido').isMongoId(), //Es el id del parametro (/:id)
        check('id').custom( emailUsuarioPorId ),
        check('rol').custom( esRoleValido ),
        validarCampos
],usuariosPut); //:id parametro de segmento

router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'El password debe de ser mas de 6 letras').isLength({min: 6}),
        check('correo', 'El correo no es valido').isEmail(),
        check('correo').custom( emailExiste ),
        // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
        check('rol').custom( esRoleValido ), // Es lo mismo que hacer (rol) => esRoleValido(rol)
        validarCampos
] ,usuariosPost); //El segundo parametro es para mandar middlewares

router.delete('/', usuariosDelete);


module.exports = router;