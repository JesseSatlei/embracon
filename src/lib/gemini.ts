const API_KEY = process.env.GEMINI_API_KEY;

export async function askGemini(prompt: string) {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          { parts: [{ text: prompt }] },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error("Erro na resposta do Google Gemini");
    }

    const data = await response.json();
    console.log('chegou aq eu esper', data);
    return data?.contents?.[0]?.parts?.[0]?.text || "Erro ao processar resposta";
  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    throw error;
  }
}
