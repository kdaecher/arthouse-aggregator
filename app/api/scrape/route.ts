import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

import getData from '../getData';

export const dynamic = 'force-dynamic'; 

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Env variables not found' }, { status: 500 });
  }
  
  const supabase = createClient(supabaseUrl, supabaseKey);

  let showtimes;
  
  try {
    showtimes = await getData();
  } catch {
    return NextResponse.json({ error: 'Failed to fetch showtime data' }, { status: 500 });
  }
  
  const { error: deleteError } = await supabase
    .from('showtimes')
    .delete()
    .neq('day', 0);
    
  if (deleteError) {
    return NextResponse.json({ error: deleteError }, { status: 500 } );
  }
  
  const { data, error: insertError } = await supabase
    .from('showtimes')
    .insert(showtimes)
    .select();

  return insertError ?
    NextResponse.json({ error: insertError }, { status: 500 }) :
    NextResponse.json(data);
}

export const runtime = 'edge';
