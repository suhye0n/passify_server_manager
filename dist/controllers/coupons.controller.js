"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CouponController", {
    enumerable: true,
    get: function() {
        return CouponController;
    }
});
const _typedi = require("typedi");
const _couponsservice = require("../services/coupons.service");
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
let CouponController = class CouponController {
    constructor(){
        _define_property(this, "couponService", _typedi.Container.get(_couponsservice.CouponService));
        _define_property(this, "getCoupons", async (req, res, next)=>{
            try {
                const coupons = await this.couponService.findAllCoupon();
                res.status(200).json({
                    data: coupons,
                    message: 'findAll'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "getCouponById", async (req, res, next)=>{
            try {
                const couponId = Number(req.params.id);
                const coupon = await this.couponService.findCouponById(couponId);
                res.status(200).json({
                    data: coupon,
                    message: 'findOne'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "createCoupon", async (req, res, next)=>{
            try {
                const couponData = req.body;
                const newCoupon = await this.couponService.createCoupon(couponData);
                res.status(201).json({
                    data: newCoupon,
                    message: 'created'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "updateCoupon", async (req, res, next)=>{
            try {
                const couponId = Number(req.params.id);
                const couponData = req.body;
                const updatedCoupon = await this.couponService.updateCoupon(couponId, couponData);
                res.status(200).json({
                    data: updatedCoupon,
                    message: 'updated'
                });
            } catch (error) {
                next(error);
            }
        });
        _define_property(this, "deleteCoupon", async (req, res, next)=>{
            try {
                const couponId = Number(req.params.id);
                const deletedCoupon = await this.couponService.deleteCoupon(couponId);
                res.status(200).json({
                    data: deletedCoupon,
                    message: 'deleted'
                });
            } catch (error) {
                next(error);
            }
        });
    }
};

//# sourceMappingURL=coupons.controller.js.map