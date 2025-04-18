"use client";

import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";

const PdfReaderPage = () => {
  return (
    <div className="flex min-h-screen bg-orange-100">
      <Sidebar />
      <main className="flex-1 ml-[97px]">
        <Header />
        <div className="flex flex-col items-center justify-center w-full px-4 py-10">
          <h1 className="text-4xl font-bold mb-8 text-center text-black">Modul Pembelajaran</h1>

          <div className="w-full max-w-5xl h-[80vh] bg-white rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="/modul-pembelajaran.pdf"
              className="w-full h-full"
              title="Modul Pembelajaran"
            />
          </div>

          <a
            href="/modul-pembelajaran.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 px-6 py-2 text-white bg-lime-900 rounded-lg hover:bg-lime-800 transition"
          >
            Download PDF
          </a>
        </div>
      </main>
    </div>
  );
};

export default PdfReaderPage;
