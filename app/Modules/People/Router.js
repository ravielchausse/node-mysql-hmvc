let PeopleController = require('./Controllers/PeopleController');

/**
* @author Raviel Chausse Silveira
*/
module.exports = (app) => {

    const ROUTER_PREFIXE = '/people';

    app.route(`${ROUTER_PREFIXE}/people`)
    .get(PeopleController.getAllPeople)
    .put(PeopleController.updatePeople);

}
