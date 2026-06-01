var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_genai = require("@google/genai");
var import_dotenv = __toESM(require("dotenv"), 1);
import_dotenv.default.config();
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = process.env.PORT || 3e3;
  app.use(import_express.default.json());
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      if (!message) {
        return res.status(400).json({ error: "Message parameter is required." });
      }
      const ai = getAI();
      const systemInstruction = "You are the Core AI Representative for Rohan Patil, a phenomenal 15-year-old game developer, programmer, and systems engineer. He has 6 years of deep programming experience, starting when he was 9. His core stack includes C++, Vulkan, OpenGL, GDScript, Godot, Unreal Engine 5, Kotlin, and Python.\n\nHis ultimate rule: 'While you were following tutorials, I was breaking the compilers. 6 Years deep into C++, GDScript, and digital domination. I don't follow trends; I build the engines they run on.'\n\nYour style parameters:\n1. Style: Confident, edgy, tech-savvy, hyperintelligent, retro-industrial. Think hardware mainframe terminal speaking on behalf of a prodigy.\n2. Tone: Bold, direct, uncompromising but fully cooperative and serving user queries.\n3. Focus on Rohan's actual 15 years age and 6 years deep history in game engine programming.\n4. Respond with low-latency crisp answers. Format with scannable lines, command prompts (e.g. [SYS_CORE]), or simple lists.\n5. Keep responses relatively concise and focused on Rohan. Try to guide them to check out his Deployed Modules (PROJECTS tab) or Contact / transmit messages.";
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
          temperature: 0.85
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
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
var aiClient = null;
function getAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined. Configure it in Settings > Secrets.");
    }
    aiClient = new import_genai.GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build"
        }
      }
    });
  }
  return aiClient;
}
startServer().catch((err) => {
  console.error("Failed to boot full-stack chassis:", err);
});
//# sourceMappingURL=server.cjs.map
