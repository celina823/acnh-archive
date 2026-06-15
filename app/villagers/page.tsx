import VillagersInfiniteList from "@/components/VillagersInfiniteList";

export default function VillagersPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl pt-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-slate-500">
              모여봐요 동물의 숲
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              주민 목록
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              이미지의 카드 레이아웃을 참고해 주민 정보를 카드 형태로 보여줍니다.
              아래로 스크롤하면 자동으로 10개씩 더 불러옵니다.
            </p>
          </div>
        </div>
        <VillagersInfiniteList />
      </div>
    </main>
  );
}
