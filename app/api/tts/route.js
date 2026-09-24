import { checkLimits } from '../../../lib/limits';

export const runtime = 'edge';

// ─── ElevenLabs cost protection ───
var TTS_PER_DEVICE = 15;     // ElevenLabs plays per device per day
var TTS_PER_IP = 150;        // ceiling per IP (school WiFi = many devices)
var MAX_TTS_CHARS = 450;     // longer replies (test feedback) use browser voice
var RESERVE_CREDITS = 3000;  // never spend the last few thousand credits

// Pacing: ask ElevenLabs how many credits are left and how long until the
// monthly reset. If we are spending faster than an even pace, switch to the
// browser voice until we are back on schedule. No database needed.
var quotaCache = { at: 0, ok: true };

async function quotaAllows() {
  var now = Date.now();
  if (now - quotaCache.at < 60 * 1000) return quotaCache.ok; // check at most once a minute
  try {
    var res = await fetch('https://api.elevenlabs.io/v1/user/subscription', {
      headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY },
    });
    if (!res.ok) throw new Error('subscription ' + res.status);
    var sub = await res.json();
    var limit = sub.character_limit || 0;
    var remaining = limit - (sub.character_count || 0);
    var resetMs = (sub.next_character_count_reset_unix || 0) * 1000;
    var period = 30 * 24 * 3600 * 1000;
    var fractionLeft = Math.min(1, Math.max(0, (resetMs - now) / period));
    // the credits we should still have at this point in the month (10% slack)
    var onPace = limit * fractionLeft * 0.9;
    var ok = remaining > RESERVE_CREDITS && remaining >= onPace;
    quotaCache = { at: now, ok: ok };
    return ok;
  } catch (e) {
    // can't read the quota (e.g. key lacks User read permission): rely on the
    // per-device limits only, and retry in a minute
    quotaCache = { at: now, ok: true };
    return true;
  }
}

export async function POST(request) {
  var body;
  try { body = await request.json(); } catch (e) { return Response.json({ fallback: true }); }
  var text = (body.text || '').trim();
  var voiceId = body.voiceId || '21m00Tcm4TlvDq8ikWAM';

  if (!process.env.ELEVENLABS_API_KEY || !text || text.length > MAX_TTS_CHARS) {
    return Response.json({ fallback: true });
  }
  if (!(await quotaAllows())) {
    return Response.json({ fallback: true });
  }
  // count against the quota only when we are actually going to call ElevenLabs
  if (!checkLimits('tts', request, TTS_PER_DEVICE, TTS_PER_IP)) {
    return Response.json({ fallback: true });
  }

  try {
    var res = await fetch('https://api.elevenlabs.io/v1/text-to-speech/' + voiceId, {
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
    });
    if (!res.ok) return Response.json({ fallback: true });

    var audioBuffer = await res.arrayBuffer();
    return new Response(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (e) {
    return Response.json({ fallback: true });
  }
}
