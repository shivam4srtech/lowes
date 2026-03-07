import Link from "next/link";

// 1. Fetching function (Runs on the server)
async function getCategories() {
  try {
    const res = await fetch('https://admin.scoopcost.com/categories/', {
      // Revalidate every hour to keep data fresh without hitting the API on every click
      next: { revalidate: 3600 }, 
    });

    if (!res.ok) {
      console.error("Failed to fetch categories");
      return [];
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export default async function Page() {
  const categories = await getCategories();

  // 2. Logic to group categories by their first letter using the 'title' property
  const grouped = categories.reduce((acc, cat) => {
    // Safety check in case a category somehow lacks a title
    if (!cat.title) return acc; 

    const char = cat.title.charAt(0).toUpperCase();
    if (!acc[char]) acc[char] = [];
    acc[char].push(cat);
    return acc;
  }, {});

  // Sort letters alphabetically
  const alphabet = Object.keys(grouped).sort();

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-2 md:px-10 font-sans">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-8 md:p-12">
        
        {/* Breadcrumb Header */}
        <nav className="flex items-center text-sm mb-10 text-gray-500 font-medium">
          <Link href="/" className="hover:text-blue-600 cursor-pointer">Home</Link>
          <span className="mx-3 text-gray-300">/</span>
          <span className="text-black font-bold">Product Categories</span>
        </nav>

        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Product Categories</h1>
        <p className="text-slate-500 mb-8">Here is the list of our all partners</p>

        {/* Alphabet Quick Links */}
        <div className="flex flex-wrap gap-x-5 gap-y-3 mb-6">
          {alphabet.map((letter) => (
            <Link
              key={letter} 
              href={`#${letter}`} 
              className="text-blue-600 font-bold text-lg hover:underline transition-all"
            >
              {letter}
            </Link>
          ))}
        </div>

        <hr className="border-t border-dashed border-gray-300 mb-12" />

        {/* Categories Sections */}
        <div className="space-y-12">
          {alphabet.map((letter) => (
            <div key={letter} id={letter} className="relative mb-3">
              <section className="flex flex-col md:flex-row gap-3 md:gap-6">
                
                {/* Blue Badge Letter Indicator */}
                <div className="flex-shrink-0">
                  <div className="bg-[#0047FF] text-white w-24 h-11 flex items-center justify-center rounded-md font-bold text-xl shadow-md">
                    {letter}
                  </div>
                </div>

                {/* Responsive Grid for Category Titles */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-16 w-full pt-1">
                  {grouped[letter]
                    // Sort categories alphabetically within their letter group
                    .sort((a, b) => a.title.localeCompare(b.title))
                    .map((cat) => (
                      <Link
                        key={cat.id}
                        href={`/categories/${cat.slug}`} // Optional: route to the specific category page
                        className="text-[17px] font-medium text-slate-800 hover:text-blue-600 transition-colors cursor-pointer block"
                      >
                        {cat.title}
                      </Link>
                    ))}
                </div>
              </section>
              
              {/* Dashed Separator */}
              <hr className="border-t border-dashed border-gray-300 mt-12" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}