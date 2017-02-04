/**
* @author Raviel Chausse Silveira
*/
module.exports = class Model {

    constructor()
    {
        try {

        } catch (e) {
            throw e;
        }
    }

    handleEmit(socket, attributes, response) {
        try {
            if (response) {
                if (typeof response === 'function') {
                    return response(attributes);
                }
                else if (typeof response === 'string') {
                    let emiter = response.split('.');
                    if (emiter.length === 1) {
                        return socket.emit(emiter[0], { data: attributes });
                    }
                    else {
                        return socket.emit('response', {cls: emiter[0], action: emiter[1], data: attributes});
                    }
                }
                else {
                    return socket.emit('response', {action: 'Exceptions', data: { message: 'Error response not map.' } });
                }
            }
            else {
                return socket.emit('response', {action: 'Exceptions', data: { message: 'Error not response.' } });
            }
        } catch (e) {
            throw e;
        }
    }
}
