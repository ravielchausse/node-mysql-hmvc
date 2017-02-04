global.$CONSTS = {
    NOTIFICATION_ATTENDANCE: { CODE: 1, TITLE: 'Faltas' },
    NOTIFICATION_NOTES: { CODE: 2, TITLE: 'Notas' },
    NOTIFICATION_TASKS: { CODE: 3, TITLE: 'Tarefas' },
    NOTIFICATION_ENTRY: { CODE: 4, TITLE: 'Entrada' },
    NOTIFICATION_EXIT: { CODE: 5, TITLE: 'Saída' },
};

let dotenv = require('dotenv');
global.$path = require('path');
/**
* Load variable of .env to process.env
*/
global.BASE_PATH = $path.resolve(__dirname, './')
global.APP_PATH = $path.join(BASE_PATH, '/app');
global.COMMON_PATH = $path.join(APP_PATH, '/Common');
global.MODULES_PATH = $path.join(APP_PATH, '/Modules');

dotenv.config({ path: $path.join(BASE_PATH, '/.env') });
global.$env = process.env;

global.$logger = require($path.join(BASE_PATH, '/Logger'));

let SocketIO = require('socket.io');
let express = require(APP_PATH);
global.$io = new SocketIO(express);

global.$moment = require('moment');
global.$axios = require('axios');

global.$sockets = {};
global.$session = {};


const { NODE_PORT, AXIOS_PROTOCOL, AXIOS_HOST, AXIOS_PORT, AXIOS_PATH } = $env;

$axios.defaults.baseURL = `${AXIOS_PROTOCOL}://${AXIOS_HOST}:${AXIOS_PORT}/${AXIOS_PATH}`;
$axios.defaults.headers.post['Content-Type'] = 'application/json';

$io.on('connection', (socket) => {

    console.log('User connection is open on ' + socket.id);

    socket.on('disconnect', () => {
        console.log('User connection is closed on ' + socket.id);
    });
});

express.listen(NODE_PORT, () => console.log('Servidor rodando na porta %s.', NODE_PORT) );
