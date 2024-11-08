"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function() {
        return _default;
    }
});
const _dotenv = require("dotenv");
(0, _dotenv.config)({
    path: `.env.${process.env.NODE_ENV || 'development'}.local`
});
const { DB_HOST: host, DB_PORT: port, DB_USER: username, DB_PASSWORD: password, DB_DATABASE: database } = process.env;
const _default = {
    username,
    password,
    database,
    port,
    host,
    dialect: 'mysql',
    migrationStorageTableName: 'sequelize_migrations',
    seederStorageTableName: 'sequelize_seeds'
};

//# sourceMappingURL=sequelize-cli.js.map