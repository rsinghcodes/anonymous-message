import prisma from '@/lib/prisma';

export async function POST(request: Request) {
  const { username, content } = await request.json();
  try {
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return Response.json({
        success: false,
        message: 'User not found',
      });
    }

    if (!user.isAcceptingMessage) {
      return Response.json({
        success: false,
        message: 'User is not accepting the messages',
      });
    }

    await prisma.message.create({
      data: { content, createdAt: new Date(), userId: user?.id },
    });

    return Response.json({
      success: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: 'Internal server error',
    });
  }
}
