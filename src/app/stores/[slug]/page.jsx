import { notFound } from "next/navigation";
import { cache } from "react";
import moment from 'moment';
import Link from "next/link";
import Coupons from '@/components/Coupons';
import CouponFliter from '@/components/CouponFilter'
import StoreFaqs from '@/components/StoreFaqs'
import "../../css/coupon.css";
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
  //about store
 const storeDescription = store.store_description;
 const paragraphs = storeDescription.split("</p>");
  // best offer
   const bestOffer = store.coupon_set.reduce((best, coupon) => {
    const match = coupon.title.match(/(\d+)% Off/);
    const discount = match ? parseInt(match[1], 10) : 0;
    return discount > best.discount ? { text: coupon.title, discount } : best;
  }, { text: "No Offer", discount: 0 }).text;
  return (
       <>
        <div className="bg-gray-100 min-h-screen py-8">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
            
            {/* LEFT SIDEBAR */}
            <aside className="text-gray-800">
              <div className="bg-white rounded-xl shadow-sm p-3 space-y-5 mb-2">

                {/* Total Offers */}
                <div className="flex justify-between items-start">
                  <div className="flex gap-2 items-center text-[.8rem]">
                    <span>🛍️</span>
                    <span className="font-medium">Total Offers</span>
                  </div>
                  <span className="font-semibold text-[.8rem]">{store.coupon_set.length}</span>
                </div>

                {/* Coupon Success */}
                <div className="flex justify-between items-start text-[.8rem]">
                  <div className="flex gap-2 items-center">
                    <span>✅</span>
                    <span className="font-medium text-[.8rem]">Coupon Success</span>
                  </div>

                  <span className="bg-green-700 text-white text-sm px-3 py-1 rounded-md font-semibold text-[.6rem]">
                    Very High
                  </span>
                </div>

                {/* Verified Coupon Code */}
                <div className="flex justify-between items-start text-[.8rem]">
                  <div className="flex gap-2 items-center">
                    <span>🏷️</span>
                    <span className="font-medium">Verified Coupon Code</span>
                  </div>
                  <span className="font-semibold">{store.coupon_set.length}</span>
                </div>

                {/* Best Offer */}
                <div className="flex justify-between items-start gap-4 text-[.8rem]">
                  <div className="flex gap-2 items-center">
                    <span>🔥</span>
                    <span className="font-medium">Best Offer</span>
                  </div>

                  <p className="text-left text-[.8rem] max-w-[180px]">
                    {bestOffer}
                  </p>
                </div>

                {/* Last Updated */}
                <div className="flex justify-between items-start text-[.8rem]">
                  <div className="flex gap-2 items-center">
                    <span>⏰</span>
                    <span className="font-medium">Last Updated</span>
                  </div>

                  <span>{moment().format("MMMM D, YYYY")}</span>
                </div>

                {/* Littitle Description */}
                <div className="text-[.8rem]">
                  <div dangerouslySetInnerHTML={{ __html: paragraphs[0] + "</p>" }} />
                </div>
              </div>
              {/* contat */}
              <div className="bg-white rounded-xl shadow-sm p-3 space-y-5 mb-2">
                  <h3 className="text-xl font-semibold mb-1">Contact {store.title}</h3>
                  <p className="text-gray-600 text-[.8rem]">{store.contact}</p>
              </div>
            </aside>

            {/* RIGHT CONTENT */}
            <main className="lg:col-span-3 space-y-6">

              {/* Category */}
              <Link href={`category/${store.category[0]?.slug}`} title={store.category[0]?.title} className="inline-block bg-(--primary-color) text-white text-xs px-3 py-1 rounded-md">
                {store.category[0]?.title}
              </Link>

              {/* Title */}
              <h1 className="text-3xl font-bold">
                {store.store_h1}
              </h1>

              {/* Tabs */}
              <CouponFliter coupon_count={store.coupon_set.length}/>

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
              {/* about store */}
              <div className="about_str">
                  <h2 className="text-xl font-semibold">About {store.title}</h2>
                  <div>
                     <div dangerouslySetInnerHTML={{ __html: paragraphs.slice(1).join("</p>") }} />
                  </div>
              </div>
              {/* faqs */}
              <StoreFaqs faqsHtml={store.extra_info} storeName={store.title}  />
            </main>
          </div>
        </div>
       </>
  );
}

