import express, { Request, Response } from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient && process.env.GEMINI_API_KEY) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ status: "ok", app: "FinMate", aiName: "Fin AI", aiEnabled: Boolean(process.env.GEMINI_API_KEY) });
});

// Helper for calling Gemini with model fallback
async function generateWithFallback(prompt: string, systemInstruction: string, jsonMode = true) {
  const ai = getGeminiClient();
  if (!ai) return null;

  const modelsToTry = ["gemini-2.5-flash", "gemini-2.5-flash-lite", "gemini-3.7-flash"];
  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction,
          ...(jsonMode ? { responseMimeType: "application/json" } : {}),
        },
      });
      if (response.text) {
        return response.text;
      }
    } catch (err) {
      lastError = err;
      console.warn(`Model ${model} failed, trying next fallback...`, err);
    }
  }

  throw lastError || new Error("All Gemini models unavailable");
}

// Helper: Intelligent deterministic chat reply generator for offline/fallback
function generateIntelligentChatReply(message: string, profile: any): string {
  const sym = profile?.currencySymbol || "₹";
  const income = profile?.monthlyIncome || 95000;
  const expenses = profile?.monthlyExpenses || 42000;
  const emi = profile?.monthlyEmi || 22000;
  const savings = profile?.savings || 220000;
  const debt = profile?.totalDebt || 480000;
  const cibil = profile?.creditScore || 765;
  const dti = Math.round(((expenses + emi) / Math.max(1, income)) * 100);
  const runway = (savings / Math.max(1, expenses + emi)).toFixed(1);
  const surplus = Math.max(0, income - expenses - emi);

  const lower = message.toLowerCase();

  if (lower.includes("health") || lower.includes("score") || lower.includes("summarize") || lower.includes("summary")) {
    return `### 📊 Fin AI Financial Health Summary\n\n` +
      `Here is your financial snapshot as modeled in **FinMate**:\n\n` +
      `• **Monthly Inflow:** ${sym}${income.toLocaleString()}\n` +
      `• **Fixed Outflows (Living + EMIs):** ${sym}${(expenses + emi).toLocaleString()} (${dti}% of income)\n` +
      `• **Net Monthly Discretionary Surplus:** ${sym}${surplus.toLocaleString()}\n` +
      `• **Liquid Emergency Runway:** **${runway} months** (${sym}${savings.toLocaleString()})\n` +
      `• **Credit / CIBIL Standing:** **${cibil}** (Solid tier)\n\n` +
      `**Fin AI Recommendation:** Your cashflow surplus is healthy. Focus on maintaining a 6-month buffer (${sym}${((expenses + emi) * 6).toLocaleString()}) before taking on additional high-ticket commitments.`;
  }

  if (lower.includes("afford") || lower.includes("buy") || lower.includes("laptop") || lower.includes("car") || lower.includes("phone") || lower.includes("purchase")) {
    const numMatch = message.match(/\d+[\d,]*/);
    const amount = numMatch ? parseInt(numMatch[0].replace(/,/g, ""), 10) : 50000;
    const canAffordCash = savings - amount >= (expenses + emi) * 3;
    
    return `### 💡 Fin AI Affordability Assessment\n\n` +
      `Evaluating purchase of **${sym}${amount.toLocaleString()}** against your current FinMate profile:\n\n` +
      `• **Current Savings:** ${sym}${savings.toLocaleString()}\n` +
      `• **Post-Purchase Savings:** ${sym}${Math.max(0, savings - amount).toLocaleString()}\n` +
      `• **Post-Purchase Runway:** **${(Math.max(0, savings - amount) / Math.max(1, expenses + emi)).toFixed(1)} months** (Target: ≥3–6 mo)\n` +
      `• **Monthly Buffer Impact:** Zero EMI impact if purchased in full cash.\n\n` +
      (canAffordCash
        ? `✅ **Verdict: Safe to Purchase.** Your liquid reserves comfortably protect your living baseline without triggering cashflow stress.`
        : `⚠️ **Verdict: Caution Advised.** Spending ${sym}${amount.toLocaleString()} would deplete your emergency cushion below the recommended safety threshold. Consider deferring by 60 days or exploring a zero-cost 3-month plan.`);
  }

  if (lower.includes("loan") || lower.includes("borrow") || lower.includes("emi") || lower.includes("credit card")) {
    return `### 💳 Fin AI Debt & Credit Analysis\n\n` +
      `• **Current Total Debt:** ${sym}${debt.toLocaleString()}\n` +
      `• **Existing Monthly EMIs:** ${sym}${emi.toLocaleString()} (${Math.round((emi / income) * 100)}% of monthly income)\n` +
      `• **CIBIL Score:** ${cibil} (Low inquiry risk)\n\n` +
      `**Fin AI Strategy:** Keep your total EMI burden below 35-40% of income. You currently have room for an additional monthly payment of up to ${sym}${Math.max(0, Math.round(income * 0.35 - emi)).toLocaleString()} without straining your credit profile.`;
  }

  if (lower.includes("buffer") || lower.includes("emergency") || lower.includes("save") || lower.includes("invest") || lower.includes("sip")) {
    return `### 🎯 Fin AI Emergency & Savings Optimization\n\n` +
      `• **Current Emergency Cushion:** ${sym}${savings.toLocaleString()} (~${runway} months of expenses)\n` +
      `• **Recommended 6-Month Target:** ${sym}${((expenses + emi) * 6).toLocaleString()}\n` +
      `• **Monthly Savings Capacity:** ${sym}${surplus.toLocaleString()}\n\n` +
      `**Next Steps:**\n` +
      `1. Allocate **${sym}${Math.round(surplus * 0.5).toLocaleString()}/month** to liquid high-yield savings to close the buffer gap in ~${Math.max(1, Math.ceil((((expenses + emi) * 6) - savings) / Math.max(1, surplus * 0.5)))} months.\n` +
      `2. Channel remaining **${sym}${Math.round(surplus * 0.5).toLocaleString()}** into diversified mutual fund SIPs or retirement milestones.`;
  }

  return `### 🤖 Fin AI Intelligence Note\n\n` +
    `Analyzing **"${message}"** for your FinMate profile:\n\n` +
    `• **Monthly Income:** ${sym}${income.toLocaleString()}\n` +
    `• **Available Monthly Surplus:** ${sym}${surplus.toLocaleString()}\n` +
    `• **Liquid Runway:** ${runway} months\n` +
    `• **Debt-to-Income:** ${dti}%\n\n` +
    `**Strategic Guidance:** Every financial decision should preserve at least 3 to 6 months of mandatory living expenses while balancing debt amortization and high-return milestones. Feel free to ask specific questions like *"Can I afford a ${sym}80,000 purchase?"* or *"How to optimize my monthly investments?"*.`;
}

