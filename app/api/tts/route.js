export const runtime = 'edge';

// Server-side API route — your Anthropic key NEVER reaches the browser
export async function POST(request) {

// Server-side TTS route — ElevenLabs key stays on the server
export async function POST(request) {
  const { text, voiceId } = await request.json();

  if (!process.env.ELEVENLABS_API_KEY) {
    return Response.json({ fallback: true }, { status: 200 });
  }

  try {
    const res = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId || "21m00Tcm4TlvDq8ikWAM"}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "xi-api-key": process.env.ELEVENLABS_API_KEY,
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_multilingual_v2",
          voice_settings: { stability: 0.5, similarity_boost: 0.75 },
        }),
      }
    );

    if (!res.ok) {
      return Response.json({ fallback: true }, { status: 200 });
    }

    const audioBuffer = await res.arrayBuffer();
    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch {
    return Response.json({ fallback: true }, { status: 200 });
  }
}
