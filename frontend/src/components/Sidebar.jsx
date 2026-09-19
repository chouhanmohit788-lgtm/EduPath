import {
  FiBookOpen,
  FiCheckSquare,
  FiHome,
  FiMessageCircle,
  FiTarget,
  FiTrendingUp,
  FiUser,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    {
      label: "Dashboard",
      icon: <FiHome />,
      path: "/dashboard",
    },
    {
      label: "My Roadmap",
      icon: <FiBookOpen />,
      path: "/roadmap",
    },
    {
      label: "Skills",
      icon: <FiTarget />,
      path: "/skills",
    },
    {
      label: "Assessment",
      icon: <FiCheckSquare />,
      path: "/assessment",
    },
    {
      label: "Progress",
      icon: <FiTrendingUp />,
      path: "/progress",
    },
    {
      label: "AI Assistant",
      icon: <FiMessageCircle />,
      path: "/ai-assistant",
    },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-[#E5E1D8] p-5 relative">

      {/* Brand */}
      <div className="mb-10 px-2">
        <h2 className="text-xl font-bold text-[#111111]">
          EduPath <span className="text-[#C47A32]">AI</span>
        </h2>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">

        {menuItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.path}
            className={({ isActive }) =>
              `w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                isActive
                  ? "bg-[#111111] text-white"
                  : "text-[#6B6B63] hover:bg-[#F7F5F0] hover:text-[#111111]"
              }`
            }
          >
            <span className="text-lg">
              {item.icon}
            </span>

            <span className="text-sm font-medium">
              {item.label}
            </span>
          </NavLink>
        ))}

      </nav>

      {/* Profile */}
      <div className="absolute bottom-5 left-5 w-54">

        <div className="border-t border-[#E5E1D8] pt-5">

          <div className="flex items-center gap-3">

            <div className="w-9 h-9 rounded-full bg-[#111111] text-white flex items-center justify-center">
              <FiUser />
            </div>

            <div>
              <p className="text-sm font-semibold text-[#111111]">
                Mohit
              </p>

              <p className="text-xs text-[#6B6B63]">
                Learner
              </p>
            </div>

          </div>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;