import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check API
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "PrimeEstateJournal", timestamp: new Date().toISOString() });
  });

  // Gemini AI Property Assistant API Route
  app.post("/api/ai/consultant", async (req, res) => {
    try {
      const { query, propertyContext, locationContext } = req.body;
      
      if (!query) {
        return res.status(400).json({ error: "Query is required" });
      }

      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
        // High quality fallback advisor response
        return res.json({
          response: getFallbackAIResponse(query, propertyContext, locationContext),
          source: "knowledge_base"
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const prompt = `You are the lead Legal & Real Estate Investment Consultant for primeestatejournal, Nigeria's premier diaspora-focused property verification platform.
Your job is to provide objective, expert, risk-conscious advice regarding Nigerian property acquisitions, land titles (C of O, Governor's Consent, Excision, Gazette), diaspora legal safety, escrow, and investment yield.

User Question: "${query}"
${propertyContext ? `Property Context: ${JSON.stringify(propertyContext)}` : ''}
${locationContext ? `Location Context: ${locationContext}` : ''}

Provide a clear, authoritative, well-formatted response with actionable steps, legal title breakdown, risk factors, and recommended due diligence. Keep response structured and friendly.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt
      });

      res.json({
        response: response.text,
        source: "gemini-2.5-flash"
      });
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.json({
        response: getFallbackAIResponse(req.body.query, req.body.propertyContext, req.body.locationContext),
        source: "fallback_due_to_error"
      });
    }
  });

  // Verification request endpoint mock store
  app.post("/api/verification/submit", (req, res) => {
    const { propertyTitle, address, documentType, state, contactEmail, contactPhone } = req.body;
    const refCode = "NNV-" + Math.floor(100000 + Math.random() * 900000);
    
    res.json({
      success: true,
      referenceCode: refCode,
      estimatedCompletionDays: 3,
      status: "In Progress (Registry Search Initiated)",
      message: `Verification request ${refCode} submitted successfully for ${propertyTitle || 'External Property'}. Our legal team has initiated the land registry search and surveyor charting.`
    });
  });

  // Vite middleware for development vs static serve for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`PrimeEstateJournal Server running at http://localhost:${PORT}`);
  });
}

function getFallbackAIResponse(query: string, propertyContext?: any, locationContext?: string): string {
  const q = query.toLowerCase();

  if (q.includes("c of o") || q.includes("governors consent") || q.includes("title") || q.includes("document")) {
    return `### Nigerian Property Title Breakdown & Risk Analysis

1. **Certificate of Occupancy (C of O)**
   - **What it means**: Official state grant certifying 99-year land ownership leasehold.
   - **Risk Rating**: Very Low Risk (when verified at Lands Registry).
   - **PrimeEstateJournal Recommendation**: Always run a formal Registry Search to verify it is unencumbered and not pledged as bank collateral.

2. **Governor's Consent**
   - **What it means**: Mandatory state approval required whenever a property with an existing C of O is resold or transferred.
   - **Risk Rating**: Low Risk. Essential for full legal title perfection.

3. **Excision & Gazette**
   - **What it means**: Land released by the state government to indigenous communities, published in the official government gazette.
   - **Risk Rating**: Moderate Risk. Must verify exact survey coordinates (charting) to ensure your parcel falls strictly inside the excised boundary and not within government acquisition.

4. **Deed of Assignment / Purchase Receipt Only**
   - **What it means**: Private agreement between buyer and seller.
   - **Risk Rating**: High Risk unless backed by underlying excision or parent C of O. Requires immediate legal perfection.`;
  }

  if (q.includes("diaspora") || q.includes("london") || q.includes("usa") || q.includes("uk") || q.includes("remote") || q.includes("buy from abroad")) {
    return `### Safe Diaspora Buying Framework (PrimeEstateJournal Protocol)

Buying Nigerian real estate from abroad without risk requires adhering to 4 strict rules:

1. **Independent Legal Title Verification**: Never rely solely on developer/agent-supplied documents. PrimeEstateJournal performs independent search directly at the State Lands Registry and Surveyor General's office.
2. **Drone & Live Video Physical Inspection**: Avoid relying on static photos. Demand live stream walkthroughs and satellite coordinate charting.
3. **Power of Attorney (PoA)**: If appointing a local representative, issue a limited PoA restricted strictly to property inspection and registration—never payment authority.
4. **Milestone Escrow Disbursement**: Funds should be disbursed to developers in verified construction tranches rather than 100% upfront payment.`;
  }

  if (q.includes("epe") || q.includes("lekki") || q.includes("ibeju") || q.includes("abuja") || q.includes("yield") || q.includes("roi")) {
    return `### Investment Growth & Yield Outlook

- **Lekki Phase 1 & Ikoyi (Lagos)**: Prime residential rental yields average **6.5% - 8.5% p.a.** in NGN, with premium short-let USD yield up to **12%**. High liquidity and capital preservation.
- **Ibeju-Lekki / Epe Corridor**: High capital appreciation play (**22% - 30% p.a. average compound growth** driven by Dangote Refinery, Lekki Deep Sea Port, and proposed Lekki Airport).
- **Abuja (Maitama, Guzape, Katampe)**: Strong diplomatic & civil service tenant base. Yields average **7% - 9%**, with capital appreciation steady at **15% p.a.**

*PrimeEstateJournal Tip*: Use our built-in ROI Calculator tab to estimate custom returns based on your budget!`;
  }

  return `### PrimeEstateJournal Legal & Due Diligence Advisory

When acquiring Nigerian real estate, PrimeEstateJournal enforces a 5-Point Safeguard Protocol:
1. **Survey Charting**: Verifying coordinates with the Surveyor General's office to detect government acquisitions or road expansion setbacks.
2. **Registry Search**: Checking for mortgages, court litigation, or family ownership disputes.
3. **KYC & Developer Audit**: Verifying CAC registration, past project execution history, and tax clearance.
4. **Transparent Cost Breakdown**: Standardizing Deed of Assignment (5%), Survey Fee, and Legal Documentation upfront with no surprise extortion fees.
5. **Physical Site Inspection**: On-ground video verification of topography, soil type, and drainage access.

Feel free to request a full **Property Verification Dossier** on any listing or submit an external property for independent audit!`;
}

startServer();
