"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

interface Storybook {
  book_id: number;
  title: string;
  book_link: string;
}

const PdfReaderPage = () => {
  const [books, setBooks] = useState<Storybook[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await fetch("http://localhost:5000/storybook");
      const data = await res.json();
      if (data && data.response) {
        setBooks(data.response);
      }
    };
    fetchBooks();
  }, []);

  return (
    <div className="flex min-h-screen bg-orange-100">
      <Sidebar />
      <main className="flex-1 ml-[120px]">
        <Header />
        <div className="flex flex-col items-center w-full px-4 py-10">
          <h1 className="text-4xl font-bold mb-8 text-black text-center">
            Buku Cerita Anak!
          </h1>

          {/* Grid daftar buku */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
            {books.map((book) => (
              <div
                key={book.book_id}
                onClick={() => router.push(`/pdfReader/${book.book_id}`)}
                className="cursor-pointer p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
              >
                {/* Gunakan path relatif untuk gambar */}
                <img
                  src="https://drive.usercontent.google.com/download?id=1XcnRFMuZeURwBlN8SfYKlzqCqHZO-ATg&export=view&authuser=0"
                  alt={book.title}
                  className="w-full h-48 object-contain rounded-md mb-4" // Gunakan object-contain
                />
                <h2 className="text-xl font-semibold text-center text-lime-900">
                  {book.title}
                </h2>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PdfReaderPage;
