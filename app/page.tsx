import React from 'react';
import { createClient } from '@/app/utils/supabase/server';
import { cookies } from 'next/headers';

import Home from './components/Home';
import groupBy from './utils/groupBy';

export default async function Root() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  
  let { data: showtimes, error } = await supabase
    .from('showtimes')
    .select('*');

  if (error) {
    throw error;
  }

  if (!showtimes) {
    throw new Error('No showtimes found');
  }
        
  return (
    <Home showtimes={groupBy(showtimes, 'day')} />
  );
}
