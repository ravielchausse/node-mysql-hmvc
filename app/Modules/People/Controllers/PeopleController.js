let Model = require($path.join(MODULES_PATH, '/People/Models/People'));

/**
* @author Raviel Chausse Silveira
*/
const Controller = {

    /**
    * @author Raviel Chausse Silveira
    */
    getAllPeople(req, res) {
        try {
            let model = new Model();
            let { body } = req;

            return model.getAllPeople(body)
            .then( (attributes) => {
                return res.status(200).json(attributes);
            })
            .catch( (error) => {
                return res.status(500).json({ code: 500, message: error.message });
            });
        }
        catch (e) {
            $logger.error(e.message);
            return res.status(500).json({ code: 500, message: e.message });
        }
    },

    /**
    * @author Raviel Chausse Silveira
    */
    updatePeople (req, res) {
        try {
            let model = new Model();
            let { body } = req;

            return model.updatePeople(body)
            .then( (attributes) => {
                return res.status(200).json(attributes);
            })
            .catch( (error) => {
                return res.status(500).json({ code: 500, message: error.message });
            });
        }
        catch (e) {
            $logger.error(e.message);
            return res.status(500).json({ code: 500, message: e.message });
        }
    }

}

module.exports = Controller;
