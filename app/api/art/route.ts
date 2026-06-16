import { NextResponse } from "next/server";
import { getArtPage } from "@/lib/api/art";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const cursor = url.searchParams.get("cursor") ?? null;
    const limit = Number(url.searchParams.get("limit") ?? "12");

    const { art, nextCursor } = await getArtPage(cursor, limit);
    return NextResponse.json({ items: art, nextCursor });
  } catch {
    return NextResponse.json(
      { message: "미술품 데이터를 불러오지 못했습니다." },
      { status: 502 },
    );
  }
}
