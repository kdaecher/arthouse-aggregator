import { NextResponse } from 'next/server';

import getData from '../getData';
import Theater from '@/app/types/Theater';

export const dynamic = 'force-dynamic';

const THEATER = Theater.METROGRAPH;

export async function GET() {
  let showtimes;

  try {
    showtimes = await getData(THEATER);
    return NextResponse.json(showtimes);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
