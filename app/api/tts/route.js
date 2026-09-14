export const runtime = 'edge';

export async function POST(request) {
  return Response.json({ fallback: true }, { status: 200 });
}
