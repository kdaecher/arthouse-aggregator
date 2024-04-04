import { NextResponse } from 'next/server';

import getData from '../getData';
import Theater from '@/app/types/Theater';

export const dynamic = 'force-dynamic'; 

const THEATER = Theater.QUAD_CINEMA;

export async function GET() {
  let showtimes;
  
  try {
    showtimes = await getData(THEATER);
    return NextResponse.json(showtimes);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch showtime data' }, { status: 500 });
  }
}
