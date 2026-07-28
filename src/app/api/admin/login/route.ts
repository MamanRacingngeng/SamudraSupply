import { NextResponse } from "next/server";
import { z } from "zod";
import {
  COOKIE_NAME,
  SESSION_MS,
  createSessionToken,
  isAdminAuthenticated,
} from "@/lib/auth";

const loginSchema = z.object({
  password: z.string().min(1),
});

export async function POST(request: Request) {
  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "Admin is not configured. Set ADMIN_PASSWORD in .env" },
      { status: 503 }
    );
  }

  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    if (parsed.data.password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }

    const token = createSessionToken();
    const res = NextResponse.json({ success: true });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: SESSION_MS / 1000,
      path: "/",
    });
    return res;
  } catch {
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function DELETE() {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = NextResponse.json({ success: true });
  res.cookies.delete(COOKIE_NAME);
  return res;
}
