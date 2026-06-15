import BugsInfiniteList from "@/components/BugsInfiniteList";

export default function BugsPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl pt-10">
        <p className="text-sm uppercase tracking-[0.3em] text-emerald-700">ACNH Catalog</p>
        <h1 className="mt-2 text-3xl font-semibold">곤충 목록</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          곤충의 출현 장소와 시기, 날씨, 판매 가격을 카드로 확인할 수 있습니다.
        </p>
        <BugsInfiniteList />
      </div>
    </main>
  );
}
