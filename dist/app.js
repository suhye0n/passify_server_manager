"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "App", {
    enumerable: true,
    get: function() {
        return App;
    }
});
require("reflect-metadata");
const _express = /*#__PURE__*/ _interop_require_default(require("express"));
const _compression = /*#__PURE__*/ _interop_require_default(require("compression"));
const _cookieparser = /*#__PURE__*/ _interop_require_default(require("cookie-parser"));
const _cors = /*#__PURE__*/ _interop_require_default(require("cors"));
const _helmet = /*#__PURE__*/ _interop_require_default(require("helmet"));
const _hpp = /*#__PURE__*/ _interop_require_default(require("hpp"));
const _morgan = /*#__PURE__*/ _interop_require_default(require("morgan"));
const _config = require("./config");
const _database = require("./database");
const _errormiddleware = require("./middlewares/error.middleware");
const _logger = require("./utils/logger");
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
let App = class App {
    start() {
        this.app.listen(this.serverPort, ()=>{
            _logger.logger.info('-----------------------------------');
            _logger.logger.info(`App is running in ${this.environment} mode.`);
            _logger.logger.info(`Server is listening on port ${this.serverPort}`);
            _logger.logger.info('-----------------------------------');
        });
    }
    getAppInstance() {
        return this.app;
    }
    async setupDatabaseConnection() {
        try {
            await _database.DB.sequelize.sync({
                force: false
            });
            _logger.logger.info('Database connection established successfully.');
        } catch (error) {
            _logger.logger.error('Failed to connect to the database.', error);
        }
    }
    applyMiddlewares() {
        this.app.use((0, _morgan.default)(_config.LOG_FORMAT, {
            stream: _logger.stream
        }));
        this.app.use((0, _cors.default)({
            origin: _config.ORIGIN,
            credentials: _config.CREDENTIALS
        }));
        this.app.use((0, _hpp.default)());
        this.app.use((0, _helmet.default)());
        this.app.use((0, _compression.default)());
        this.app.use(_express.default.json());
        this.app.use(_express.default.urlencoded({
            extended: true
        }));
        this.app.use((0, _cookieparser.default)());
    }
    configureRoutes(routes) {
        routes.forEach((route)=>{
            this.app.use('/', route.router);
        });
    }
    handleErrors() {
        this.app.use(_errormiddleware.ErrorMiddleware);
    }
    constructor(routes){
        _define_property(this, "app", void 0);
        _define_property(this, "environment", void 0);
        _define_property(this, "serverPort", void 0);
        this.app = (0, _express.default)();
        this.environment = _config.NODE_ENV || 'development';
        this.serverPort = _config.PORT || 3000;
        this.setupDatabaseConnection();
        this.applyMiddlewares();
        this.configureRoutes(routes);
        this.handleErrors();
    }
};

//# sourceMappingURL=app.js.map