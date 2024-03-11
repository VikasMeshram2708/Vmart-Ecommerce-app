import ConnectDb from '@/helpers/DbConnect';
import prisma from '@/helpers/Prisma';
import { UserSchema } from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import bcrypt from 'bcryptjs';
import {
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime/library';

export const POST = async (req: NextRequest) => {
  try {
    const reqBody = await req.json();
    const { name, email, password } = reqBody;

    // Sanitize the incoming data.
    UserSchema.parse({ name, email, password });

    // connect to DB
    await ConnectDb();

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // save the user into the DB.
    const savedUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    // Return the Response
    return NextResponse.json({
      success: true,
      message: 'User created successfully.',
      savedUser,
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
      if (e.code === 'P2002') {
        // Handle unique constraint violation
        return NextResponse.json(
          {
            success: false,
            message: 'Email already exists. Please use a different email.',
          },
          {
            status: 400, // Bad Request
          }
        );
      }
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
