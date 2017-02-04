/**
* System
*/
let RealTimeModel = require($path.join(COMMON_PATH, '/RealTime'));
let Model = require($path.join(COMMON_PATH, '/Model'));

/**
* Models
*/

/**
* Daos
*/
let NotificationDao = require($path.join(MODULES_PATH, '/RealTime/Dao/NotificationDao'));

module.exports = class Notification extends Model {

    constructor() {
        try {
            super();
            this.dao = new NotificationDao();
        } catch (e) {
            throw e;
        }
    }

    create (attributes) {
        return new Promise( (accept, reject) => {
            try {
                // this.dao.trx = this.dao.db.transaction();
                this.store(attributes)
                .then( (id) => {
                    // this.dao.trx.commit();
                    attributes.notificationId = id;
                    return accept(attributes);
                })
                .catch( (error) => {
                    // this.dao.trx.rollback();
                    return reject(new Error(error.message));
                });
            } catch (e) {
                return reject(new Error(e.message));
            }
        });
    }

    store (notification) {
        return new Promise( (accept, reject) => {
            try {
                this.dao.store(notification)
                .then( (id) => {
                    return accept(id);
                })
                .catch( (error) => {
                    return reject(new Error(error.message));
                });

            } catch (e) {
                return reject(new Error(e.message));
            }
        });
    }

    /**
    * @author Raviel Chausse Silveira
    */
    makeNotificationFail (attributes) {
        return new Promise ( (accept, reject) => {
            try {
                let notification = this.createNotificationFail(attributes);

                this.store(notification)
                .then( (id) => {
                    notification.notificationId = id;
                    let token = $sockets[attributes.peopleId];

                    let modelRealTime = new RealTimeModel();
                    modelRealTime.makeNotification(token, notification)
                    .then( (attributes) => {
                        return accept(notification);
                    })
                    .catch( (error) => {
                        return reject(new Error(error.message));
                    });
                })
                .catch( (error) => {
                    return reject(new Error(error.message));
                });
            } catch (e) {
                return reject(new Error(e.message));
            }
        });
    }

    createNotificationFail(attributes) {
        try {
            let { schoolId, peopleId, studentId, componentAbbreviation, componentName, lecturedDate, lecturedTime } = attributes;

            let date = $moment(`${lecturedDate} ${lecturedTime}:00`, 'YYYY-MM-DD HH:mm:ss');

            let description = `O aluno recebeu falta na aula de ${componentName} às ${date.format('HH:mm')} do dia ${date.format('DD/MM/YYYY')}.`;
            let message = `O aluno recebeu falta na aula de ${componentAbbreviation} do dia ${date.format('DD/MM')} às ${date.format('HH:mm')}.`;

            let notification = {
                schoolId: schoolId,
                studentId: studentId,
                notificationTypeId: $CONSTS.NOTIFICATION_ATTENDANCE.CODE,
                notificationTypeName: $CONSTS.NOTIFICATION_ATTENDANCE.TITLE,
                notificationMessage: message,
                notificationDescription: description,
                notificationDate: date.format('YYYY-MM-DD'),
                notificationTime: date.format('HH:mm:ss'),
                notificationTimestamp: $moment().format('YYYY-MM-DD HH:mm:ss'),
                notificationSituation: 0,
                notificationSendStatus: 0
            };

            return notification;
        } catch (e) {
            throw e;
        }
    }


    /**
    * @author Raviel Chausse Silveira
    */
    makeNotificationPerformance (attributes) {
        return new Promise ( (accept, reject) => {
            try {
                let notification = this.createNotificationPerformance(attributes)

                console.log({ notification });

                this.store(notification)
                .then( (id) => {
                    notification.notificationId = id;
                    let token = $sockets[attributes.peopleId];

                    let modelRealTime = new RealTimeModel();
                    modelRealTime.makeNotification(token, notification)
                    .then( (attributes) => {
                        return accept(notification);
                    })
                    .catch( (error) => {
                        return reject(new Error(error.message));
                    });
                })
                .catch( (error) => {
                    return reject(new Error(error.message));
                });
            } catch (e) {
                return reject(new Error(e.message));
            }
        });
    }

    createNotificationPerformance(attributes) {
        try {
            let { schoolId, peopleId, studentId, componentAbbreviation, componentName, evaluationValue, value } = attributes;

            let description = `O aluno recebeu a nota ${value} de ${evaluationValue} na matéria de ${componentName}.`;
            let message = `O aluno recebeu a nota ${value} de ${evaluationValue} na matéria de ${componentAbbreviation}.`;

            let notification = {
                schoolId: schoolId,
                studentId: studentId,
                notificationTypeId: $CONSTS.NOTIFICATION_NOTES.CODE,
                notificationTypeName: $CONSTS.NOTIFICATION_NOTES.TITLE,
                notificationMessage: message,
                notificationDescription: description,
                notificationDate: $moment().format('YYYY-MM-DD'),
                notificationTime: $moment().format('HH:mm:ss'),
                notificationTimestamp: $moment().format('YYYY-MM-DD HH:mm:ss'),
                notificationSituation: 0,
                notificationSendStatus: 0
            };

            return notification;
        } catch (e) {
            throw e;
        }
    }

}
