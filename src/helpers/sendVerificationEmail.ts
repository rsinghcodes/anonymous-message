import { ApiResponse } from '@/types/ApiResponse';
import { render } from '@react-email/render';
import nodemailer from 'nodemailer';
import Email from '../../emails/VerificationEmail';

export async function sendVerificationEmail(
  email: string,
  username: string,
  verifyCode: string
): Promise<ApiResponse> {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_PASSWORD,
      },
    });

    const emailHtml = render(Email({ username, otp: verifyCode }));

    await transporter.sendMail({
      from: {
        name: 'Anonymous message',
        address: 'noreply@anonymous-message.com',
      },
      to: email,
      subject: 'Verification code - Anonymous message',
      html: emailHtml,
    });

    return { success: true, message: 'Verification email sent successfully' };
  } catch (error) {
    console.log('Error sending verification email: ', error);
    return { success: false, message: 'Error sending verification email' };
  }
}
