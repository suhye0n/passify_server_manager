"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DB", {
    enumerable: true,
    get: function() {
        return DB;
    }
});
const _sequelize = /*#__PURE__*/ _interop_require_default(require("sequelize"));
const _config = require("../config");
const _logger = require("../utils/logger");
const _usersmodel = /*#__PURE__*/ _interop_require_default(require("../models/users.model"));
const _couponsmodel = /*#__PURE__*/ _interop_require_default(require("../models/coupons.model"));
function _interop_require_default(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
const sequelize = new _sequelize.default.Sequelize(_config.DB_DATABASE, _config.DB_USER, _config.DB_PASSWORD, {
    host: _config.DB_HOST,
    port: Number(_config.DB_PORT),
    dialect: 'mysql',
    timezone: '+09:00',
    define: {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
        underscored: true,
        freezeTableName: true
    },
    pool: {
        max: 5,
        min: 0
    },
    logQueryParameters: _config.NODE_ENV === 'development',
    logging: (query, time)=>_logger.logger.info(`${time}ms ${query}`),
    benchmark: true
});
sequelize.authenticate().then(()=>_logger.logger.info('Database connection successful.')).catch((err)=>_logger.logger.error('Database connection failed:', err));
const DB = {
    Users: (0, _usersmodel.default)(sequelize),
    Coupons: (0, _couponsmodel.default)(sequelize),
    sequelize,
    Sequelize: _sequelize.default
};

//# sourceMappingURL=index.js.map