import getData from '../getData';

export const dynamic = 'force-dynamic'; 

export async function GET() {
  return new Response(JSON.stringify(await getData()));
}

export const runtime = 'edge';
