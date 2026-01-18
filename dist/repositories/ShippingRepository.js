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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShippingRepository = void 0;
const prisma_1 = require("../config/prisma");
const logger_1 = __importDefault(require("../utils/logger"));
class ShippingRepository {
    static addShippingDetails(data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Adding shipping details");
            const shippingDetails = yield prisma_1.prisma.shipping.create({
                data: {
                    shippingAddress: data.shippingAddress,
                    orderId: data.orderId,
                    trackingNumber: data.trackingNumber,
                    carrier: data.carrier,
                    status: data.status,
                    shippingDate: data.shippingDate,
                }
            });
            return shippingDetails;
        });
    }
    static updateShippingDetails(data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Updating shipping details");
            const shipping = yield prisma_1.prisma.shipping.findFirst({
                where: { orderId: data.orderId }
            });
            if (!shipping) {
                logger_1.default.error("Shipping details not found");
                return null;
            }
            const shippingDetails = yield prisma_1.prisma.shipping.update({
                where: {
                    id: shipping.id, // Use the id for the update
                },
                data: {
                    shippingAddress: data.shippingAddress,
                    trackingNumber: data.trackingNumber,
                    carrier: data.carrier,
                    status: data.status,
                    shippingDate: data.shippingDate,
                }
            });
            return shippingDetails;
        });
    }
    static updateShippingStatus(data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Updating shipping status");
            const shipping = yield prisma_1.prisma.shipping.findFirst({
                where: { orderId: data.orderId }
            });
            if (!shipping) {
                logger_1.default.error("Shipping details not found");
                return null;
            }
            const shippingDetails = yield prisma_1.prisma.shipping.update({
                where: {
                    id: shipping.id, // Use the id for the update
                },
                data: {
                    status: data.status,
                }
            });
            return shippingDetails;
        });
    }
    static trackShipping(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Tracking shipping");
            const shippingDetails = yield prisma_1.prisma.shipping.findMany({
                where: {
                    orderId: orderId,
                }
            });
            return shippingDetails;
        });
    }
    static deleteShippingDetails(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Deleting shipping details");
            const shipping = yield prisma_1.prisma.shipping.findFirst({
                where: { orderId: orderId }
            });
            if (!shipping) {
                logger_1.default.error("Shipping details not found");
                return null;
            }
            const shippingDetails = yield prisma_1.prisma.shipping.delete({
                where: {
                    id: shipping.id, // Use the id for the update
                }
            });
            return shippingDetails;
        });
    }
}
exports.ShippingRepository = ShippingRepository;
