import { NextResponse } from "next/server";
import { getFishPage } from "@/lib/api/fish";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const cursor = url.searchParams.get("cursor") ?? null;
    const limit = Number(url.searchParams.get("limit") ?? "12");

    const { fish, nextCursor } = await getFishPage(cursor, limit);
    return NextResponse.json({ items: fish, nextCursor });
  } catch {
    return NextResponse.json(
      { message: "물고기 데이터를 불러오지 못했습니다." },
      { status: 502 },
    );
  }
}
