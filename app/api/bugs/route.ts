import { NextResponse } from "next/server";
import { getBugsPage } from "@/lib/api/bugs";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const cursor = url.searchParams.get("cursor") ?? null;
    const limit = Number(url.searchParams.get("limit") ?? "12");
    const { bugs, nextCursor } = await getBugsPage(cursor, limit);
    return NextResponse.json({ items: bugs, nextCursor });
  } catch {
    return NextResponse.json(
      { message: "곤충 데이터를 불러오지 못했습니다." },
      { status: 502 },
    );
  }
}
