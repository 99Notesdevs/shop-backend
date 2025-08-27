import nodemailer from 'nodemailer';
import logger from './logger';

export interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  from?: string;
  attachments?: Array<{
    filename: string;
    content?: any;
    path?: string;
    contentType?: string;
  }>;
}

export class EmailService {
  private static transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      // Do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  /**
   * Send an email
   * @param options Email options
   * @returns Promise<boolean> - Returns true if email was sent successfully
   */
  static async sendEmail(options: EmailOptions): Promise<boolean> {
    const mailOptions = {
      from: options.from || `"${process.env.APP_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      logger.info('Email sent successfully', {
        messageId: info.messageId,
        to: options.to,
        subject: options.subject,
      });
      return true;
    } catch (error) {
      logger.error('Error sending email', {
        error,
        to: options.to,
        subject: options.subject,
      });
      return false;
    }
  }

  /**
   * Send a verification email
   * @param to Email address to send to
   * @param token Verification token
   * @param name User's name
   */
  static async sendVerificationEmail(to: string, token: string, name: string): Promise<boolean> {
    const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${token}`;
    const subject = 'Verify Your Email Address';
    const text = `Hello ${name},\n\nPlease verify your email by clicking the link: ${verificationUrl}\n\nIf you did not create an account, please ignore this email.`;
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
        <h2>Verify Your Email Address</h2>
        <p>Hello ${name},</p>
        <p>Thank you for signing up! Please verify your email address by clicking the button below:</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" 
             style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Verify Email
          </a>
        </p>
        <p>Or copy and paste this link into your browser:</p>
        <p>${verificationUrl}</p>
        <p>If you did not create an account, please ignore this email.</p>
        <p>Best regards,<br>${process.env.APP_NAME} Team</p>
      </div>
    `;

    return this.sendEmail({
      to,
      subject,
      text,
      html,
    });
  }

  /**
   * Send a password reset email
   * @param to Email address to send to
   * @param token Reset token
   * @param name User's name
   */
  static async sendPasswordResetEmail(to: string, token: string, name: string): Promise<boolean> {
    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${token}`;
    const subject = 'Password Reset Request';
    const text = `Hello ${name},\n\nYou requested to reset your password. Please click the link below to set a new password:\n\n${resetUrl}\n\nIf you did not request a password reset, please ignore this email.`;
    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
        <h2>Password Reset Request</h2>
        <p>Hello ${name},</p>
        <p>You requested to reset your password. Please click the button below to set a new password:</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${resetUrl}" 
             style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
            Reset Password
          </a>
        </p>
        <p>Or copy and paste this link into your browser:</p>
        <p>${resetUrl}</p>
        <p>If you did not request a password reset, please ignore this email.</p>
        <p>Best regards,<br>${process.env.APP_NAME} Team</p>
      </div>
    `;

    return this.sendEmail({
      to,
      subject,
      text,
      html,
    });
  }

  /**
   * Send an order confirmation email
   * @param to Email address to send to
   * @param orderId Order ID
   * @param orderItems Array of order items
   * @param totalAmount Total order amount
   * @param name Customer's name
   */
  static async sendOrderConfirmationEmail(
    to: string,
    orderId: string,
    orderItems: Array<{
      name: string;
      quantity: number;
      price: number;
    }>,
    totalAmount: number,
    name: string
  ): Promise<boolean> {
    const subject = `Order Confirmation #${orderId}`;
    const itemsHtml = orderItems
      .map(
        (item) => `
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${item.name}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: center;">${item.quantity}</td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd; text-align: right;">₹${item.price.toFixed(2)}</td>
      </tr>
    `
      )
      .join('');

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto;">
        <h2>Order Confirmation #${orderId}</h2>
        <p>Hello ${name},</p>
        <p>Thank you for your order! We've received it and it's being processed.</p>
        
        <h3 style="margin-top: 30px;">Order Details</h3>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
          <thead>
            <tr>
              <th style="text-align: left; padding: 8px; border-bottom: 2px solid #ddd;">Item</th>
              <th style="text-align: center; padding: 8px; border-bottom: 2px solid #ddd;">Qty</th>
              <th style="text-align: right; padding: 8px; border-bottom: 2px solid #ddd;">Price</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
            <tr>
              <td colspan="2" style="text-align: right; padding: 8px; font-weight: bold;">Total:</td>
              <td style="text-align: right; padding: 8px; font-weight: bold;">₹${totalAmount.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
        
        <p>We'll send you a shipping confirmation email when your order is on its way.</p>
        <p>If you have any questions about your order, please contact our customer service.</p>
        
        <p>Best regards,<br>${process.env.APP_NAME} Team</p>
      </div>
    `;

    const text = `Hello ${name},\n\nThank you for your order #${orderId}.\n\nOrder Details:\n${orderItems
      .map((item) => `${item.name} x${item.quantity} - ₹${item.price.toFixed(2)}`)
      .join('\n')}\n\nTotal: ₹${totalAmount.toFixed(2)}\n\nWe'll send you a shipping confirmation email when your order is on its way.\n\nBest regards,\n${
      process.env.APP_NAME
    } Team`;

    return this.sendEmail({
      to,
      subject,
      text,
      html,
    });
  }
}

// Test email configuration on startup
// EmailService.transporter.verify((error: any) => {
//   if (error) {
//     logger.error('Error with email configuration:', error);
//   } else {
//     logger.info('Email server is ready to send messages');
//   }
// });