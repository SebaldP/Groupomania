require('dotenv').config();                         // importation du package "dotenv"

// DECLARATION DES VARIABLES ET DES PACKAGES
const http = require('http');
const app = require('./app');

const normalizePort = val => {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'voie ' + address : 'port: ' + port;
    switch (error.code) {
        case 'EACCES':
        console.error(bind + ' nécessite des privilèges élevés.');
        process.exit(1);
        break;
        case 'EADDRINUSE':
        console.error(bind + ' est déjà utilisé.');
        process.exit(1);
        break;
        default:
        throw error;
    }
};

const server = http.createServer(app);

// CONFIGURATION DU SERVEUR

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind = typeof address === 'string' ? 'de la voie ' + address : 'du port ' + port;
    console.log(`Écoute ${bind} !`);
});

// DEMARRAGE DU SERVEUR

server.listen(port);