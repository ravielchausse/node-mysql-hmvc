let Model = require($path.join(MODULES_PATH, '/RealTime/Models/Notification'));
let model = new Model();

/**
* @author Raviel Chausse Silveira
*/
 const Controller = {

    /**
    * @author Raviel Chausse Silveira
    */
    create (req, res) {
        try {
            let { body } = req;

            return model.create(body)
            .then( (attributes) => {
                return res.status(200).json(attributes);
            })
            .catch( (error) => {
                $logger.error(error.message);
                return res.status(500).json({ code: 500, message: error.message });
            });
        } catch (e) {
            $logger.error(e.message);
            return res.status(500).json({ code: 500, message: e.message });
        }
    }

}

module.exports = Controller;
