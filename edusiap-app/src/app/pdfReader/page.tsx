"use client";

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import Link from "next/link";

interface Storybook {
  book_id: number;
  title: string;
  book_link: string;  // link untuk file PDF
  thumbnail: string;  // link untuk gambar thumbnail
}

const PdfReaderPage = () => {
  const [books, setBooks] = useState<Storybook[]>([]);

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
      <main className="flex-1 ml-[97px]">
        <Header />
        <div className="flex flex-col items-center justify-center w-full px-4 py-10">
          <h1 className="text-4xl font-bold mb-8 text-black text-center">Modul Pembelajaran</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
            {books.map((book) => (
              <Link
                key={book.book_id}
                href={`/pdfReader/${book.book_id}`}
                className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition"
              >
                {/* Menampilkan thumbnail buku jika ada */}
                {book.thumbnail && (
                  <img
                    src={book.thumbnail}
                    alt={book.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                )}
                <h2 className="text-xl font-semibold text-center text-lime-900">{book.title}</h2>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PdfReaderPage;
