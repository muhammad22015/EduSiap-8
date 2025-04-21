"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

interface Storybook {
  title: string;
  book_link: string;
}

const PdfDetailPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState<Storybook | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      const res = await fetch(`http://localhost:5000/storybook/read?id=${id}`);
      const data = await res.json();
      if (data && data.response) {
        setBook(data.response);
      }
    };
    fetchBook();
  }, [id]);

  if (!book) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-orange-100">
      <Sidebar />
      <main className="flex-1 ml-[97px]">
        <Header />
        <div className="flex flex-col items-center justify-center w-full px-4 py-10">
          <h1 className="text-3xl font-bold mb-6 text-black text-center">{book.title}</h1>

          {/* Menampilkan PDF jika ada link */}
          <div className="w-full max-w-5xl h-[80vh] bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src={book.book_link} 
              className="w-full h-full"
              title={book.title}
            />
          </div>

          {/* Tombol untuk mengunduh PDF */}
          <a
            href={book.book_link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 px-6 py-2 text-white bg-lime-900 rounded-lg hover:bg-lime-800 transition"
          >
            Download PDF via Google Drive
          </a>
        </div>
      </main>
    </div>
  );
};

export default PdfDetailPage;
