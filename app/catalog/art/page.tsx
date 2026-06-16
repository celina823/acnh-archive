import ArtInfiniteList from "@/components/ArtInfiniteList";

export default function ArtPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl pt-10">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          모여봐요 동물의 숲
        </p>
        <h1 className="mt-2 text-3xl font-semibold">미술품 목록</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          미술품의 진품과 가품 정보를 한눈에 확인해보세요.
        </p>
        <ArtInfiniteList />
      </div>
    </main>
  );
}
