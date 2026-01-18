"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const EmailService_1 = require("../utils/EmailService");
const router = (0, express_1.Router)();
router.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;
    EmailService_1.EmailService.sendEmail({ to, subject, text });
    res.send('Email sent successfully');
});
exports.default = router;
