import { connectDB } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('Attempting to connect to MongoDB...');
    await connectDB();
    console.log('MongoDB connection successful!');
    return new NextResponse(JSON.stringify({
      status: 'success',
      message: 'Connected to MongoDB successfully!'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return new NextResponse(JSON.stringify({
      status: 'error',
      message: 'Failed to connect to database',
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}