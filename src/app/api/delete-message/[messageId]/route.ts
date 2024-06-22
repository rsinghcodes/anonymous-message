import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/model/User';
import { User, getServerSession } from 'next-auth';

export async function DELETE(
  request: Request,
  { params }: { params: { messageId: string } }
) {
  await dbConnect();
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
    const updateResult = await UserModel.updateOne(
      { _id: user._id },
      { $pull: { messages: { _id: messageId } } }
    );

    if (updateResult.modifiedCount === 0) {
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
