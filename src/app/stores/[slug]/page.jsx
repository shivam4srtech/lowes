import { notFound } from "next/navigation";
import { cache } from "react";
//ISR 
export const revalidate = 3600; // 1 hour
//Fetch Single Store (STATIC SAFE)
const getStore = cache(async (slug) => {
  const res = await fetch(
    `https://admin.scoopcost.com/stores/${slug}/`,
    {
      headers: {
        "x-api-key": process.env.SECRET_KEY,
      },
      next: { revalidate: 3600 },
    }
  );


  if (!res.ok) return null;
  const store = await res.json();

  console.log("Fetched Store Object:", store); // 👈 appears in TERMINAL
  return store;
});
// Static Slugs
export async function generateStaticParams() {
  const res = await fetch(
    "https://admin.scoopcost.com/stores/slugs/",
    {
      headers: {
        "x-api-key": process.env.SECRET_KEY,
      },
      next: { revalidate: 3600 }, // ✅ small response so safe
    }
  );

  if (!res.ok) return [];

  const stores = await res.json();
  
  
  return stores.map(store => ({
    slug: store.slug,
    
  }));
}
//Metadata
export async function generateMetadata({ params }) {
  const { slug } = await params;

  const store = await getStore(slug);

  if (!store) {
    return {
      title: "Store Not Found",
      description: "Store does not exist",
    };
  }
  const canonical_url = `https://homiy.com/stores/${slug}`;
  return {
    title: store.seo_title,
    description: store.seo_description,
    alternates: {
      canonical: canonical_url,
    },
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
      },
    },
    openGraph: {
      title: store.seo_title,
      description: store.seo_description,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: store.seo_title,
      description: store.seo_description,
    },
  };
}

//Page
export default async function StorePage({ params }) {
  const { slug } = await params; // Next 15 fix

  const store = await getStore(slug);

  if (!store || store.detail) {
    notFound();
  }

  return (
       <>
            {store.title}
       </>
  );
}
