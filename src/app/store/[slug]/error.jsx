// app/stores/[slug]/error.jsx

"use client";

export default function Error({ error, reset }) {
  return (
    <div className="text-center py-20">
      <h2 className="text-xl font-bold mb-4">
        Something went wrong!
      </h2>
      <button
        onClick={() => reset()}
        className="bg-black text-white px-4 py-2 rounded"
      >
        Try Again
      </button>
    </div>
  );
}