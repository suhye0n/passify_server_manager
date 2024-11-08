"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "AuthController", {
    enumerable: true,
    get: function() {
        return AuthController;
    }
});
const _typedi = require("typedi");
const _authservice = require("../services/auth.service");
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
let AuthController = class AuthController {
    constructor(){
        _define_property(this, "authService", _typedi.Container.get(_authservice.AuthService));
        _define_property(this, "signUp", async (req, res, next)=>{
            try {
                const newUser = req.body;
                const { cookie, user } = await this.authService.signup(newUser);
                res.setHeader('Set-Cookie', [
                    cookie
                ]);
                res.status(201).json({
                    data: user,
                    message: 'signup'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "logIn", async (req, res, next)=>{
            try {
                const credentials = req.body;
                const { cookie, user } = await this.authService.login(credentials);
                res.setHeader('Set-Cookie', [
                    cookie
                ]);
                res.status(200).json({
                    data: user,
                    message: 'login'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "logOut", async (req, res, next)=>{
            try {
                const currentUser = req.user;
                const loggedOutUser = await this.authService.logout(currentUser);
                res.setHeader('Set-Cookie', [
                    'Authorization=; Max-age=0'
                ]);
                res.status(200).json({
                    data: loggedOutUser,
                    message: 'logout'
                });
            } catch (error) {
                next(error);
            }
        });
    }
};

//# sourceMappingURL=auth.controller.js.map