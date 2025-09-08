// src/utils/referral.js
export const rolePrefix = { admin: "ADM", vendor: "VEN", mentor: "MNT", user: "USR" };

export function randomCode(len = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export function makeReferralCode(role) {
  const prefix = rolePrefix[role] || "GEN";
  return `${prefix}-${randomCode()}`;
}

export function roleFromCode(code = "") {
  if (!code) return null;
  const prefix = code.split("-")[0];
  const entry = Object.entries(rolePrefix).find(([, p]) => p === prefix);
  return entry ? entry[0] : null;
}
