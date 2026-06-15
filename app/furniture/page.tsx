import FurnitureInfiniteList from "@/components/FurnitureInfiniteList";

export default function FurniturePage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl pt-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              모여봐요 동물의 숲
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              가구 목록
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              다양한 가구 정보를 확인하고, 아래로 스크롤하여 더 많은 가구를
              탐색해보세요.
            </p>
          </div>
        </div>
        <FurnitureInfiniteList />
      </div>
    </main>
  );
}
