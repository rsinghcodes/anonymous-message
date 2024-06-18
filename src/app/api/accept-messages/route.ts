import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { User, getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';

export async function POST(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json({
      sucess: false,
      message: 'Not Authenticated',
    });
  }

  const userId = user._id;
  const { acceptMessages } = await request.json();
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { isAcceptingMessage: acceptMessages },
      { new: true }
    );
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

export async function GET(request: Request) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const user: User = session?.user as User;

  if (!session || !session.user) {
    return Response.json({
      sucess: false,
      message: 'Not Authenticated',
    });
  }

  const userId = user._id;
  try {
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) {
      return Response.json({
        sucess: false,
        message: 'User not found',
      });
    }
    return Response.json({
      sucess: true,
      isAcceptingMessage: foundUser.isAcceptingMessage,
    });
  } catch (error) {
    return Response.json({
      sucess: false,
      message: 'Error getting message acceptance status',
    });
  }
}
