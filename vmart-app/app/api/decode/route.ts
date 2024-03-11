import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export const GET = async (req: NextRequest) => {
  try {
    const token = cookies().get('vMAuth')?.value;
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: 'No token found!.',
        },
        {
          status: 400,
        }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.json({
      success: true,
      message: 'Decode Success.',
      decoded,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Something went wrong. Failed to decode the Token.',
      },
      {
        status: 500,
      }
    );
  }
};
