import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await UserModel.findOne({ username: decodedUsername });

    if (!user) {
      return Response.json({ success: false, message: 'User not found' });
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeNotExpired && isCodeValid) {
      user.isVerified = true;
      await user.save();
      return Response.json({
        success: true,
        message: 'Account verified successfully',
      });
    } else if (!isCodeNotExpired) {
      return Response.json({
        success: false,
        message:
          'Verification code has expired, please sign-up again to get a new code',
      });
    } else {
      return Response.json({
        success: false,
        message: 'Incorrect verification code',
      });
    }
  } catch (error) {
    console.error('Error verifying user', error);
    return Response.json({
      success: false,
      message: 'Error verifying user',
    });
  }
}
