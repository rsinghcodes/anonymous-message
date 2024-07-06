import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { PrismaClient } from '@prisma/client';
import { User, getServerSession } from 'next-auth';

const prisma = new PrismaClient();

export async function DELETE(
  _: Request,
  { params }: { params: { messageId: string } }
) {
  const messageId = params.messageId;
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json({
      sucess: false,
      message: 'Not Authenticated',
    });
  }

  try {
    const updateResult = await prisma.message.delete({
      where: { id: messageId, userId: user?.id },
    });

    if (!updateResult) {
      return Response.json({
        success: false,
        message: 'Message not found or already deleted',
      });
    }
    return Response.json({
      success: true,
      message: 'Message deleted',
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: 'Error deleting message',
    });
  }
}
