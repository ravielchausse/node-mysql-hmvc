/**
* System
*/
let RealTimeModel = require($path.join(COMMON_PATH, '/RealTime'));
let Model = require($path.join(COMMON_PATH, '/Model'));

/**
* Models
*/
let NotificationModel = require($path.join(MODULES_PATH, '/RealTime/Models/Notification'));

/**
* Daos
*/
let PeopleDao = require($path.join(MODULES_PATH, '/People/Dao/PeopleDao'));

module.exports = class People extends Model {

    constructor() {
        try {
            super();
            this.dao = new PeopleDao();
        } catch (e) {
            throw e;
        }
    }

    getAllPeople (attributes) {
        return new Promise( (accept, reject) => {
            try {
                this.dao.getAllPeople(attributes)
                .then( (people) => {
                    return accept(people);
                })
                .catch( (error) => {
                    return reject(new Error(error.message));
                });
            } catch (e) {
                return reject(new Error(e.message));
            }
        });
    }

    updatePeople (attributes) {
        return new Promise( (accept, reject) => {
            try {
                this.dao.begin()
                .then( (begin) => {
                    this.dao.updatePeople(attributes)
                    .then( (update) => {
                        this.dao.commit()
                        .then( (commit) => {
                            this.dao.getAllPeople(attributes)
                            .then( (people) => {
                                return accept(people);
                            })
                            .catch( (error) => {
                                return reject(new Error(error.message));
                            });
                        })
                        .catch( (error) => {
                            return reject(new Error(error.message));
                        });
                    })
                    .catch( (error) => {
                        this.dao.rollback();
                        return reject(new Error(error.message));
                    });
                })
                .catch( (error) => {
                    this.dao.rollback();
                    return reject(new Error(error.message));
                });
            } catch (e) {
                this.dao.rollback();
                return reject(new Error(e.message));
            }
        });
    }

}
