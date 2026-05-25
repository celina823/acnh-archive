import FurnitureInfiniteList from "@/components/FurnitureInfiniteList";

export default function FurniturePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
            모여봐요 동물의 숲
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            가구 목록
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            아래로 스크롤하면 가구 데이터를 자동으로 더 불러옵니다.
          </p>
        </div>
      </div>
      <FurnitureInfiniteList />
    </main>
  );
}
