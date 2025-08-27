import { Router } from "express";
import { EmailService } from "../utils/EmailService";

const router = Router();

router.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;
    EmailService.sendEmail({ to, subject, text });
    res.send('Email sent successfully');
});

export default router;