import { sendVerificationEmail } from '@/helpers/sendVerificationEmail';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, email, password } = await request.json();
    const existingUserVerifiedByUsername = await UserModel.findOne({
      username,
      isVerified: true,
    });
    if (existingUserVerifiedByUsername) {
      return Response.json({
        success: false,
        message: 'Username is already taken',
      });
    }
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUserByEmail = await UserModel.findOne({ email });
    if (existingUserByEmail) {
      if (existingUserByEmail.isVerified) {
        return Response.json({
          success: false,
          message: 'User already exist with this email',
        });
      } else {
        existingUserByEmail.password = hashedPassword;
        existingUserByEmail.verifyCode = verifyCode;
        existingUserByEmail.verifyCodeExpiry = new Date(Date.now() + 3600000);
        await existingUserByEmail.save();
      }
    } else {
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 1);

      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry: expiryDate,
        isAcceptingMessage: true,
        messages: [],
      });

      newUser.save();
    }

    const emailRespone = await sendVerificationEmail(
      email,
      password,
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
