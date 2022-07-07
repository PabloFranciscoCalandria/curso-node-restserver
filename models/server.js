const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        // Conectar a DB
        this.conectarDB();

        //Middlewares (Son funciones que le añaden otra funcionalidad a nuestro webserver)
        this.middlewares();

        // Rutas de mi aplicacion
        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        // CORS
        this.app.use(cors())

        // Lectura y Parseo del body
        this.app.use( express.json()); // Cualquier informacion que venga, la intenta a serializar en formato json

        // Directorio Publico
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log("Servidor corriendo en el puerto", this.port);
        });
    }
}

module.exports = Server;