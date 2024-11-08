"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CouponRoute", {
    enumerable: true,
    get: function() {
        return CouponRoute;
    }
});
const _express = require("express");
const _couponscontroller = require("../controllers/coupons.controller");
const _couponsdto = require("../dtos/coupons.dto");
const _validationmiddleware = require("../middlewares/validation.middleware");
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
let CouponRoute = class CouponRoute {
    initializeRoutes() {
        this.router.get(`${this.path}`, this.coupon.getCoupons);
        this.router.get(`${this.path}/:id(\\d+)`, this.coupon.getCouponById);
        this.router.post(`${this.path}`, (0, _validationmiddleware.ValidationMiddleware)(_couponsdto.CreateCouponDto), this.coupon.createCoupon);
        this.router.put(`${this.path}/:id(\\d+)`, (0, _validationmiddleware.ValidationMiddleware)(_couponsdto.CreateCouponDto, true), this.coupon.updateCoupon);
        this.router.delete(`${this.path}/:id(\\d+)`, this.coupon.deleteCoupon);
    }
    constructor(){
        _define_property(this, "path", '/coupons');
        _define_property(this, "router", (0, _express.Router)());
        _define_property(this, "coupon", new _couponscontroller.CouponController());
        this.initializeRoutes();
    }
};

//# sourceMappingURL=coupons.route.js.map