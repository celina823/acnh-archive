export default function SeaCreaturesPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl pt-10">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
          모여봐요 동물의 숲
        </p>
        <h1 className="mt-2 text-3xl font-semibold">해산물 목록</h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
          해산물의 출현 정보와 판매 가격을 한눈에 확인해보세요.
        </p>
        <section className="pb-16 pt-6">
          <div className="rounded-[32px] border border-slate-200 bg-white px-6 py-16 text-center shadow-lg shadow-slate-200/70">
            <p className="text-sm text-slate-500">해산물 정보가 준비 중입니다.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
