import React from 'react';
import { createClient } from '@supabase/supabase-js';

import Home from './components/Home';
import groupBy from './utils/groupBy';

export const revalidate = 0;

export default async function Root() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    console.error('Env variables not found');
    throw new Error('Env variables not found');
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
        
  return (
    <Home showtimes={groupBy(showtimes, 'day')} />
  );
}
