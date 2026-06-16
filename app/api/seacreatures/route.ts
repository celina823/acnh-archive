import { NextResponse } from "next/server";
import { getSeaCreaturesPage } from "@/lib/api/seaCreatures";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const cursor = url.searchParams.get("cursor") ?? null;
    const limit = Number(url.searchParams.get("limit") ?? "12");

    const { seaCreatures, nextCursor } = await getSeaCreaturesPage(
      cursor,
      limit,
    );

    return NextResponse.json({ items: seaCreatures, nextCursor });
  } catch {
    return NextResponse.json(
      { message: "해산물 데이터를 불러오지 못했습니다." },
      { status: 502 },
    );
  }
}
