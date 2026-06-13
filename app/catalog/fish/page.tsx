import FishInfiniteList from "@/components/FishInfiniteList";

export default function FishPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            ACNH Catalog
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            물고기 목록
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            API에서 받아온 물고기 데이터를 위치, 출현 시간, 판매가와 함께
            카드 형태로 보여줍니다.
          </p>
        </div>
      </div>
      <FishInfiniteList />
    </main>
  );
}
