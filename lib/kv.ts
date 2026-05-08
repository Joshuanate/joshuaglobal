import { readFileSync, writeFileSync, mkdirSync } from "fs";
import { join } from "path";

// Local dev: persist to a JSON file so API routes and server components share state.
// Production: uses Vercel KV (Redis).

const DEV_STORE_PATH = join(process.cwd(), ".dev-kv.json");

function readDevStore(): Record<string, unknown> {
  try {
    return JSON.parse(readFileSync(DEV_STORE_PATH, "utf-8"));
  } catch {
    return {};
  }
}

function writeDevStore(store: Record<string, unknown>) {
  writeFileSync(DEV_STORE_PATH, JSON.stringify(store, null, 2), "utf-8");
}

async function getKV() {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    const { kv } = await import("@vercel/kv");
    return kv;
  }
  return null;
}

export async function kvGet<T>(key: string): Promise<T | null> {
  const kv = await getKV();
  if (kv) return kv.get<T>(key);
  return (readDevStore()[key] as T) ?? null;
}

export async function kvSet(key: string, value: unknown): Promise<void> {
  const kv = await getKV();
  if (kv) {
    await kv.set(key, value);
  } else {
    const store = readDevStore();
    store[key] = value;
    writeDevStore(store);
  }
}

export async function kvDel(key: string): Promise<void> {
  const kv = await getKV();
  if (kv) {
    await kv.del(key);
  } else {
    const store = readDevStore();
    delete store[key];
    writeDevStore(store);
  }
}
