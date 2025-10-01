import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../data/scholarships.json");

// Get all scholarships
export const getScholarships = async (req, res) => {
  try {
    const raw = fs.readFileSync(dataPath);
    const scholarships = JSON.parse(raw);

    const { country, level, field } = req.query;
    let filtered = scholarships;

    if (country) {
      filtered = filtered.filter(s => s.country.toLowerCase().includes(country.toLowerCase()));
    }
    if (level) {
      filtered = filtered.filter(s => s.level.toLowerCase().includes(level.toLowerCase()));
    }
    if (field) {
      filtered = filtered.filter(s => s.field.toLowerCase().includes(field.toLowerCase()));
    }

    res.json(filtered);
  } catch (e) {
    res.status(500).json({ message: "Failed to fetch scholarships", error: e.message });
  }
};
