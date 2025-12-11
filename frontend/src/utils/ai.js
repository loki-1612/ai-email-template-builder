export async function generateText(prompt) {
  try {
    const response = await fetch("http://localhost:4000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    const data = await response.json();
    return data.text || "No response";
  } catch (error) {
    console.error("Frontend AI Error:", error);
    return "AI Error — Try again";
  }
}
