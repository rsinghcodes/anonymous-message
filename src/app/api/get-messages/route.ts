import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import mongoose from 'mongoose';
import { User, getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/options';

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

  const userId = new mongoose.Types.ObjectId(user._id);

  try {
    const user = await UserModel.aggregate([
      { $match: { id: userId } },
      { $unwind: '$messages' },
      { $sort: { 'messages.createdAt': -1 } },
      { $group: { _id: '$_id', messages: { $push: '$messages' } } },
    ]);

    if (!user || user.length === 0) {
      return Response.json({
        sucess: false,
        message: 'User not found',
      });
    }

    return Response.json({
      sucess: true,
      messages: user[0]?.messages,
    });
  } catch (error) {
    return Response.json({
      success: false,
      message: 'Not Authenticated',
    });
  }
}
