let expressValidator = require('express-validator');
let bodyParser = require('body-parser');
let consign = require('consign');
let express = require('express');
let morgan = require('morgan');
let moment = require('moment');
let http = require('http');
let cors = require('cors');

const exp = express();

exp.use(cors());

exp.use( (req, res, next) => {
    try {
        return next();

        let { people, token } = req.headers;

        if (people && token) {
            $sockets[people] = token;
            return next();
        }
        else {
            return res.status(403).json({ message: 'Not authorized!!!' });
        }
    } catch (e) {
        $logger.error(e.message);
        return res.status(500).json({ code: 500, message: e.message });
    }
});


exp.use(morgan('common', {
    stream: { write: (message) => $logger.info(message.replace(/\[.*\]/gi, `[${moment().format('YYYY-MM-DD HH:mm:ss')}]`)) }
}));

exp.use(bodyParser.urlencoded({extended: true}));
exp.use(bodyParser.json());

exp.use(expressValidator());

consign({ cwd: COMMON_PATH })
.include('/Router')
.into(exp);

module.exports = http.createServer(exp);
