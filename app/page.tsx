import React from 'react';
import { createClient } from '@supabase/supabase-js';

import Home from './components/Home';
import groupBy from './utils/groupBy';

export const revalidate = 0;

export default async function Root() {
  const useApi = process.env.DEV_USE_API === 'true';

  const showtimes = useApi
    ? await fetchShowtimesFromApi()
    : await fetchShowtimesFromDb();
        
  return (
    <Home showtimes={groupBy(showtimes, 'day')} />
  );
}
async function fetchShowtimesFromDb() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Supabase env variables not found');
    throw new Error('Supabase env variables not found');
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  
  let { data: showtimes, error } = await supabase
    .from('showtimes')
    .select('*');

  if (error) {
    console.error(error.message);
    throw error;
  }

  if (!showtimes) {
    console.error(`No showtimes found`);
    throw new Error('No showtimes found');
  }

  return showtimes;
}

async function fetchShowtimesFromApi() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const response = await fetch(`${baseUrl}/api/scrape`, {
    cache: 'no-store'
  });

  if (!response.ok) {
    console.error('Failed to fetch showtimes from scraper API');
    throw new Error('Failed to fetch showtimes from scraper API');
  }

  const showtimes = await response.json();

  if (!showtimes || showtimes.length === 0) {
    console.error(`No showtimes found`);
    throw new Error('No showtimes found');
  }

  return showtimes;
}
