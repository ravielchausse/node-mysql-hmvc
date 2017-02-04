let Connect = require('./Connect');

module.exports = class QueryBuilder {

    constructor() {

    }

    /**
    * @author Raviel Chausse Silveira
    */
    open() {
        if (!this.db || this.db.state === "disconnected") {
            this.db = Connect();
            console.log({db: this.db});
        }
    }

    /**
    * @author Raviel Chausse Silveira
    */
    close() {
        if (this.db && this.db.state === "authenticated") {
            this.db.destroy();
            this.db = null;
        }
    }

    /**
    * @author Raviel Chausse Silveira
    */
    begin() {
        return new Promise ( (accept, reject) => {
            try {
                this.open();
                this.db.query('START TRANSACTION;', [], (err, begin) => {
                    if (err) {
                        console.log({begin_error: err});
                        return reject(new Error(err.message));
                    }
                    this.autoCommit()
                    .then( (autoCommit) => {
                        console.log('begin');
                        return accept(autoCommit);
                    })
                    .catch( (error) => {
                        return reject(new Error(error.message))
                    });
                });
            } catch (e) {
                return reject(new Error(e.message));
            }
        });
    }

    /**
    * @author Raviel Chausse Silveira
    */
    autoCommit() {
        return new Promise ( (accept, reject) => {
            try {
                this.db.query('SET autocommit=0;', [], (err, autoCommit) => {
                    if (err) {
                        console.log({autoCommit_error: err});
                        return reject(new Error(err.message));
                    }
                    console.log('autoCommit');
                    return accept(autoCommit);
                });
            } catch (e) {
                return reject(new Error(e.message));
            }
        });
    }

    /**
    * @author Raviel Chausse Silveira
    */
    commit() {
        return new Promise ( (accept, reject) => {
            try {
                this.db.query('COMMIT;', [], (err, commit) => {
                    if (err) {
                        console.log({commit_error: err});
                        this.rollback()
                        .then( (rollback) => {
                            return accept(rollback);
                        })
                        .catch( (error) => {
                            return reject(new Error(error.message))
                        });
                    }
                    this.close();
                    console.log('commit');
                    return accept(commit);
                });
            } catch (e) {
                return reject(new Error(e.message));
            }
        });
    }

    /**
    * @author Raviel Chausse Silveira
    */
    rollback() {
        return new Promise ( (accept, reject) => {
            try {
                this.db.query('ROLLBACK;', [], (err, rollback) => {
                    if (err) {
                        this.close();
                        console.log({rollback_error: err});
                        return reject(new Error(err.message));
                    }
                    this.close();
                    console.log('rollback');
                    return accept(rollback);
                });
            } catch (e) {
                return reject(new Error(e.message));
            }
        });
    }

    makeObject(attributes) {
        try {
            throw new Error('This method must be overwritten in the concrete class.');
        } catch (e) {
            throw e;
        }
    }

    /**
    * @author Raviel Chausse Silveira
    */
    insert(params) {
        return new Promise( (accept, reject) => {
            try {
                return reject(new Error('Not implemented!!!'));
            } catch (e) {
                return reject(new Error(e.message));
            }
        });
    }

    /**
    * @author Raviel Chausse Silveira
    */
    update(query, params) {
        return new Promise ( (accept, reject) => {
            try {
                this.db.query(query, params, (err, results) => {
                    if (err) {
                        return reject(new Error(err.message));
                    }
                    return accept(results);
                });
            } catch (e) {
                return reject(new Error(e.message));
            }
        });
    }

    /**
    * @author Raviel Chausse Silveira
    */
    delete(id) {
        return new Promise( (accept, reject) => {
            try {
                return reject(new Error('Not implemented!!!'));
            } catch (e) {
                return reject(new Error(e.message));
            }
        });
    }

    /**
    * @author Raviel Chausse Silveira
    */
    get(query, params) {
        return new Promise ( (accept, reject) => {
            try {
                this.open();
                this.db.query(query, params, (err, results) => {
                    if (err) {
                        this.close();
                        return reject(new Error(err.message));
                    }
                    this.close();
                    return accept(results);
                });
            } catch (e) {
                this.close();
                return reject(new Error(e.message));
            }
        });
    }

    /**
    * @author Raviel Chausse Silveira
    */
    first(query, params) {
        return new Promise( (accept, reject) => {
            try {
                this.open();
                this.close();
                return reject(new Error('Not implemented!!!'));
            } catch (e) {
                this.close();
                return reject(new Error(e.message));
            }
        });
    }

    removeKeyEmpty(params) {
        let attr = {};
        for (let i in params) {
            if (params[i] || params[i] === 0) {
                attr[i] = params[i];
            }
        }
        return attr;
    }

}
