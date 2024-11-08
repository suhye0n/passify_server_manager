"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "CouponService", {
    enumerable: true,
    get: function() {
        return CouponService;
    }
});
const _typedi = require("typedi");
const _database = require("../database");
const _httpException = require("../exceptions/httpException");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
let CouponService = class CouponService {
    async findAllCoupon() {
        const coupons = await _database.DB.Coupons.findAll();
        return coupons;
    }
    async findCouponById(couponId) {
        const coupon = await _database.DB.Coupons.findByPk(couponId);
        if (!coupon) throw new _httpException.HttpException(409, "Coupon doesn't exist");
        return coupon;
    }
    async createCoupon(couponData) {
        const existingCoupon = await _database.DB.Coupons.findOne({
            where: {
                barcode: couponData.barcode
            }
        });
        if (existingCoupon) throw new _httpException.HttpException(409, `This barcode ${couponData.barcode} already exists`);
        const newCoupon = await _database.DB.Coupons.create(couponData);
        return newCoupon;
    }
    async updateCoupon(couponId, couponData) {
        const couponToUpdate = await _database.DB.Coupons.findByPk(couponId);
        if (!couponToUpdate) throw new _httpException.HttpException(409, "Coupon doesn't exist");
        await _database.DB.Coupons.update(couponData, {
            where: {
                id: couponId
            }
        });
        const updatedCoupon = await _database.DB.Coupons.findByPk(couponId);
        return updatedCoupon;
    }
    async deleteCoupon(couponId) {
        const couponToDelete = await _database.DB.Coupons.findByPk(couponId);
        if (!couponToDelete) throw new _httpException.HttpException(409, "Coupon doesn't exist");
        await _database.DB.Coupons.destroy({
            where: {
                id: couponId
            }
        });
        return couponToDelete;
    }
};
CouponService = _ts_decorate([
    (0, _typedi.Service)()
], CouponService);

//# sourceMappingURL=coupons.service.js.map