let NotificationController = require('./Controllers/NotificationController');

/**
* @author Raviel Chausse Silveira
*/
module.exports = (app) => {

    const ROUTER_PREFIXE = '/real-time';

    app.route(`${ROUTER_PREFIXE}/notification`)
    .post(NotificationController.create);

}
