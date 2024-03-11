import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const DecodeToken = (cookie: string) => {
  try {
    // const cookie = cookies().get('vMAuth')?.value;

    if (!cookie) {
      return console.log('Cookie Not Found!');
    }

    const decoded = jwt.verify(cookie, process.env.JWT_SECRET!);

    return decoded;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Invalid or expired token.',
      },
      {
        status: 403, // Forbidden
      }
    );
  }
};

export default DecodeToken;
