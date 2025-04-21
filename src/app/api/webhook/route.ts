import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

// Configure this endpoint to handle webhooks from a CMS or other content source
export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    console.log('Webhook received:', payload);
    
    // Revalidate the paths
    revalidateTag('articles');

    return NextResponse.json(
      { revalidated: true, message: 'Cache invalidated successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing webhook:', error);
    return NextResponse.json(
      { message: 'Error processing webhook' },
      { status: 500 }
    );
  }
} 