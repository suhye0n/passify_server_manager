"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
const _app = require("./app");
const _validateEnv = require("./utils/validateEnv");
const _authroute = require("./routes/auth.route");
const _usersroute = require("./routes/users.route");
const _couponsroute = require("./routes/coupons.route");
(0, _validateEnv.ValidateEnv)();
const app = new _app.App([
    new _authroute.AuthRoute(),
    new _usersroute.UserRoute(),
    new _couponsroute.CouponRoute()
]);
app.start();

//# sourceMappingURL=server.js.map