import FishInfiniteList from "@/components/FishInfiniteList";

export default function FishPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 text-slate-900">
      <div className="mx-auto max-w-6xl pt-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              ACNH Catalog
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              물고기 목록
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              물고기의 출현 장소와 시기, 날씨, 판매 가격을 카드로 확인할 수
              있습니다.
            </p>
          </div>
        </div>
        <FishInfiniteList />
      </div>
    </main>
  );
}
