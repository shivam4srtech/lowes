"use client";

import Link from "next/link";

export default function StoreList({ stores }) {

  const grouped = {};

  stores.forEach(store => {

    let first = store.title.charAt(0).toUpperCase();

    if (!/[A-Z]/.test(first)) {
      first = "0-9";
    }

    if (!grouped[first]) {
      grouped[first] = [];
    }

    grouped[first].push(store);

  });

  const letters = [
    "0-9",
    ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  ];

  return (
    <div className="space-y-12">

      {letters.map(letter => {

        if (!grouped[letter]) return null;

        return (
          <div key={letter} className="mb-3">

            <h2 className="text-xl font-semibold mb-2 border-dashed border-b-[1.5px] pb-3  border-[#7c828f]">
              {letter}
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-3">

              {grouped[letter].map(store => (

                <Link
                  key={store.slug}
                  href={`/store/${store.slug}`}
                  className="text-gray-700 hover:text-blue-600 text-[.9rem]"
                >
                  {store.title}
                </Link>

              ))}

            </div>

          </div>
        );

      })}

    </div>
  );
}