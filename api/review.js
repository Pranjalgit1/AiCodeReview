module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const { code } = req.body;

  if (!code || typeof code !== "string" || code.trim().length === 0) {
    return res.status(400).json({ error: "No code provided." });
  }

  try {
    const messages = [
      {
        role: "system",
        content:
          "Act as a senior software engineer. Review the following code. Identify bugs, inefficiencies, and bad practices. Suggest improvements and rate the code quality out of 10.",
      },
      { role: "user", content: code },
    ];

    const response = await fetch("https://text.pollinations.ai/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, model: "openai", seed: 42 }),
    });

    if (!response.ok) {
      throw new Error(`Pollinations error: ${response.status}`);
    }

    const review = await response.text();
    res.json({ review });
  } catch (err) {
    console.error("AI error:", err.message);
    res.status(500).json({ error: "Failed to get review from AI." });
  }
};
