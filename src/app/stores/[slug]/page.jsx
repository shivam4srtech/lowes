import { notFound } from "next/navigation";
import { cache } from "react";
import Link from "next/link";
import Coupons from '@/components/Coupons';
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
        <div className="bg-gray-100 min-h-screen py-8">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* LEFT SIDEBAR */}
            <aside className="space-y-6">
              <div className="bg-white rounded-2xl shadow p-6 text-center">
                <div className="w-32 h-32 mx-auto bg-gray-100 rounded-xl flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Store Logo</span>
                </div>
                <h2 className="mt-4 text-lg font-semibold">{store.title}</h2>
              </div>

              <div className="bg-white rounded-2xl shadow p-6 space-y-4 text-sm">
                <div className="flex justify-between">
                  <span>Total Offers</span>
                  <span className="font-semibold">11</span>
                </div>

                <div className="flex justify-between items-center">
                  <span>Coupon Success</span>
                  <span className="bg-green-600 text-white text-xs px-3 py-1 rounded-lg">
                    Very High
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Verified Codes</span>
                  <span className="font-semibold">11</span>
                </div>

                <div>
                  <span className="block text-gray-500">Best Offer</span>
                  <span className="font-semibold">
                    25% Off on Your Purchase
                  </span>
                </div>
              </div>
            </aside>

            {/* RIGHT CONTENT */}
            <main className="lg:col-span-3 space-y-6">

              {/* Category */}
              <Link href={`category/${store.category[0]?.slug}`} title={store.category[0]?.title} className="inline-block bg-blue-800 text-white text-xs px-3 py-1 rounded-md">
                {store.category[0]?.title}
              </Link>

              {/* Title */}
              <h1 className="text-3xl font-bold">
                {store.store_h1}
              </h1>

              {/* Tabs */}
              <div className="flex border rounded-xl overflow-hidden bg-white shadow">
                {["All", "Verified", "Codes"].map((tab, i) => (
                  <button
                    key={i}
                    className={`flex-1 py-3 text-sm font-medium ${
                      i === 0
                        ? "bg-blue-900 text-white"
                        : "text-blue-900 hover:bg-gray-50"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="listcoupons">
                   <Coupons 
                      coupons={store.coupon_set} 
                      storeSlug={store.slug} 
                      isSubdomain={store.subdomain}
                      urlPrefix={store.url_suffix}
                      affiliateUrl={store.affiliate_url}
                      storeName ={store.title}
                   />
              </div>
            </main>
          </div>
        </div>
       </>
  );
}

