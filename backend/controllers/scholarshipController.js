// backend/controllers/scholarshipController.js
import axios from "axios";
import fs from "fs";
import path from "path";
import ScholarshipCache from "../models/ScholarshipCache.js";

// --- Helper: Load dummy JSON ---
const loadDummy = () => {
  const filePath = path.join(process.cwd(), "data", "scholarships.json");
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};



// ---------- GET ALL SCHOLARSHIPS ----------
/**
 * @desc Get all available scholarships
 * @route GET /api/scholarships
 * @access Private (any authenticated user)
 */
export const getAllScholarships = async (_req, res) => {
  try {
    const list = loadDummy();
    res.json(list);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Failed to load scholarships", error: e.message });
  }
};

// ---------- GET SUGGESTED SCHOLARSHIPS ----------
/**
 * @desc Get suggested scholarships based on logged-in student's profile
 * @route GET /api/scholarships/suggested
 * @access Private (students only)
 */
export const getSuggestedScholarships = async (req, res) => {
  try {
    const user = req.user;
    if (!user || user.role !== "student") {
      return res.status(403).json({ message: "Suggestions are only for student accounts" });
    }

    const { studentProfile = {} } = user;
    const { level, fieldOfStudy, gpa } = studentProfile;
    if (!level || !fieldOfStudy || !gpa) {
      return res.status(400).json({ message: "Incomplete student profile for suggestions" });
    }

    // ✅ 24h cache check
    const cache = await ScholarshipCache.findOne({
      userId: user._id,
      expiresAt: { $gt: new Date() },
    });
    if (cache) {
      return res.json({
        count: cache.suggestions.length,
        items: cache.suggestions,
        model: cache.model,
        note: "Served from 24-hour cache (no API call)",
        cached: true,
      });
    }

    const list = loadDummy().slice(0, 10); // 🔹 only send 10
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

    // 🔹 compact input for low-token prompt
    const studentData = {
      level,
      fieldOfStudy,
      gpa,
      interests: studentProfile.interests || [],
      careerGoals: studentProfile.careerGoals || "",
    };

    const prompt = `
Student: ${JSON.stringify(studentData)}
Scholarships: ${JSON.stringify(list.slice(0, 10))}
Pick the BEST 3 scholarships from the list based on matching fieldOfStudy, level, and GPA.

Return ONLY valid JSON:
{
  "recommended": [
    {"title": "", "provider": "", "reason": ""}
  ]
}
`;

    let aiResult = null;
    try {
      const { data } = await axios.post(
        url,
        { contents: [{ parts: [{ text: prompt }] }] },
        { headers: { "Content-Type": "application/json", "X-goog-api-key": GEMINI_API_KEY } }
      );

      let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "{}";
      text = text.replace(/```json/gi, "").replace(/```/g, "").trim();
      aiResult = JSON.parse(text);
    } catch (err) {
      console.warn("⚠️ Gemini AI failed:", err?.response?.data || err.message);
      aiResult = null;
    }

    const result =
      aiResult?.recommended?.length > 0
        ? aiResult.recommended
        : list.slice(0, 3).map((s) => ({
            title: s.title || "N/A",
            provider: s.provider || "Unknown",
            reason: "Matched locally (AI unavailable)",
          }));

    await ScholarshipCache.findOneAndUpdate(
      { userId: user._id },
      {
        userId: user._id,
        suggestions: result,
        model: aiResult ? "gemini-2.0-flash" : "fallback-filter",
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
      },
      { upsert: true }
    );

    res.json({
      count: result.length,
      items: result,
      model: aiResult ? "gemini-2.0-flash" : "fallback-filter",
      note: aiResult
        ? "AI-assisted minimal prompt (Gemini Free API)"
        : "Fallback filter result (AI skipped)",
      cached: false,
    });
  } catch (e) {
    console.error("❌ Suggestion route error:", e);
    res.status(500).json({ message: "Failed to suggest scholarships", error: e.message });
  }
};


// ---------- SEARCH SCHOLARSHIPS ----------
/**
 * @desc Search scholarships with query + filters
 * @route GET /api/scholarships/search
 * @access Public
 */
export const searchScholarships = async (req, res) => {
  try {
    const { q = "", level, field, country, funding } = req.query;
    const needle = q.trim().toLowerCase();
    const list = loadDummy();

    const out = list.filter((s) => {
      const hay = `${s.title} ${s.provider} ${s.country} ${(s.tags || []).join(
        " "
      )} ${(s.eligibility?.fields || []).join(" ")}`.toLowerCase();

      const okQ = !needle || hay.includes(needle);
      const okLevel = !level || (s.eligibility?.level || []).includes(level);
      const okField = !field || (s.eligibility?.fields || []).includes(field);
      const okCountry = !country || s.country === country;
      const okFunding =
        !funding || (s.benefits || []).includes(funding);

      return okQ && okLevel && okField && okCountry && okFunding;
    });

    res.json({ count: out.length, items: out.slice(0, 50) });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Search failed", error: e.message });
  }
};
