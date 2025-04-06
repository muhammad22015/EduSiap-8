import Link from "next/link";

// Using simple emoji instead of react-icons
export default function Header() {
  return (
    <header className="fixed top-0 w-full bg-white z-50 shadow-sm">
      <div className="flex items-center justify-between h-14 px-4">
        <div className="flex items-center">
          <button className="p-2 mr-2 rounded-full hover:bg-gray-100">
            <span className="text-xl">☰</span>
          </button>
          <Link href="/" className="flex items-center">
            <span className="text-red-600 font-bold text-xl">YouTube</span>
          </Link>
        </div>

        <div className="hidden md:flex items-center justify-center flex-1 max-w-2xl mx-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:border-blue-500"
            />
            <button className="absolute right-0 top-0 h-full px-6 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200">
              <span className="text-xl">🔍</span>
            </button>
          </div>
          <button className="ml-4 p-2 bg-gray-100 rounded-full hover:bg-gray-200">
            <span className="text-xl">🎤</span>
          </button>
        </div>

        <div className="flex items-center">
          <button className="p-2 mx-1 rounded-full hover:bg-gray-100">
            <span className="text-xl">📹</span>
          </button>
          <button className="p-2 mx-1 rounded-full hover:bg-gray-100">
            <span className="text-xl">🔔</span>
          </button>
          <div className="ml-2 w-8 h-8 rounded-full bg-blue-500"></div>
        </div>
      </div>
    </header>
  );
}