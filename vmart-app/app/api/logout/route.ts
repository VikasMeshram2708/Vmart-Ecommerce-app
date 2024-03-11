import ConnectDb from '@/helpers/DbConnect';
import prisma from '@/helpers/Prisma';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import * as z from 'zod';

const LogoutSchema = z.object({
  email: z.string().email(),
});

type LogoutSchema = z.infer<typeof LogoutSchema>;

export const POST = async (req: NextRequest) => {
  try {
    const reqBody: LogoutSchema = await req.json();

    // Sanitize the email
    LogoutSchema.parse(reqBody);

    // connect to DB
    await ConnectDb();

    // check if the email is valid.
    const isValidEmail = await prisma.user.findUnique({
      where: {
        email: reqBody.email,
      },
    });

    if (!isValidEmail) {
      return NextResponse.json(
        {
          success: false,
          message: 'UnAthorized User.',
        },
        {
          status: 404,
        }
      );
    }

    // Delete the token
    cookies().delete('vMAuth');

    return NextResponse.json({
      success: true,
      message: 'User logged out successfully.',
    });
  } catch (e) {
    const err = e as Error;
    return NextResponse.json({
      success: false,
      message: `Something went wrong. Failed to LogOut. : ${err?.message}`,
    });
  }
};
