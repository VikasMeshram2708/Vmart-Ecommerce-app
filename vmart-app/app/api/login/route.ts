import ConnectDb from '@/helpers/DbConnect';
import prisma from '@/helpers/Prisma';
import { UserLoginSchema } from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import bcrypt from 'bcryptjs';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { email, password } = reqBody;

    // Sanitize the incoming data.
    UserLoginSchema.parse({ email, password });

    // connect to DB
    await ConnectDb();

    // check if the user exist
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'User does not exist.',
        },
        {
          status: 404,
        }
      );
    }

    // compare the hashed password
    const comparePassword = await bcrypt.compare(password, user?.password);

    // cookie management
    if (!comparePassword) {
      return NextResponse.json(
        {
          success: false,
          message: 'Password does not match.',
        },
        {
          status: 400,
        }
      );
    }


    const { name: userName, email: userEmail, id: userId } = user;

    const userDetails = {
      userName,
      userEmail,
      userId,
    };

    // Return the Response
    return NextResponse.json({
      success: true,
      message: 'User Logged In.',
      user: userDetails,
    });
  } catch (e) {
    const err = e as Error;
    if (e instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: e?.errors[0]?.message,
        },
        {
          status: 500,
        }
      );
    }
    if (e instanceof PrismaClientKnownRequestError) {
      return NextResponse.json(
        {
          success: false,
          message: e?.message,
        },
        {
          status: 500,
        }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: err?.message,
      },
      {
        status: 500,
      }
    );
  }
};
