import {
  FiHome,
  FiMap,
  FiTarget,
  FiCheckSquare,
  FiTrendingUp,
  FiMessageCircle,
  FiUser,
  FiLogOut,
  FiZap,
} from "react-icons/fi";

import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: FiHome,
    },
    {
      name: "My Roadmap",
      path: "/roadmap",
      icon: FiMap,
    },
    {
      name: "Skills",
      path: "/skills",
      icon: FiTarget,
    },
    {
      name: "Assessment",
      path: "/assessment",
      icon: FiCheckSquare,
    },
    {
      name: "Progress",
      path: "/progress",
      icon: FiTrendingUp,
    },
    {
      name: "AI Assistant",
      path: "/ai-assistant",
      icon: FiMessageCircle,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: FiUser,
    },
  ];

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("profileId");

    navigate("/login");
  }

  return (
    <aside className="hidden lg:flex w-[275px] min-h-screen shrink-0 flex-col bg-[#070b17] border-r border-white/10">

      {/* ================= LOGO ================= */}

      <div className="h-[86px] flex items-center px-7 border-b border-white/10">

        <div className="flex items-center gap-2">

          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-orange-300 flex items-center justify-center shadow-lg shadow-orange-500/20">

            <FiZap className="text-[#070b17] text-lg" />

          </div>

          <div>

            <div className="text-xl font-bold tracking-tight text-white">
              EduPath{" "}
              <span className="text-orange-400">
                AI
              </span>
            </div>

            <p className="text-[9px] uppercase tracking-[0.25em] text-slate-600">
              Level Up Your Career
            </p>

          </div>

        </div>

      </div>

      {/* ================= NAVIGATION ================= */}

      <nav className="flex-1 px-4 py-6">

        <p className="px-3 mb-3 text-[10px] uppercase tracking-[0.2em] font-semibold text-slate-600">
          Main Menu
        </p>

        <div className="space-y-1.5">

          {menuItems.map((item) => {

            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-orange-500 text-white shadow-lg shadow-orange-500/10"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.05]"
                  }`
                }
              >

                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-7 rounded-r-full bg-orange-300" />
                    )}

                    <Icon
                      className={`text-lg shrink-0 ${
                        isActive
                          ? "text-white"
                          : "text-slate-500 group-hover:text-orange-400"
                      }`}
                    />

                    <span className="text-sm font-medium">
                      {item.name}
                    </span>

                    {item.name === "AI Assistant" && (
                      <span
                        className={`ml-auto text-[9px] px-2 py-0.5 rounded-full ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-orange-500/10 text-orange-400"
                        }`}
                      >
                        AI
                      </span>
                    )}
                  </>
                )}

              </NavLink>
            );
          })}

        </div>

      </nav>

      {/* ================= BOTTOM PROFILE / LOGOUT ================= */}

      <div className="p-4 border-t border-white/10">

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-purple-500 flex items-center justify-center font-bold text-white">

              {(
                JSON.parse(
                  localStorage.getItem("user") || "{}"
                )?.name || "M"
              )
                .charAt(0)
                .toUpperCase()}

            </div>

            <div className="min-w-0 flex-1">

              <p className="text-sm font-semibold text-white truncate">
                {JSON.parse(
                  localStorage.getItem("user") || "{}"
                )?.name || "Learner"}
              </p>

              <p className="text-[11px] text-slate-500">
                Learning Mode
              </p>

            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition"
            >
              <FiLogOut />
            </button>

          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;