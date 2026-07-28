export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { ensurePlatformReady } = await import("./lib/bootstrap");
    await ensurePlatformReady();
  }
}
