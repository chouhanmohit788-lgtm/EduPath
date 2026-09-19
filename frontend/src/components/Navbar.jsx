import { FiBell, FiChevronDown } from "react-icons/fi";

function Navbar() {
  return (
    <nav className="border-b border-[#E5E1D8] bg-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <h1 className="text-2xl font-bold tracking-tight text-[#111111]">
          EduPath <span className="text-[#C47A32]">AI</span>
        </h1>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {/* Notification */}
          <button className="relative text-[#6B6B63] hover:text-[#111111] transition">
            <FiBell className="text-xl" />

            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#C47A32]" />
          </button>

          {/* Profile */}
          <button className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-full bg-[#111111] text-white flex items-center justify-center font-semibold">
              M
            </div>

            <div className="hidden sm:block text-left">
              <p className="text-sm font-semibold text-[#111111]">
                Mohit
              </p>

              <p className="text-xs text-[#6B6B63]">
                Learner
              </p>
            </div>

            <FiChevronDown className="text-[#6B6B63]" />

          </button>

        </div>

      </div>
    </nav>
  );
}

export default Navbar;