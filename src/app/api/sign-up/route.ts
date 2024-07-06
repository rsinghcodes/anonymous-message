import { sendVerificationEmail } from '@/helpers/sendVerificationEmail';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { username, email, password } = await request.json();
    const existingUserVerifiedByUsername = await prisma.user.findUnique({
      where: { username, isVerified: true },
    });
    if (existingUserVerifiedByUsername) {
      return Response.json({
        success: false,
        message: 'Username is already taken',
      });
    }
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json({
          success: false,
          message: 'User already exist with this email',
        });
      } else {
        await prisma.user.update({
          where: { id: existingUserByEmail?.id },
          data: {
            password: hashedPassword,
            verifyCode: verifyCode,
            verifyCodeExpiry: new Date(Date.now() + 3600000),
          },
        });
      }
    } else {
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);
      await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          verifyCode,
          verifyCodeExpiry: expiryDate,
          isAcceptingMessage: true,
        },
      });
    }

    const emailRespone = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    if (!emailRespone.success) {
      return Response.json({
        success: false,
        message: emailRespone.message,
      });
    }
    return Response.json({
      success: true,
      message: 'User registered successfully. Please verify your email',
    });
  } catch (error) {
    return Response.json({
      sucess: false,
      message: 'Error registering user',
    });
  }
}
