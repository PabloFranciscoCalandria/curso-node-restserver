const { validationResult } = require('express-validator');


const validarCampos = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    next(); // Al ser un middleware, necesitamos la funcion next(), si el middleware pasa, y llega al next, nos dice que sigamos con el proximo middleware (que son los check del router.post)
}

module.exports = {
    validarCampos
}
    