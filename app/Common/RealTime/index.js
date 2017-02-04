/**
* @author Raviel Chausse Silveira
*/
module.exports = class Index {

    constructor() {

    }

    /**
    * @author Raviel Chausse Silveira
    */
    getSocketByToken (token) {
        let socket = null;

        for (let i in $io.sockets.sockets) {
            if ($io.sockets.sockets[i]) {
                if ($io.sockets.sockets[i].handshake.query.token) {
                    if ($io.sockets.sockets[i].handshake.query.token == token) {
                        socket = $io.sockets.sockets[i];
                    }
                }
            }
        }
        return socket;
    }

    /**
    * @author Raviel Chausse Silveira
    */
    makeNotification(token, message) {
        return new Promise( (accept, reject) => {
            try {
                token = true;
                if (token) {
                    let socket = this.getSocketByToken(token);
                    socket = true;
                    if (socket) {
                        console.log({notification: message});
                        $io.sockets.emit('renderNotification', message);
                        return accept(true);
                    }
                    else {
                        return accept(false);
                    }
                }
                else {
                    return accept(false);
                }
            } catch (e) {
                return reject(e);
            }
        });
    }

}
