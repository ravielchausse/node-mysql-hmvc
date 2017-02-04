let mysql = require('mysql');

module.exports = () => {
    var connect = mysql.createConnection({
        host: $env.DB_HOST,
        database: $env.DB_DATABASE,
        user: $env.DB_USERNAME,
        password: $env.DB_PASSWORD,
        multipleStatements: true
    });
    return connect;
}