// AI Decision Engine API
app.post("/api/gemini/decision", async (req: Request, res: Response) => {
  try {
    const { query, profile } = req.body;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(200).json({ fallback: true });
    }

    const systemInstruction = `You are Fin AI, the intelligent core of FinMate (a personal financial decision engine).
Analyze the user's financial profile and answer their specific financial question or decision scenario.
Analyze their income, monthly expenses, existing EMIs, savings/emergency fund, credit utilization, and financial goals.
Provide an objective, mathematically grounded, and actionable financial assessment in structured JSON format.

JSON Schema:
{
  "affordabilityScore": number (0 to 100),
  "recommendation": string (Clear 1-sentence verdict),
  "verdictType": "safe" | "caution" | "risky" | "critical",
  "confidenceScore": number (0 to 100),
  "positiveFactors": [string],
  "riskFactors": [string],
  "financialImpact": {
    "monthlyDiscretionaryImpact": string,
    "emergencyRunwayImpact": string,
    "dtiChange": string,
    "goalDelayEstimate": string
  },
  "suggestedActions": [string],
  "detailedReasoning": string
}`;

    const prompt = `User Query: "${query}"

User Financial Profile:
${JSON.stringify(profile, null, 2)}

Provide a strict JSON response evaluating this query against the user's profile.`;

    try {
      const responseText = await generateWithFallback(prompt, systemInstruction, true);
      if (responseText) {
        const parsed = JSON.parse(responseText);
        return res.json({ success: true, data: parsed });
      }
    } catch (apiErr) {
      console.warn("Gemini API error in decision route, returning fallback signal:", apiErr);
      return res.json({ fallback: true, message: "AI high demand, local engine fallback active" });
    }

    return res.json({ fallback: true });
  } catch (error: any) {
    console.error("AI Decision Error:", error);
    return res.json({ fallback: true, error: error.message || "Failed to generate decision" });
  }
});

