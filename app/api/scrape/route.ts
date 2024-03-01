import getData from '../getData';

export const dynamic = 'force-dynamic'; // static by default, unless reading the request
 
export async function GET(request: Request) {
  return new Response(JSON.stringify(await getData()));
}

export const runtime = 'edge';
