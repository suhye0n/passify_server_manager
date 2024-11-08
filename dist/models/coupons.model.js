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
    CouponModel: function() {
        return CouponModel;
    },
    default: function() {
        return _default;
    }
});
const _sequelize = require("sequelize");
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
let CouponModel = class CouponModel extends _sequelize.Model {
    constructor(...args){
        super(...args), _define_property(this, "id", void 0), _define_property(this, "userId", void 0), _define_property(this, "name", void 0), _define_property(this, "barcode", void 0), _define_property(this, "memo", void 0), _define_property(this, "createdAt", void 0), _define_property(this, "updatedAt", void 0);
    }
};
function _default(sequelize) {
    CouponModel.init({
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: _sequelize.DataTypes.INTEGER
        },
        userId: {
            type: _sequelize.DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id'
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        name: {
            allowNull: false,
            type: _sequelize.DataTypes.STRING(45)
        },
        barcode: {
            allowNull: false,
            type: _sequelize.DataTypes.TEXT
        },
        memo: {
            allowNull: true,
            type: _sequelize.DataTypes.TEXT
        }
    }, {
        tableName: 'coupons',
        sequelize
    });
    return CouponModel;
}

//# sourceMappingURL=coupons.model.js.map