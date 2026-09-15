export const runtime = 'edge';

export async function POST(request) {
  var body = await request.json();
  var text = body.text || '';
  var voiceId = body.voiceId || '21m00Tcm4TlvDq8ikWAM';

  if (!process.env.ELEVENLABS_API_KEY || !text) {
    return Response.json({ fallback: true }, { status: 200 });
  }

  try {
    var res = await fetch(
      'https://api.elevenlabs.io/v1/text-to-speech/' + voiceId,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xi-api-key': process.env.ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
        }),
      }
    );

    if (!res.ok) {
      return Response.json({ fallback: true }, { status: 200 });
    }

    var audioBuffer = await res.arrayBuffer();
    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (e) {
    return Response.json({ fallback: true }, { status: 200 });
  }
}
