export const runtime = 'edge';

export async function POST(request) {
  const { messages, scenario } = await request.json();
  var prompt = 'You are NgobrolEng, a fun AI English conversation partner for young Indonesians. Keep responses short (2-3 sentences). If users write in Bahasa, encourage English. Correct grammar gently with tips. Be casual and fun.';
  if (scenario) { prompt = prompt + ' Current scenario: ' + scenario; }
  try {
    var res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
      body: JSON.stringify({ model: 'claude-sonnet-4-6', max_tokens: 1000, system: prompt, messages: messages })
    });
    var data = await res.json();
    var reply = data.content ? data.content.map(function(b) { return b.text || ''; }).join('') : 'Sorry, could not respond.';
    return Response.json({ reply: reply });
  } catch (e) {
    return Response.json({ reply: 'Oops, something went wrong. Coba lagi ya!' }, { status: 500 });
  }
}
