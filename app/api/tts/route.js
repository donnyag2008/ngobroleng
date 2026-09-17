export const runtime = 'edge';

// Daily TTS rate limit per IP (in-memory, resets on cold start)
var ttsLimitMap = new Map();

function getDayKey() {
  return new Date().toISOString().slice(0, 10);
}

function checkTTSLimit(ip) {
  var key = ip + ':' + getDayKey();
  var count = ttsLimitMap.get(key) || 0;
  ttsLimitMap.forEach(function(v, k) {
    if (k.indexOf(getDayKey()) === -1) ttsLimitMap.delete(k);
  });
  if (count >= 15) return false;
  ttsLimitMap.set(key, count + 1);
  return true;
}

export async function POST(request) {
  var ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

  if (!checkTTSLimit(ip)) {
    return Response.json({ fallback: true }, { status: 200 });
  }

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
          model_id: 'eleven_turbo_v2_5',
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