// Before You Buy Analysis API
app.post("/api/gemini/buy-analysis", async (req: Request, res: Response) => {
  try {
    const { item, price, paymentMode, profile } = req.body;

    if (!price || !profile) {
      return res.status(400).json({ error: "Price and profile are required" });
    }

    const ai = getGeminiClient();
    if (!ai) {
      return res.status(200).json({ fallback: true });
    }

    const systemInstruction = `You are Fin AI, the 'Before You Buy' decision analyzer for FinMate.
Evaluate the affordability, risk, and impact of buying "${item || "an item"}" costing ${profile.currencySymbol || "₹"}${price} via payment mode: ${paymentMode || "Full Cash"}.
Analyze user income, expenses, liquid savings, EMIs, emergency runway (months), and active goals.

Return strict JSON:
{
  "affordabilityScore": number (0-100),
  "timingRecommendation": string,
  "timingStatus": "optimal" | "manageable_with_delay" | "stretch" | "critical",
  "whyRecommendation": string,
  "financialImpact": {
    "runwayBefore": string,
    "runwayAfter": string,
    "monthlyBufferChange": string,
    "impactOnGoals": string
  },
  "saferPurchaseChecklist": [string],
  "positiveSignals": [string],
  "riskSignals": [string]
}`;

    const prompt = `Item: ${item || "Unspecified"}
Price: ${price}
Payment Mode: ${paymentMode}
Profile: ${JSON.stringify(profile, null, 2)}`;

    try {
      const responseText = await generateWithFallback(prompt, systemInstruction, true);
      if (responseText) {
        const parsed = JSON.parse(responseText);
        return res.json({ success: true, data: parsed });
      }
    } catch (apiErr) {
      console.warn("Gemini API error in buy-analysis, returning fallback signal:", apiErr);
      return res.json({ fallback: true, message: "AI high demand, local engine fallback active" });
    }

    return res.json({ fallback: true });
  } catch (error: any) {
    console.error("Buy Analysis Error:", error);
    return res.json({ fallback: true, error: error.message || "Failed to analyze purchase" });
  }
});

// Financial AI Chat Assistant API (Fin AI)
app.post("/api/gemini/chat", async (req: Request, res: Response) => {
  try {
    const { message, profile, conversationHistory } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const ai = getGeminiClient();
    if (ai) {
      const sym = profile?.currencySymbol || "₹";
      const systemInstruction = `You are Fin AI, the intelligent personal financial strategist for the FinMate platform.
You are objective, friendly, financially astute, and direct. You analyze the user's specific financial profile:
User Profile:
- Monthly Income: ${sym}${profile?.monthlyIncome || 95000}
- Monthly Living Expenses: ${sym}${profile?.monthlyExpenses || 42000}
- Total Savings & Liquid Funds: ${sym}${profile?.savings || 220000}
- Total Outstanding Debt: ${sym}${profile?.totalDebt || 480000}
- Monthly EMI Burden: ${sym}${profile?.monthlyEmi || 22000}
- Credit / CIBIL Score: ${profile?.creditScore || 765}
- Credit Utilization: ${profile?.creditUtilization || 24}%
- Emergency Runway: ${((profile?.savings || 220000) / Math.max(1, (profile?.monthlyExpenses || 42000) + (profile?.monthlyEmi || 22000))).toFixed(1)} months

Provide clear, structured financial advice using markdown. Highlight numbers, positive factors, risks, and next steps.`;

      let prompt = `User Question: "${message}"`;
      if (conversationHistory && Array.isArray(conversationHistory) && conversationHistory.length > 0) {
        const historyText = conversationHistory
          .map((m: any) => `${m.sender === "user" ? "User" : "Fin AI"}: ${m.text}`)
          .join("\n");
        prompt = `Recent Conversation:\n${historyText}\n\nUser Question: "${message}"`;
      }

      try {
        const responseText = await generateWithFallback(prompt, systemInstruction, false);
        if (responseText && responseText.trim().length > 0) {
          return res.json({ reply: responseText.trim() });
        }
      } catch (apiErr) {
        console.warn("Gemini chat API error, generating intelligent local reply:", apiErr);
      }
    }

    // High quality intelligent response generator (guaranteed to succeed 100% of the time)
    const localReply = generateIntelligentChatReply(message, profile);
    return res.json({ reply: localReply });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    const fallbackReply = generateIntelligentChatReply(req.body?.message || "help", req.body?.profile || {});
    return res.json({ reply: fallbackReply });
  }
});

// Vite Middleware integration for Full-Stack React
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`FinMate server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();

