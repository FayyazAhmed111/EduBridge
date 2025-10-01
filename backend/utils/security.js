import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import RefreshToken from "../models/RefreshToken.js";

export const makeAccessToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES || "15m",
  });

export const makeRefreshToken = () => crypto.randomBytes(48).toString("hex");
export const hash = (v) => bcrypt.hash(v, 10);
export const compare = (plain, hashed) => bcrypt.compare(plain, hashed);

export const storeRefreshToken = async ({ userId, token, userAgent, ip }) => {
  await RefreshToken.create({
    userId,
    tokenHash: await hash(token),
    userAgent,
    ip,
    expiresAt: new Date(Date.now() + ms(process.env.REFRESH_TOKEN_EXPIRES || "30d")),
  });
};

export const verifyRefresh = async ({ userId, token }) => {
  const tokens = await RefreshToken.find({ userId, revokedAt: { $exists: false } }).sort({ createdAt: -1 });
  for (const t of tokens) {
    const ok = await compare(token, t.tokenHash);
    if (ok && (!t.expiresAt || t.expiresAt > new Date())) return t;
  }
  return null;
};

export const revokeRefresh = async (doc) => {
  doc.revokedAt = new Date();
  await doc.save();
};

const map = { m: 60*1000, h: 3600*1000, d: 24*3600*1000 };
function ms(s) {
  const m = /(\d+)([mhd])/.exec(s);
  if (!m) return 30*24*3600*1000;
  return parseInt(m[1],10) * map[m[2]];
}
