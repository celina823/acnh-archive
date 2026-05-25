import { NextResponse } from "next/server";
import { getFurniturePage } from "@/lib/api/furniture";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const cursor = url.searchParams.get("cursor") ?? null;
  const limit = Number(url.searchParams.get("limit") ?? "10");

  const { furniture, nextCursor } = await getFurniturePage(cursor, limit);
  return NextResponse.json({ items: furniture, nextCursor });
}
