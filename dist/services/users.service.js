"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserService", {
    enumerable: true,
    get: function() {
        return UserService;
    }
});
const _bcrypt = require("bcrypt");
const _typedi = require("typedi");
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
let UserService = class UserService {
    async findAllUser() {
        const users = await _database.DB.Users.findAll();
        return users;
    }
    async findUserById(userId) {
        const user = await _database.DB.Users.findByPk(userId);
        if (!user) throw new _httpException.HttpException(409, "User doesn't exist");
        return user;
    }
    async createUser(userData) {
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
        return newUser;
    }
    async updateUser(userId, userData) {
        const userToUpdate = await _database.DB.Users.findByPk(userId);
        if (!userToUpdate) throw new _httpException.HttpException(409, "User doesn't exist");
        const hashedPassword = await (0, _bcrypt.hash)(userData.password, 10);
        await _database.DB.Users.update(_object_spread_props(_object_spread({}, userData), {
            password: hashedPassword
        }), {
            where: {
                id: userId
            }
        });
        const updatedUser = await _database.DB.Users.findByPk(userId);
        return updatedUser;
    }
    async deleteUser(userId) {
        const userToDelete = await _database.DB.Users.findByPk(userId);
        if (!userToDelete) throw new _httpException.HttpException(409, "User doesn't exist");
        await _database.DB.Users.destroy({
            where: {
                id: userId
            }
        });
        return userToDelete;
    }
};
UserService = _ts_decorate([
    (0, _typedi.Service)()
], UserService);

//# sourceMappingURL=users.service.js.map