import Link from "next/link";

export default function Home() {
  const collection = [
    {
      title: "화석",
      description: "섬에서 발견되는 고대 생물의 흔적",
      icon: "🦕",
      href: "/catalog/fossils",
      color: "from-blue-300 to-blue-500",
    },
    {
      title: "미술품",
      description: "섬에 숨겨진 예술 작품들",
      icon: "🎨",
      href: "/catalog/art",
      color: "from-green-300 to-green-500",
    },
    {
      title: "물고기",
      description: "섬 주변에서 낚을 수 있는 다양한 어종",
      icon: "🐟",
      href: "/catalog/fish",
      color: "from-pink-300 to-pink-500",
    },
    {
      title: "해산물",
      description: "섬에서 채집할 수 있는 다양한 해산물",
      icon: "🦀",
      href: "/catalog/seacreatures",
      color: "from-yellow-300 to-yellow-500",
    },
    {
      title: "곤충",
      description: "섬에서 채집할 수 있는 다양한 곤충",
      icon: "🦋",
      href: "/catalog/bugs",
      color: "from-purple-300 to-purple-500",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-200 via-purple-200 to-blue-200">
      {/* 히어로 섹션 */}
      <section className="pt-20 pb-16 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-purple-800 mb-4">
          ACNH Archive
        </h1>
        <p className="text-xl text-purple-700 max-w-2xl mx-auto">
          모여봐요 동물의 숲의 모든 것을 검색하고 기록하세요
        </p>
      </section>

      {/* 도감 섹션 */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-purple-800 mb-12">
            도감 탐색하기
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {collection.map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className={`bg-gradient-to-br ${item.color} rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all cursor-pointer h-full flex flex-col items-center justify-center text-center`}
                >
                  <div className="text-5xl mb-4">{item.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-white text-sm opacity-90">
                    {item.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* 오늘은 어떤 이벤트가 있는지 알려주는 섹션 */}
      {/* 푸터 섹션 */}
      <footer className="py-16 px-4 bg-white/20 backdrop-blur-sm mt-12">
        <p className="max-w-6xl mx-auto text-center text-purple-700 max-w-2xl mx-auto">
          © 2026 ACNH Archive · Made by 세정
        </p>
      </footer>
    </main>
  );
}
