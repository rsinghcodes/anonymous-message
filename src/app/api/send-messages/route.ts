import dbConnect from '@/lib/dbConnect';
import UserModel, { Message } from '@/model/User';

export async function POST(request: Request) {
  dbConnect();
  const { username, content } = await request.json();
  try {
    const user = await UserModel.findOne({ username });

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

    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save();

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
