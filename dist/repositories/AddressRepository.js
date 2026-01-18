"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddressRepository = void 0;
const prisma_1 = require("../config/prisma");
const logger_1 = __importDefault(require("../utils/logger"));
class AddressRepository {
    static createAddress(addressData) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering createAddress repository method", { userId: addressData.userId });
            const address = yield prisma_1.prisma.address.create({
                data: addressData
            });
            logger_1.default.info("Exiting createAddress repository method", { addressId: address.id });
            return address;
        });
    }
    static getAddressesByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getAddressesByUserId repository method", { userId });
            const addresses = yield prisma_1.prisma.address.findMany({
                where: { userId },
                orderBy: { createdAt: 'desc' }
            });
            logger_1.default.info("Exiting getAddressesByUserId repository method", { count: addresses.length });
            return addresses;
        });
    }
    static updateAddress(userId, addressData) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering updateAddress repository method", {
                addressId: addressData.id,
                userId
            });
            const { id } = addressData, updateData = __rest(addressData, ["id"]);
            const address = yield prisma_1.prisma.address.update({
                where: {
                    id,
                    userId // Ensure the address belongs to the user
                },
                data: updateData
            });
            logger_1.default.info("Exiting updateAddress repository method", {
                addressId: address.id,
                success: true
            });
            return address;
        });
    }
    static deleteAddress(addressId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering deleteAddress repository method", { addressId });
            // Check if address is used in any orders
            const isUsed = yield this.isAddressUsed(addressId);
            if (isUsed) {
                throw new Error('Cannot delete address as it is being used in existing orders');
            }
            const address = yield prisma_1.prisma.address.delete({
                where: { id: addressId }
            });
            logger_1.default.info("Exiting deleteAddress repository method", { addressId });
            return address;
        });
    }
    static getAddressesByOrderId(userId, orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Getting addresses for order", { orderId });
            const order = yield prisma_1.prisma.order.findUnique({
                where: { id: orderId },
                include: {
                    user: true,
                    billingAddress: true,
                    shippingAddress: true
                }
            });
            if (!order) {
                throw new Error('Order not found');
            }
            if (order.userId !== userId) {
                throw new Error('Access denied');
            }
            return {
                billingAddress: order.billingAddress,
                shippingAddress: order.shippingAddress
            };
        });
    }
    static isAddressUsed(addressId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [billingCount, shippingCount] = yield Promise.all([
                prisma_1.prisma.order.count({ where: { billingAddressId: addressId } }),
                prisma_1.prisma.order.count({ where: { shippingAddressId: addressId } })
            ]);
            return billingCount > 0 || shippingCount > 0;
        });
    }
}
exports.AddressRepository = AddressRepository;
