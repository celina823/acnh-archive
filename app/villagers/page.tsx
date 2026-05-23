import { getVillagers } from "@/lib/api/villagers";

export default async function VillagersPage() {
  const villagers = await getVillagers();
  return (
    <main>
      <h1>주민 목록</h1>

      {villagers.map((villager) => (
        <div key={villager.id}>
          <img src={villager.image_url} alt={villager.name} width={100} />

          <p>{villager.name}</p>
          <p>{villager.personality}</p>
        </div>
      ))}
    </main>
  );
}
