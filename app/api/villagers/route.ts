import { NextResponse } from "next/server";
import { getVillagersPage } from "@/lib/api/villagers";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const cursor = url.searchParams.get("cursor") ?? null;
    const limit = Number(url.searchParams.get("limit") ?? "10");

    const { villagers, nextCursor } = await getVillagersPage(cursor, limit);
    return NextResponse.json({ items: villagers, nextCursor });
  } catch {
    return NextResponse.json(
      { message: "주민 데이터를 불러오지 못했습니다." },
      { status: 502 },
    );
  }
}
