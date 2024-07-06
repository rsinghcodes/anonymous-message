import { PrismaClient } from '@prisma/client';
import { User, getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json({
      sucess: false,
      message: 'Not Authenticated',
    });
  }

  const userId = user.id;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        messages: {
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });

    if (!user) {
      return Response.json({
        sucess: false,
        message: 'User not found',
      });
    }

    return Response.json({
      sucess: true,
      messages: user?.messages,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: 'Not Authenticated',
    });
  }
}
