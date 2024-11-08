"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthMiddleware", {
    enumerable: true,
    get: function() {
        return AuthMiddleware;
    }
});
const _jsonwebtoken = require("jsonwebtoken");
const _config = require("../config");
const _database = require("../database");
const _httpException = require("../exceptions/httpException");
const getAuthorization = (req)=>{
    const coockie = req.cookies["Authorization"];
    if (coockie) return coockie;
    const header = req.header("Authorization");
    if (header) return header.split("Bearer ")[1];
    return null;
};
const AuthMiddleware = async (req, res, next)=>{
    try {
        const Authorization = getAuthorization(req);
        if (Authorization) {
            const { id } = (0, _jsonwebtoken.verify)(Authorization, _config.SECRET_KEY);
            const findUser = await _database.DB.Users.findByPk(id);
            if (findUser) {
                req.user = findUser;
                next();
            } else {
                next(new _httpException.HttpException(401, "Wrong authentication token"));
            }
        } else {
            next(new _httpException.HttpException(404, "Authentication token missing"));
        }
    } catch (error) {
        next(new _httpException.HttpException(401, "Wrong authentication token"));
    }
};

//# sourceMappingURL=auth.middleware.js.map