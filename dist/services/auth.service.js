"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthService", {
    enumerable: true,
    get: function() {
        return AuthService;
    }
});
const _bcrypt = require("bcrypt");
const _jsonwebtoken = require("jsonwebtoken");
const _typedi = require("typedi");
const _config = require("../config");
const _database = require("../database");
const _httpException = require("../exceptions/httpException");
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
function _object_spread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === "function") {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _define_property(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _object_spread_props(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
const generateToken = (user)=>{
    const payload = {
        id: user.id
    };
    const expiresIn = 60 * 60;
    return {
        expiresIn,
        token: (0, _jsonwebtoken.sign)(payload, _config.SECRET_KEY, {
            expiresIn
        })
    };
};
const generateCookie = (tokenData)=>{
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};
let AuthService = class AuthService {
    async signup(userData) {
        const existingUser = await _database.DB.Users.findOne({
            where: {
                email: userData.email
            }
        });
        if (existingUser) throw new _httpException.HttpException(409, `This email ${userData.email} already exists`);
        const hashedPassword = await (0, _bcrypt.hash)(userData.password, 10);
        const newUser = await _database.DB.Users.create(_object_spread_props(_object_spread({}, userData), {
            password: hashedPassword
        }));
        const tokenData = generateToken(newUser);
        newUser.token = tokenData.token;
        await _database.DB.Users.update({
            token: tokenData.token
        }, {
            where: {
                id: newUser.id
            }
        });
        const cookie = generateCookie(tokenData);
        return {
            cookie,
            user: newUser
        };
    }
    async login(userData) {
        const user = await _database.DB.Users.findOne({
            where: {
                email: userData.email
            }
        });
        if (!user) throw new _httpException.HttpException(409, `This email ${userData.email} was not found`);
        const isPasswordValid = await (0, _bcrypt.compare)(userData.password, user.password);
        if (!isPasswordValid) throw new _httpException.HttpException(409, 'Password not matching');
        const tokenData = generateToken(user);
        user.token = tokenData.token;
        await _database.DB.Users.update({
            token: tokenData.token
        }, {
            where: {
                id: user.id
            }
        });
        const cookie = generateCookie(tokenData);
        return {
            cookie,
            user
        };
    }
    async logout(userData) {
        const user = await _database.DB.Users.findOne({
            where: {
                email: userData.email,
                password: userData.password
            }
        });
        if (!user) throw new _httpException.HttpException(409, "User doesn't exist");
        return user;
    }
};
AuthService = _ts_decorate([
    (0, _typedi.Service)()
], AuthService);

//# sourceMappingURL=auth.service.js.map