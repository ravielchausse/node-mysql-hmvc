let Dao = require($path.join(COMMON_PATH, '/Database'));

/**
* @author Raviel Chausse Silveira
*/
module.exports = class PeopleDao extends Dao {

    constructor() {
        try {
            super();
            this.module = 'People';
            this.table = 'peo_people';
            this.primaryKey = 'peo_id';
            this.fillable = [
            'peo_email_primary',
            'peo_email_google',
            'peo_phone',
            'peo_cell_phone',
            'peo_status',
            'peo_sys'
            ];
        } catch (e) {
            throw e;
        }
    }

    getAllPeople (attributes) {
        return new Promise( (accept, reject) => {
            try {
                let limit = 5;

                let query = `
                SELECT * FROM peo_people
                INNER JOIN ind_individuals ON ind_id_peo = peo_id
                LIMIT ${limit};
                `;
                this.get(query, [])
                .then( (people) => {
                    return accept(people);
                })
                .catch( (error) => {
                    return reject(error);
                });
            } catch (e) {
                return reject(new Error(e.message));
            }
        });
    }

    updatePeople (attributes) {
        return new Promise( (accept, reject) => {
            try {
                let query = `
                UPDATE peo_people SET peo_email_google = 'one@admin.com' WHERE peo_id = ?;
                UPDATE ind_individuals SET ind_name = 'Admin RG' WHERE ind_id_peo = ?;
                `;

                this.update(query, [1, 2])
                .then( (people) => {
                    return accept(people);
                })
                .catch( (error) => {
                    return reject(error);
                });
            } catch (e) {
                return reject(new Error(e.message));
            }
        });
    }

}
