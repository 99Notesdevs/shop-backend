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
exports.ShippingService = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const ShippingRepository_1 = require("../repositories/ShippingRepository");
class ShippingService {
    static addShippingDetails(data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Adding shipping details");
            const shippingDetails = yield ShippingRepository_1.ShippingRepository.addShippingDetails(data);
            return shippingDetails;
        });
    }
    static updateShippingDetails(data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Updating shipping details");
            const shippingDetails = yield ShippingRepository_1.ShippingRepository.updateShippingDetails(data);
            return shippingDetails;
        });
    }
    static updateShippingStatus(data) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Updating shipping status");
            const shippingDetails = yield ShippingRepository_1.ShippingRepository.updateShippingStatus(data);
            return shippingDetails;
        });
    }
    static trackShipping(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Tracking shipping");
            const shippingDetails = yield ShippingRepository_1.ShippingRepository.trackShipping(orderId);
            return shippingDetails;
        });
    }
    static deleteShippingDetails(orderId) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Deleting shipping details");
            const shippingDetails = yield ShippingRepository_1.ShippingRepository.deleteShippingDetails(orderId);
            return shippingDetails;
        });
    }
}
exports.ShippingService = ShippingService;
