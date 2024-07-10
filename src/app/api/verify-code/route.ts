import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  try {
    const { username, code } = await request.json();
    const decodedUsername = decodeURIComponent(username);
    const user = await prisma.user.findUnique({
      where: { username: decodedUsername },
    });

    if (!user) {
      return Response.json({ success: false, message: 'User not found' });
    }

    const isCodeValid = user.verifyCode === code;
    const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

    if (isCodeNotExpired && isCodeValid) {
      await prisma.user.update({
        where: { id: user?.id },
        data: { isVerified: true },
      });
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
