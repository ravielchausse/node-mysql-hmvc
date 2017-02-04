let Dao = require($path.join(COMMON_PATH, '/Database'));

/**
* @author Raviel Chausse Silveira
*/
module.exports = class NotificationDao extends Dao {

    constructor() {
        try {
            super();
            this.module = 'Notification';
            this.table = 'not_notifications';
            this.primaryKey = 'not_id';
            this.fillable = [
            'not_id_ntt',
            'not_id_sch',
            'not_id_stu',
            'not_description',
            'not_message',
            'not_date',
            'not_time',
            'not_timestamp',
            'not_situation',
            'not_send_status',
            'not_status',
            'not_sys'
            ];
        } catch (e) {
            throw e;
        }
    }

    makeObject(notification) {
        try {
            let params = {
                not_id_sch: notification.schoolId || null,
                not_id_stu: notification.studentId || null,
                not_id_ntt: notification.notificationTypeId || null,
                not_description: notification.notificationDescription || null,
                not_message: notification.notificationMessage || null,
                not_date: notification.notificationDate || null,
                not_time: notification.notificationTime || null,
                not_timestamp: notification.notificationTimestamp || null,
                not_situation: notification.notificationSituation || 0,
                not_send_status: notification.notificationSendStatus || 0
            };

            params = this.removeKeyEmpty(params);
            return params;
        } catch (e) {
            throw e;
        }
    }

    store(notification) {
        return new Promise( (accept, reject) => {
            try {
                let params = this.makeObject(notification);

                this.insert(params)
                .then( (update) => {
                    return accept(update);
                })
                .catch( (error) => {
                    return reject(new Error(error.message));
                });
            } catch (e) {
                return reject(new Error(e.message));
            }
        });
    }

}
