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
exports.OffersRepository = void 0;
const prisma_1 = require("../config/prisma");
const logger_1 = __importDefault(require("../utils/logger"));
class OffersRepository {
    static createOffer(offerData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const offer = yield prisma_1.prisma.offers.create({
                    data: offerData,
                });
                logger_1.default.info("Offer created successfully");
                return offer;
            }
            catch (error) {
                logger_1.default.error("Error creating offer", error);
                throw error;
            }
        });
    }
    static getAllOffers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const offers = yield prisma_1.prisma.offers.findMany();
                logger_1.default.info("Offers fetched successfully");
                return offers;
            }
            catch (error) {
                logger_1.default.error("Error fetching offers", error);
                throw error;
            }
        });
    }
    static getOfferById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const offer = yield prisma_1.prisma.offers.findUnique({
                    where: { id },
                });
                logger_1.default.info("Offer fetched successfully");
                return offer;
            }
            catch (error) {
                logger_1.default.error("Error fetching offer", error);
                throw error;
            }
        });
    }
    static updateOffer(id, offerData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const offer = yield prisma_1.prisma.offers.update({
                    where: { id },
                    data: offerData,
                });
                logger_1.default.info("Offer updated successfully");
                return offer;
            }
            catch (error) {
                logger_1.default.error("Error updating offer", error);
                throw error;
            }
        });
    }
    static deleteOffer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const offer = yield prisma_1.prisma.offers.delete({
                    where: { id },
                });
                logger_1.default.info("Offer deleted successfully");
                return offer;
            }
            catch (error) {
                logger_1.default.error("Error deleting offer", error);
                throw error;
            }
        });
    }
}
exports.OffersRepository = OffersRepository;
