import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "ss_admin";
const SESSION_MS = 60 * 60 * 24 * 1000; // 24 hours

function getSecret() {
  return process.env.ADMIN_PASSWORD ?? "";
}

export function createSessionToken(): string {
  const expires = String(Date.now() + SESSION_MS);
  const sig = createHmac("sha256", getSecret()).update(expires).digest("hex");
  return `${expires}.${sig}`;
}

export function verifySessionToken(token: string): boolean {
  const secret = getSecret();
  if (!secret) return false;

  const [expires, sig] = token.split(".");
  if (!expires || !sig) return false;
  if (Date.now() > Number(expires)) return false;

  const expected = createHmac("sha256", secret).update(expires).digest("hex");
  try {
    return timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
  } catch {
    return false;
  }
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export { COOKIE_NAME, SESSION_MS };
