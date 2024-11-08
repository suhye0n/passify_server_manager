"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    CREDENTIALS: function() {
        return CREDENTIALS;
    },
    DB_DATABASE: function() {
        return DB_DATABASE;
    },
    DB_HOST: function() {
        return DB_HOST;
    },
    DB_PASSWORD: function() {
        return DB_PASSWORD;
    },
    DB_PORT: function() {
        return DB_PORT;
    },
    DB_USER: function() {
        return DB_USER;
    },
    LOG_DIR: function() {
        return LOG_DIR;
    },
    LOG_FORMAT: function() {
        return LOG_FORMAT;
    },
    NODE_ENV: function() {
        return NODE_ENV;
    },
    ORIGIN: function() {
        return ORIGIN;
    },
    PORT: function() {
        return PORT;
    },
    SECRET_KEY: function() {
        return SECRET_KEY;
    }
});
const _dotenv = require("dotenv");
(0, _dotenv.config)({
    path: `.env.${process.env.NODE_ENV || "development"}.local`
});
const CREDENTIALS = process.env.CREDENTIALS === "true";
const { NODE_ENV, PORT, SECRET_KEY, LOG_FORMAT, LOG_DIR, ORIGIN } = process.env;
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_DATABASE } = process.env;

//# sourceMappingURL=index.js.map