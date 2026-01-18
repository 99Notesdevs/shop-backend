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
exports.OffersService = void 0;
const OffersRepository_1 = require("../repositories/OffersRepository");
const logger_1 = __importDefault(require("../utils/logger"));
class OffersService {
    static createOffer(offerData) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering createOffer service");
            const newOffer = yield OffersRepository_1.OffersRepository.createOffer(offerData);
            logger_1.default.info("Exiting createOffer service", { offerId: newOffer.id });
            return newOffer;
        });
    }
    static getAllOffers() {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getAllOffers service");
            const offers = yield OffersRepository_1.OffersRepository.getAllOffers();
            logger_1.default.info("Exiting getAllOffers service", { offers });
            return offers;
        });
    }
    static getOfferById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering getOfferById service");
            const offer = yield OffersRepository_1.OffersRepository.getOfferById(id);
            logger_1.default.info("Exiting getOfferById service", { offer });
            return offer;
        });
    }
    static updateOffer(id, offerData) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering updateOffer service");
            const updatedOffer = yield OffersRepository_1.OffersRepository.updateOffer(id, offerData);
            logger_1.default.info("Exiting updateOffer service", { offerId: updatedOffer.id });
            return updatedOffer;
        });
    }
    static deleteOffer(id) {
        return __awaiter(this, void 0, void 0, function* () {
            logger_1.default.info("Entering deleteOffer service");
            const deletedOffer = yield OffersRepository_1.OffersRepository.deleteOffer(id);
            logger_1.default.info("Exiting deleteOffer service", { offerId: deletedOffer.id });
            return deletedOffer;
        });
    }
}
exports.OffersService = OffersService;
