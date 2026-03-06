import StoreList from "@/components/StoreList";

export const revalidate = 86400; // cache 1 day

async function getStores() {

  const res = await fetch(
    "https://admin.scoopcost.com/stores/",
    {
      headers: {
        "x-api-key": process.env.SECRET_KEY,
      },
      next: { revalidate: 86400 },
    }
  );

  if (!res.ok) return [];

  return res.json();
}

export default async function StoresPage() {

  const stores = await getStores();

  return (
    <div className="max-w-7xl mx-auto px-6 py-4">
      <h1 className="text-3xl font-bold mb-3">
        All Stores
      </h1>

      <StoreList stores={stores} />
    </div>
  );
}