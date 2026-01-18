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
const express_1 = require("express");
const Category_1 = __importDefault(require("./Category"));
const Orders_1 = __importDefault(require("./Orders"));
const Product_1 = __importDefault(require("./Product"));
const Payments_1 = __importDefault(require("./Payments"));
const Cart_1 = __importDefault(require("./Cart"));
const WIshlist_1 = __importDefault(require("./WIshlist"));
const Shipping_1 = __importDefault(require("./Shipping"));
const Address_1 = __importDefault(require("./Address"));
const productRating_1 = __importDefault(require("./productRating"));
const email_1 = __importDefault(require("./email"));
const Coupon_1 = __importDefault(require("./Coupon"));
const Offers_1 = __importDefault(require("./Offers"));
const search_1 = __importDefault(require("./search"));
const router = (0, express_1.Router)();
// health check api
router.get("/healthCheck", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        message: "vansh is a ceo",
    });
}));
router.use("/category", Category_1.default);
router.use("/order", Orders_1.default);
router.use("/product", Product_1.default);
router.use("/payment", Payments_1.default);
router.use("/cart", Cart_1.default);
router.use("/wishlist", WIshlist_1.default);
router.use("/shipping", Shipping_1.default);
router.use("/address", Address_1.default);
router.use("/productRating", productRating_1.default);
router.use("/email", email_1.default);
router.use("/coupon", Coupon_1.default);
router.use("/offers", Offers_1.default);
router.use("/search", search_1.default);
exports.default = router;
