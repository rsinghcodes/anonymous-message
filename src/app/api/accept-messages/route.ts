import prisma from '@/lib/prisma';
import { User, getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json({
      sucess: false,
      message: 'Not Authenticated',
    });
  }

  const { acceptMessages } = await request.json();
  try {
    const updatedUser = await prisma.user.update({
      where: { id: user?.id },
      data: { isAcceptingMessage: acceptMessages },
    });

    if (!updatedUser) {
      return Response.json({
        sucess: false,
        message: 'Failed to update user status to accept messages',
      });
    }

    return Response.json({
      sucess: true,
      message: 'Message acceptance status updated successfully',
      updatedUser,
    });
  } catch (error) {
    return Response.json({
      sucess: false,
      message: 'Failed to update user status to accept messages',
    });
  }
}

export async function GET(_: Request) {
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json({
      sucess: false,
      message: 'Not Authenticated',
    });
  }

  try {
    const foundUser = await prisma.user.findUnique({ where: { id: user?.id } });
    if (!foundUser) {
      return Response.json({
        sucess: false,
        message: 'User not found',
      });
    }
    return Response.json({
      sucess: true,
      isAcceptingMessage: foundUser?.isAcceptingMessage,
    });
  } catch (error) {
    return Response.json({
      sucess: false,
      message: 'Error getting message acceptance status',
    });
  }
}
