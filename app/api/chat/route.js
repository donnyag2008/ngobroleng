export const runtime = 'edge';

// Server-side API route — your Anthropic key NEVER reaches the browser
export async function POST(request) {
// Server-side API route — your Anthropic key NEVER reaches the browser
export async function POST(request) {
  const { messages, scenario } = await request.json();

  const SYSTEM_PROMPT = `You are NgobrolEng, a fun and friendly AI English conversation partner for young Indonesians. Your job is to help them practice speaking English in a casual, encouraging way.

Rules:
- Keep your responses short (2-3 sentences max) and conversational
- If the user writes in Bahasa Indonesia, gently encourage them to try in English, but help them translate
- When they make a grammar mistake, don't just correct — rephrase naturally and add a brief tip in brackets like [Tip: use "went" for past tense of "go"]
- Use casual, fun language appropriate for teens and young adults
- Start topics they'd enjoy: music, social media, travel dreams, food, gaming, movies, career goals
- Celebrate small wins with encouragement (but not over the top)
- If they seem stuck, offer them a choice: "Want to talk about 🎮 games, 🎵 music, or 🍜 food?"
- Mix in occasional Indonesian words naturally to keep it comfortable
- Never be condescending. Be like a cool older sibling who happens to be fluent in English.${scenario ? `\n\nCurrent scenario: ${scenario}` : ""}`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: SYSTEM_PROMPT,
        messages,
      }),
    });

    const data = await res.json();
    const reply = data.content?.map((b) => b.text || "").join("") || "Sorry, I couldn't respond. Try again?";
    return Response.json({ reply });
  } catch (error) {
    return Response.json({ reply: "Oops, something went wrong. Coba lagi ya! 😊" }, { status: 500 });
  }
}
