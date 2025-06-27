"use client";

export default function Footer() {
  return (
    <footer className="bg-black py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold text-white mb-2">CrewDaily</h3>
            <p className="text-zinc-400 font-light">
              Modern crew management for film & TV
            </p>
          </div>
          <div className="flex gap-8 text-zinc-400">
            <a href="#" className="hover:text-white transition-colors font-light">
              Privacy
            </a>
            <a href="#" className="hover:text-white transition-colors font-light">
              Terms
            </a>
            <a href="#" className="hover:text-white transition-colors font-light">
              Contact
            </a>
          </div>
        </div>
        <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-zinc-500 font-light">
          <p>&copy; 2024 CrewDaily. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}