import { NextRequest, NextResponse } from 'next/server';

import { Theater } from '@/app/types/Theater';

export async function POST(request: NextRequest): Promise<NextResponse> {
  const theater = request.nextUrl.searchParams.get('theater') as Theater;

  const response = await fetch('https://serpapi.com/search.json?' +
    new URLSearchParams({
      engine: 'google',
      q: `${theater} showtimes`,
      location: 'New York, New York, United States',
      google_domain: 'google.com',
      gl: 'us',
      hl: 'en',
      api_key: `${process.env.SERP_API_KEY_2}`,
    })
  );

  const data = await response.json();

  return NextResponse.json(data);
}