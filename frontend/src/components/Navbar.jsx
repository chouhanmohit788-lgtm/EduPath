import {
  FiBell,
  FiChevronDown,
  FiMenu,
  FiZap,
} from "react-icons/fi";

import { useState } from "react";

function Navbar() {
  const [mobileOpen, setMobileOpen] =
    useState(false);

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const name = user?.name || "Mohit";

  const initial = name
    .charAt(0)
    .toUpperCase();

  return (
    <>
      <header className="h-[86px] bg-[#070b17]/95 backdrop-blur-xl border-b border-white/10 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-40">

        {/* ================= MOBILE LOGO ================= */}

        <div className="flex items-center gap-3 lg:hidden">

          <button
            onClick={() =>
              setMobileOpen(!mobileOpen)
            }
            className="w-10 h-10 rounded-xl border border-white/10 bg-white/[0.03] flex items-center justify-center text-slate-300 hover:text-orange-400 transition"
          >
            <FiMenu className="text-xl" />
          </button>

          <div className="font-bold text-lg text-white">

            EduPath{" "}
            <span className="text-orange-400">
              AI
            </span>

          </div>

        </div>

        {/* ================= DESKTOP BRAND ================= */}

        <div className="hidden lg:flex items-center gap-2">

          <div className="text-xl font-bold text-white">

            EduPath{" "}
            <span className="text-orange-400">
              AI
            </span>

          </div>

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="flex items-center gap-3 sm:gap-5 ml-auto">

          {/* XP */}

          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20">

            <FiZap className="text-orange-400" />

            <span className="text-xs font-semibold text-orange-300">
              XP 1,240
            </span>

          </div>

          {/* Notification */}

          <button className="relative w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.05] transition">

            <FiBell className="text-lg" />

            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-orange-500 border-2 border-[#070b17]" />

          </button>

          {/* User */}

          <div className="flex items-center gap-2 sm:gap-3">

            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center text-white font-bold shadow-lg shadow-orange-500/10">

              {initial}

            </div>

            <div className="hidden sm:block">

              <p className="text-sm font-semibold text-white leading-none">
                {name}
              </p>

              <p className="text-[11px] text-slate-500 mt-1">
                Learner
              </p>

            </div>

            <FiChevronDown className="hidden sm:block text-slate-500" />

          </div>

        </div>

      </header>

      {/* ================= MOBILE MENU ================= */}

      {mobileOpen && (

        <div className="lg:hidden fixed inset-x-0 top-[86px] z-50 bg-[#070b17] border-b border-white/10 shadow-2xl">

          <div className="p-4 space-y-1">

            {[
              ["/dashboard", "Dashboard"],
              ["/roadmap", "My Roadmap"],
              ["/skills", "Skills"],
              ["/assessment", "Assessment"],
              ["/progress", "Progress"],
              ["/ai-assistant", "AI Assistant"],
              ["/profile", "Profile"],
            ].map(([path, label]) => (

              <a
                key={path}
                href={path}
                onClick={() =>
                  setMobileOpen(false)
                }
                className="block px-4 py-3 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.05] text-sm"
              >
                {label}
              </a>

            ))}

          </div>

        </div>

      )}

    </>
  );
}

export default Navbar;