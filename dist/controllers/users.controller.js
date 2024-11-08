"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "UserController", {
    enumerable: true,
    get: function() {
        return UserController;
    }
});
const _typedi = require("typedi");
const _usersservice = require("../services/users.service");
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
let UserController = class UserController {
    constructor(){
        _define_property(this, "userService", _typedi.Container.get(_usersservice.UserService));
        _define_property(this, "getUsers", async (req, res, next)=>{
            try {
                const users = await this.userService.findAllUser();
                res.status(200).json({
                    data: users,
                    message: 'findAll'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "getUserById", async (req, res, next)=>{
            try {
                const userId = Number(req.params.id);
                const user = await this.userService.findUserById(userId);
                res.status(200).json({
                    data: user,
                    message: 'findOne'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "createUser", async (req, res, next)=>{
            try {
                const userData = req.body;
                const newUser = await this.userService.createUser(userData);
                res.status(201).json({
                    data: newUser,
                    message: 'created'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "updateUser", async (req, res, next)=>{
            try {
                const userId = Number(req.params.id);
                const userData = req.body;
                const updatedUser = await this.userService.updateUser(userId, userData);
                res.status(200).json({
                    data: updatedUser,
                    message: 'updated'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "deleteUser", async (req, res, next)=>{
            try {
                const userId = Number(req.params.id);
                const deletedUser = await this.userService.deleteUser(userId);
                res.status(200).json({
                    data: deletedUser,
                    message: 'deleted'
                });
            } catch (error) {
                next(error);
            }
        });
    }
};

//# sourceMappingURL=users.controller.js.map