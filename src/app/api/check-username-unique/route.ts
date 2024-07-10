import prisma from '@/lib/prisma';
import { usernameValidation } from '@/schemas/signUpSchema';
import { z } from 'zod';

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  try {
    const queryParam = { username: searchParams.get('username') };
    const result = UsernameQuerySchema.safeParse(queryParam);
    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return Response.json({
        success: false,
        message:
          usernameErrors.length > 0
            ? usernameErrors.join(', ')
            : 'Invalid query parameter',
      });
    }
    const { username } = result.data;
    const existingVerifiedUser = await prisma.user.findUnique({
      where: { username, isVerified: true },
    });

    if (existingVerifiedUser) {
      return Response.json({
        success: false,
        message: 'Username is already taken',
      });
    }

    return Response.json({
      success: true,
      message: 'Username is unique',
    });
  } catch (error) {
    console.error('Error checking username', error);
    return Response.json({
      success: false,
      message: 'Error checking username',
    });
  }
}
