export default function FishPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-200 via-purple-200 to-blue-200 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-purple-800 mb-4">물고기</h1>
        <p className="text-purple-700 mb-8">
          동물의 숲에서 찾을 수 있는 물고기들입니다.
        </p>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <p className="text-gray-600">물고기 정보가 준비 중입니다.</p>
        </div>
      </div>
    </main>
  );
}
