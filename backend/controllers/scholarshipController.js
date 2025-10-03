// backend/controllers/scholarshipController.js
import fs from "fs";
import path from "path";

// --- Helper: Load dummy JSON ---
const loadDummy = () => {
  const p = path.join(process.cwd(), "data", "scholarships.json");
  return JSON.parse(fs.readFileSync(p, "utf-8"));
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
      return res
        .status(403)
        .json({ message: "Suggestions are only for student accounts" });
    }

    const { studentProfile = {} } = user;
    const { level, fieldOfStudy, gpa } = studentProfile;

    if (!level || !fieldOfStudy || !gpa) {
      return res
        .status(400)
        .json({ message: "Incomplete student profile for suggestions" });
    }

    const list = loadDummy();

    const gpaNum = gpa
      ? parseFloat(String(gpa).replace(/[^\d.]/g, ""))
      : null;
    const isHighGPA = gpaNum !== null && gpaNum >= 3.5;

    const filtered = list.filter((s) => {
      // match level
      const okLevel =
        !level ||
        !s.eligibility?.level?.length ||
        s.eligibility.level.includes(level);

      // match field
      const okField =
        !fieldOfStudy ||
        !s.eligibility?.fields?.length ||
        s.eligibility.fields.includes(fieldOfStudy);

      // GPA hint — prefer fully funded for high GPA
      const okGPA =
        !isHighGPA ||
        (s.benefits?.includes("Fully Funded") ||
          s.benefits?.includes("High Merit"));

      return okLevel && okField && okGPA;
    });

    // Boost sorting: Fully funded first, then earlier deadline
    filtered.sort((a, b) => {
      const fa = (a.benefits || []).includes("Fully Funded") ? 1 : 0;
      const fb = (b.benefits || []).includes("Fully Funded") ? 1 : 0;
      const da = a.deadline ? new Date(a.deadline).getTime() : Infinity;
      const db = b.deadline ? new Date(b.deadline).getTime() : Infinity;
      return fb - fa || da - db;
    });

    res.json({ count: filtered.length, items: filtered.slice(0, 30) });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Failed to suggest scholarships", error: e.message });
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
