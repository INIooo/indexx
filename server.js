import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Request parsing
  app.use(express.json());

  // API Route for Chatbot
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message parameter is required." });
      }

      // Lazy load GoogleGenAI client to prevent crash if key is unset
      const ai = getAI();

      // System instruction detailing Rohan's badass persona
      const systemInstruction = 
        "You are the Core AI Representative for Rohan Patil, a phenomenal 15-year-old game developer, " +
        "programmer, and systems engineer. He has 6 years of deep programming experience, starting when he was 9. " +
        "His core stack includes C++, Vulkan, OpenGL, GDScript, Godot, Unreal Engine 5, Kotlin, and Python.\n\n" +
        "His ultimate rule: 'While you were following tutorials, I was breaking the compilers. 6 Years deep into C++, GDScript, and digital domination. I don't follow trends; I build the engines they run on.'\n\n" +
        "Your style parameters:\n" +
        "1. Style: Confident, edgy, tech-savvy, hyperintelligent, retro-industrial. Think hardware mainframe terminal speaking on behalf of a prodigy.\n" +
        "2. Tone: Bold, direct, uncompromising but fully cooperative and serving user queries.\n" +
        "3. Focus on Rohan's actual 15 years age and 6 years deep history in game engine programming.\n" +
        "4. Respond with low-latency crisp answers. Format with scannable lines, command prompts (e.g. [SYS_CORE]), or simple lists.\n" +
        "5. Keep responses relatively concise and focused on Rohan. Try to guide them to check out his Deployed Modules (PROJECTS tab) or Contact / transmit messages.";

      // format contents for Gemini API (reconstructing sequence with history)
      const contentsList = [];
      if (history && Array.isArray(history)) {
        for (const msg of history) {
          contentsList.push({
            role: msg.sender === "user" ? "user" : "model",
            parts: [{ text: msg.text }]
          });
        }
      }
      contentsList.push({
        role: "user",
        parts: [{ text: message }]
      });

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contentsList,
        config: {
          systemInstruction,
          temperature: 0.85,
        }
      });

      const replyText = response.text || "UPLINK ERROR: TRANSACTION COMPLETED WITHOUT TEXT PAYLOAD.";
      res.json({ reply: replyText });
    } catch (error) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ 
        error: error.message || "An error occurred inside the engine compiler core." 
      });
    }
  });

  // Serve static assets from root directory
  const rootPath = process.cwd();
  app.use(express.static(rootPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(rootPath, "index.html"));
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

// Lazy initialization of Gemini client
let aiClient = null;
function getAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Configure it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

startServer().catch((err) => {
  console.error("Failed to boot full-stack chassis:", err);
});
