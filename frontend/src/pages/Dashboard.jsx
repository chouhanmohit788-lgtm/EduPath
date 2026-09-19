import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FiActivity,
  FiArrowRight,
  FiAward,
  FiBookOpen,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiCode,
  FiHome,
  FiLock,
  FiMenu,
  FiMessageCircle,
  FiSearch,
  FiTarget,
  FiTrendingUp,
  FiUser,
  FiX,
  FiZap,
} from "react-icons/fi";

import {
  FaJava,
  FaBrain,
} from "react-icons/fa";

/* ================= COURSE ICONS ================= */

function DsaIcon() {
  return (
    <div className="relative flex items-center justify-center">
      <FiCode className="text-cyan-400 text-2xl" />
    </div>
  );
}

function ProblemSolvingIcon() {
  return (
    <div className="relative flex items-center justify-center">
      <FaBrain className="text-emerald-400 text-2xl" />
    </div>
  );
}

function JavaIcon() {
  return (
    <FaJava className="text-orange-400 text-3xl" />
  );
}

/* ================= DASHBOARD ================= */

function Dashboard() {
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("Learner");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);

        if (user?.name) {
          setUserName(user.name);
        }
      } catch {
        setUserName("Learner");
      }
    }
  }, []);

  const firstName = userName.split(" ")[0];

  /* ================= SIDEBAR ITEMS ================= */

  const navItems = [
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
      icon: <FiCheckCircle />,
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
    {
      label: "Profile",
      icon: <FiUser />,
      path: "/profile",
    },
  ];

  /* ================= STATS ================= */

  const stats = [
    {
      title: "Overall Progress",
      value: "68%",
      icon: <FiTrendingUp />,
      color: "text-cyan-400",
      bg: "bg-cyan-400/10",
    },
    {
      title: "Tasks Completed",
      value: "24 / 35",
      icon: <FiCheckCircle />,
      color: "text-emerald-400",
      bg: "bg-emerald-400/10",
    },
    {
      title: "Study Streak",
      value: "7 Days",
      icon: <FiClock />,
      color: "text-orange-400",
      bg: "bg-orange-400/10",
    },
    {
      title: "Skill Gaps",
      value: "5",
      icon: <FiTarget />,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
  ];

  /* ================= COURSES ================= */

  const courses = [
    {
      title: "Java",
      subtitle: "Programming Fundamentals",
      progress: 78,
      level: "Level 4",
      xp: "780 XP",
      icon: <JavaIcon />,
      color: "orange",
    },
    {
      title: "Data Structures",
      subtitle: "DSA & Algorithms",
      progress: 52,
      level: "Level 3",
      xp: "520 XP",
      icon: <DsaIcon />,
      color: "cyan",
    },
    {
      title: "OOP",
      subtitle: "Object Oriented Programming",
      progress: 71,
      level: "Level 4",
      xp: "710 XP",
      icon: <JavaIcon />,
      color: "purple",
    },
    {
      title: "Problem Solving",
      subtitle: "Logic & Coding Skills",
      progress: 45,
      level: "Level 2",
      xp: "450 XP",
      icon: <ProblemSolvingIcon />,
      color: "emerald",
    },
  ];

  /* ================= DAILY TASKS ================= */

  const tasks = [
    {
      title: "Java OOP Concepts",
      type: "LEARN",
      time: "45 min",
      xp: "+80 XP",
    },
    {
      title: "Solve 5 Array Problems",
      type: "PRACTICE",
      time: "60 min",
      xp: "+120 XP",
    },
    {
      title: "DSA Assessment",
      type: "BATTLE",
      time: "30 min",
      xp: "+150 XP",
    },
  ];

  /* ================= SKILLS ================= */

  const skills = [
    {
      name: "Java",
      value: 78,
    },
    {
      name: "DSA",
      value: 52,
    },
    {
      name: "OOP",
      value: 71,
    },
    {
      name: "Problem Solving",
      value: 45,
    },
  ];

  /* ================= COMING SOON ================= */

  const comingSoonCourses = [
    "SQL",
    "DBMS",
    "Operating Systems",
    "Computer Networks",
    "HTML & CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Spring Boot",
    "Python",
    "C++",
    "AI / ML",
    "Data Science",
    "Cloud Computing",
    "Cyber Security",
    "System Design",
    "Git & GitHub",
    "DevOps",
    "Docker",
    "Kubernetes",
    "MongoDB",
    "PostgreSQL",
    "TypeScript",
    "Next.js",
    "Angular",
    "Vue.js",
    "Machine Learning",
    "Deep Learning",
    "Generative AI",
    "NLP",
    "Computer Vision",
    "Data Analytics",
    "Power BI",
    "Tableau",
    "AWS",
    "Azure",
    "Google Cloud",
    "Linux",
    "Networking",
    "Software Testing",
    "JUnit",
    "Microservices",
    "REST API",
    "System Architecture",
    "Competitive Programming",
    "Aptitude",
    "Logical Reasoning",
    "Communication Skills",
    "Interview Preparation",
    "Resume Building",
    "Placement Preparation",
    "Advanced DSA",
  ];

  /* ================= COLORS ================= */

  const getColorClasses = (color) => {
    const colors = {
      orange: {
        icon: "bg-orange-500/10 border-orange-400/20",
        text: "text-orange-400",
        bar: "from-orange-500 to-yellow-300",
      },

      cyan: {
        icon: "bg-cyan-500/10 border-cyan-400/20",
        text: "text-cyan-400",
        bar: "from-cyan-500 to-blue-400",
      },

      purple: {
        icon: "bg-purple-500/10 border-purple-400/20",
        text: "text-purple-400",
        bar: "from-purple-500 to-pink-400",
      },

      emerald: {
        icon: "bg-emerald-500/10 border-emerald-400/20",
        text: "text-emerald-400",
        bar: "from-emerald-500 to-cyan-400",
      },
    };

    return colors[color] || colors.cyan;
  };

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  /* ================= UI ================= */

  return (
    <div className="min-h-screen bg-[#060A12] text-white overflow-x-hidden">

      {/* ================= MOBILE OVERLAY ================= */}

      {mobileSidebarOpen && (
        <div
          onClick={closeMobileSidebar}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed left-0 top-0 bottom-0 z-50
          bg-[#0A0F1A]
          border-r border-white/[0.07]
          transition-all duration-300 ease-in-out
          flex flex-col
          overflow-hidden
          ${sidebarOpen ? "w-[250px]" : "w-[82px]"}
          ${
            mobileSidebarOpen
              ? "translate-x-0 w-[270px]"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* Logo */}

        <div className="h-[78px] px-5 border-b border-white/[0.07] flex items-center shrink-0">

          <Link
            to="/dashboard"
            onClick={closeMobileSidebar}
            className="flex items-center gap-2 min-w-0"
          >

            <span className="text-2xl font-black tracking-tight whitespace-nowrap">
              EduPath
            </span>

            {(sidebarOpen || mobileSidebarOpen) && (
              <span className="text-2xl font-black text-orange-400">
                AI
              </span>
            )}

          </Link>

          <button
            onClick={closeMobileSidebar}
            className="ml-auto lg:hidden w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400 hover:text-white"
          >
            <FiX />
          </button>

        </div>

        {/* Navigation */}

        <nav className="flex-1 px-3 py-6 overflow-hidden">

          <p
            className={`
              text-[10px] uppercase tracking-[0.2em] text-gray-600
              px-3 mb-3
              ${(sidebarOpen || mobileSidebarOpen) ? "block" : "hidden"}
            `}
          >
            Main Menu
          </p>

          <div className="space-y-2">

            {navItems.map((item) => {

              const active = item.path === "/dashboard";

              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={closeMobileSidebar}
                  title={!sidebarOpen ? item.label : ""}
                  className={`
                    group flex items-center gap-3
                    rounded-xl
                    h-12
                    px-3
                    transition-all duration-200

                    ${
                      active
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-black shadow-[0_8px_25px_rgba(249,115,22,0.18)]"
                        : "text-gray-400 hover:text-white hover:bg-white/[0.05]"
                    }

                    ${
                      !sidebarOpen && !mobileSidebarOpen
                        ? "justify-center"
                        : ""
                    }
                  `}
                >

                  <span
                    className={`
                      text-xl shrink-0

                      ${
                        active
                          ? "text-black"
                          : "text-gray-500 group-hover:text-orange-400"
                      }
                    `}
                  >
                    {item.icon}
                  </span>

                  {(sidebarOpen || mobileSidebarOpen) && (
                    <span className="text-sm font-medium whitespace-nowrap">
                      {item.label}
                    </span>
                  )}

                </Link>
              );
            })}

          </div>

        </nav>

        {/* ================= LEVEL CARD ================= */}

        {(sidebarOpen || mobileSidebarOpen) ? (

          <div className="p-3 shrink-0">

            <div className="rounded-2xl border border-orange-400/10 bg-gradient-to-br from-orange-500/[0.08] to-transparent p-4">

              <div className="flex items-center gap-3 mb-3">

                <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-400/20 flex items-center justify-center">

                  <FiZap className="text-orange-400" />

                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Current Level
                  </p>

                  <p className="font-bold text-sm">
                    Level 7
                  </p>

                </div>

              </div>

              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">

                <div className="h-full w-[72%] rounded-full bg-gradient-to-r from-orange-500 to-yellow-300" />

              </div>

              <p className="text-[10px] text-gray-600 mt-2">
                760 XP to Level 8
              </p>

            </div>

          </div>

        ) : (

          <div className="p-3 shrink-0">

            <div className="w-full h-12 rounded-xl bg-orange-500/10 border border-orange-400/10 flex items-center justify-center">

              <FiZap className="text-orange-400" />

            </div>

          </div>

        )}

        {/* ================= COLLAPSE ================= */}

        <div className="hidden lg:block p-3 border-t border-white/[0.07] shrink-0">

          <button
            onClick={() => setSidebarOpen((value) => !value)}
            className="w-full h-11 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/[0.06] transition"
            title={
              sidebarOpen
                ? "Collapse sidebar"
                : "Open sidebar"
            }
          >

            {sidebarOpen ? (
              <FiChevronLeft />
            ) : (
              <FiChevronRight />
            )}

          </button>

        </div>

      </aside>

      {/* ================= MAIN ================= */}

      <div
        className={`
          min-h-screen transition-all duration-300
          ${sidebarOpen ? "lg:pl-[250px]" : "lg:pl-[82px]"}
        `}
      >

        {/* ================= TOP NAVBAR ================= */}

        <header className="sticky top-0 z-30 h-[78px] bg-[#060A12]/90 backdrop-blur-xl border-b border-white/[0.07]">

          <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">

            <div className="flex items-center gap-3">

              {/* Mobile Menu */}

              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-gray-400 hover:text-white"
              >
                <FiMenu />
              </button>

              {/* Desktop Menu */}

              <button
                onClick={() => setSidebarOpen((value) => !value)}
                className="hidden lg:flex w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] items-center justify-center text-gray-400 hover:text-white transition"
              >
                <FiMenu />
              </button>

              <div className="hidden sm:block">

                <p className="text-xs text-gray-600 uppercase tracking-widest">
                  Learning Command Center
                </p>

                <p className="text-sm font-semibold text-gray-300">
                  Your Learning Dashboard
                </p>

              </div>

            </div>

            {/* Search */}

            <div className="hidden md:flex flex-1 max-w-md mx-4">

              <div className="w-full h-11 rounded-xl bg-white/[0.035] border border-white/[0.07] flex items-center gap-3 px-4">

                <FiSearch className="text-gray-600" />

                <input
                  type="text"
                  placeholder="Search courses, skills, topics..."
                  className="w-full bg-transparent outline-none text-sm text-white placeholder:text-gray-600"
                />

                <span className="hidden lg:block text-[10px] text-gray-700 border border-white/[0.07] rounded px-2 py-1">
                  /
                </span>

              </div>

            </div>

            {/* Right */}

            <div className="flex items-center gap-2 sm:gap-4">

              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-500/[0.07] border border-orange-400/10">

                <span className="text-orange-400">
                  🔥
                </span>

                <span className="text-xs font-semibold text-orange-300">
                  7 Day Streak
                </span>

              </div>

              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-500/[0.07] border border-cyan-400/10">

                <FiZap className="text-cyan-400" />

                <span className="text-xs font-semibold text-cyan-300">
                  1,240 XP
                </span>

              </div>

              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center text-orange-400 font-bold">
                {firstName.charAt(0).toUpperCase()}
              </div>

            </div>

          </div>

        </header>

        {/* ================= CONTENT ================= */}

        <main className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9">

          {/* ================= WELCOME ================= */}

          <section className="mb-8">

            <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-6">

              <div>

                <div className="flex items-center gap-2 mb-3">

                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

                  <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">
                    Saturday, September 19
                  </p>

                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">

                  Welcome back, {firstName}

                  <span className="ml-2">
                    👋
                  </span>

                </h1>

                <p className="text-gray-500 mt-3 text-sm sm:text-base">
                  Ready for your next quest? Keep building your skills.
                </p>

              </div>

              {/* XP */}

              <div className="w-full xl:w-auto bg-[#0C1220] border border-white/[0.08] rounded-2xl p-4 sm:p-5">

                <div className="flex items-center gap-4">

                  <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center">

                    <FiZap className="text-orange-400 text-xl" />

                  </div>

                  <div className="w-full sm:w-[190px]">

                    <div className="flex justify-between text-xs mb-2">

                      <span className="text-gray-500">
                        Level 7
                      </span>

                      <span className="text-orange-400 font-bold">
                        1,240 XP
                      </span>

                    </div>

                    <div className="h-2 bg-white/[0.07] rounded-full overflow-hidden">

                      <div className="h-full w-[72%] bg-gradient-to-r from-orange-500 to-yellow-300 rounded-full" />

                    </div>

                    <p className="text-[10px] text-gray-600 mt-2">
                      760 XP to Level 8
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* ================= STATS ================= */}

          <section className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5 mb-9">

            {stats.map((stat) => (

              <div
                key={stat.title}
                className="bg-[#0C1220] border border-white/[0.08] rounded-2xl p-4 sm:p-5 hover:border-white/[0.15] transition"
              >

                <div className="flex items-center justify-between gap-3">

                  <div>

                    <p className="text-xs sm:text-sm text-gray-600">
                      {stat.title}
                    </p>

                    <p className="text-xl sm:text-2xl font-bold mt-2">
                      {stat.value}
                    </p>

                  </div>

                  <div
                    className={`
                      w-10 h-10 sm:w-11 sm:h-11
                      rounded-xl
                      ${stat.bg}
                      flex items-center justify-center
                      ${stat.color}
                    `}
                  >
                    {stat.icon}
                  </div>

                </div>

              </div>

            ))}

          </section>

          {/* ================= CONTINUE LEARNING ================= */}

          <section className="mb-10">

            <div className="flex items-end justify-between mb-5">

              <div>

                <p className="text-xs text-orange-400 uppercase tracking-[0.2em] font-bold">
                  Continue Learning
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold mt-1">
                  Your Next Quest
                </h2>

              </div>

              <FiAward className="hidden sm:block text-orange-400 text-2xl" />

            </div>

            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#101827] via-[#0D1423] to-[#151018] border border-orange-400/20 p-5 sm:p-7">

              <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-orange-500/10 blur-3xl" />

              <div className="relative flex flex-col lg:flex-row lg:items-center gap-6">

                <div className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-2xl bg-orange-500/[0.08] border border-orange-400/20 flex items-center justify-center">

                  <JavaIcon />

                </div>

                <div className="flex-1">

                  <div className="flex flex-wrap items-center gap-2 mb-2">

                    <span className="text-[10px] px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-400/20 font-bold">
                      CURRENT QUEST
                    </span>

                    <span className="text-xs text-gray-600">
                      Level 4
                    </span>

                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold">
                    Master Java Fundamentals
                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    Continue your Java journey and unlock the next skill.
                  </p>

                  <div className="mt-5 max-w-2xl">

                    <div className="flex justify-between text-xs mb-2">

                      <span className="text-gray-600">
                        Progress
                      </span>

                      <span className="text-orange-400 font-bold">
                        78%
                      </span>

                    </div>

                    <div className="h-2.5 bg-white/[0.08] rounded-full overflow-hidden">

                      <div className="h-full w-[78%] bg-gradient-to-r from-orange-500 to-yellow-300 rounded-full" />

                    </div>

                  </div>

                </div>

                <button
                  onClick={() => navigate("/roadmap")}
                  className="shrink-0 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-orange-500 text-black font-bold hover:bg-orange-400 transition"
                >
                  Continue
                  <FiArrowRight />
                </button>

              </div>

            </div>

          </section>

          {/* ================= COURSES ================= */}

          <section className="mb-10">

            <div className="flex items-end justify-between mb-5">

              <div>

                <p className="text-xs text-cyan-400 uppercase tracking-[0.2em] font-bold">
                  Active Courses
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold mt-1">
                  Your Courses
                </h2>

                <p className="text-sm text-gray-600 mt-1">
                  Your current learning journey
                </p>

              </div>

              <span className="text-xs text-gray-600">
                4 Active
              </span>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

              {courses.map((course) => {

                const colors = getColorClasses(course.color);

                return (
                  <div
                    key={course.title}
                    className="group bg-[#0C1220] border border-white/[0.08] rounded-2xl p-5 hover:-translate-y-1 hover:border-white/[0.16] transition-all duration-300"
                  >

                    <div className="flex items-start justify-between">

                      <div
                        className={`
                          w-12 h-12 rounded-xl border
                          flex items-center justify-center
                          ${colors.icon}
                          ${colors.text}
                        `}
                      >
                        {course.icon}
                      </div>

                      <span className="text-[10px] text-gray-600">
                        {course.level}
                      </span>

                    </div>

                    <h3 className="text-lg font-bold mt-5">
                      {course.title}
                    </h3>

                    <p className="text-xs text-gray-600 mt-1 min-h-[32px]">
                      {course.subtitle}
                    </p>

                    <div className="mt-5">

                      <div className="flex justify-between text-xs mb-2">

                        <span className="text-gray-600">
                          Progress
                        </span>

                        <span className={`font-bold ${colors.text}`}>
                          {course.progress}%
                        </span>

                      </div>

                      <div className="h-1.5 bg-white/[0.07] rounded-full overflow-hidden">

                        <div
                          className={`
                            h-full rounded-full
                            bg-gradient-to-r
                            ${colors.bar}
                          `}
                          style={{
                            width: `${course.progress}%`,
                          }}
                        />

                      </div>

                    </div>

                    <div className="flex items-center justify-between mt-5">

                      <span className="text-xs text-orange-400">
                        ⚡ {course.xp}
                      </span>

                      <button
                        onClick={() => navigate("/roadmap")}
                        className="text-xs font-bold flex items-center gap-1 text-gray-300 hover:text-cyan-400 transition"
                      >
                        Continue
                        <FiArrowRight />
                      </button>

                    </div>

                  </div>
                );
              })}

            </div>

          </section>

          {/* ================= JOURNEY + SKILLS ================= */}

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">

            {/* Learning Journey */}

            <div className="xl:col-span-2 bg-[#0C1220] border border-white/[0.08] rounded-2xl p-5 sm:p-6">

              <div className="flex items-start justify-between mb-6">

                <div>

                  <p className="text-xs text-purple-400 uppercase tracking-[0.2em] font-bold">
                    XP Growth
                  </p>

                  <h3 className="text-xl font-bold mt-1">
                    Learning Journey
                  </h3>

                </div>

                <span className="text-xs text-gray-600">
                  Last 7 days
                </span>

              </div>

              <div className="relative h-56">

                <div className="absolute inset-0 flex flex-col justify-between">

                  {[1, 2, 3, 4, 5].map((line) => (

                    <div
                      key={line}
                      className="border-t border-white/[0.045]"
                    />

                  ))}

                </div>

                <div className="absolute inset-x-0 bottom-5 top-5 flex items-end justify-between px-2 sm:px-6">

                  {[35, 48, 42, 68, 58, 82, 95].map(
                    (height, index) => (

                      <div
                        key={index}
                        className="h-full flex flex-col justify-end items-center gap-2"
                      >

                        <div
                          className="w-5 sm:w-8 rounded-t-lg bg-gradient-to-t from-cyan-500/10 to-cyan-400/60 relative"
                          style={{
                            height: `${height}%`,
                          }}
                        >

                          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />

                        </div>

                        <span className="text-[10px] text-gray-700">
                          D{index + 1}
                        </span>

                      </div>

                    )
                  )}

                </div>

              </div>

            </div>

            {/* Skill Mastery */}

            <div className="bg-[#0C1220] border border-white/[0.08] rounded-2xl p-5 sm:p-6">

              <p className="text-xs text-emerald-400 uppercase tracking-[0.2em] font-bold">
                Skill Tree
              </p>

              <h3 className="text-xl font-bold mt-1 mb-6">
                Skill Mastery
              </h3>

              <div className="space-y-5">

                {skills.map((skill) => (

                  <div key={skill.name}>

                    <div className="flex justify-between text-sm mb-2">

                      <span className="text-gray-300">
                        {skill.name}
                      </span>

                      <span className="text-gray-600">
                        {skill.value}%
                      </span>

                    </div>

                    <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">

                      <div
                        className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full"
                        style={{
                          width: `${skill.value}%`,
                        }}
                      />

                    </div>

                  </div>

                ))}

              </div>

            </div>

          </section>

          {/* ================= DAILY QUESTS + AI ================= */}

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-10">

            {/* Quests */}

            <div className="xl:col-span-2 bg-[#0C1220] border border-white/[0.08] rounded-2xl p-5 sm:p-6">

              <div className="flex items-center justify-between mb-5">

                <div>

                  <p className="text-xs text-orange-400 uppercase tracking-[0.2em] font-bold">
                    Daily Missions
                  </p>

                  <h3 className="text-xl font-bold mt-1">
                    Today's Quests
                  </h3>

                </div>

                <span className="text-xs text-gray-600">
                  3 Missions
                </span>

              </div>

              <div className="space-y-3">

                {tasks.map((task) => (

                  <div
                    key={task.title}
                    className="flex items-center gap-3 sm:gap-4 p-4 rounded-xl bg-[#080D16] border border-white/[0.05] hover:border-orange-400/20 transition"
                  >

                    <div className="w-10 h-10 shrink-0 rounded-xl bg-white/[0.04] flex items-center justify-center">

                      <FiCheckCircle className="text-gray-600" />

                    </div>

                    <div className="flex-1 min-w-0">

                      <p className="font-medium text-sm sm:text-base truncate">
                        {task.title}
                      </p>

                      <div className="flex items-center gap-3 mt-1">

                        <span className="text-[10px] text-cyan-400 uppercase tracking-wider">
                          {task.type}
                        </span>

                        <span className="text-[10px] text-gray-700">
                          {task.time}
                        </span>

                      </div>

                    </div>

                    <span className="text-xs text-orange-400 whitespace-nowrap">
                      {task.xp}
                    </span>

                  </div>

                ))}

              </div>

            </div>

            {/* AI */}

            <div className="relative overflow-hidden bg-gradient-to-br from-[#18132B] to-[#0C1220] border border-purple-400/20 rounded-2xl p-6">

              <div className="absolute -right-10 -top-10 w-40 h-40 bg-purple-500/10 blur-3xl rounded-full" />

              <div className="relative">

                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center mb-5">

                  <span className="text-2xl">
                    🤖
                  </span>

                </div>

                <p className="text-xs text-purple-400 uppercase tracking-[0.2em] font-bold">
                  AI Guide
                </p>

                <h3 className="text-xl font-bold mt-2">
                  Your AI Mentor
                </h3>

                <p className="text-sm text-gray-500 leading-6 mt-3">
                  Get help with concepts, coding problems and your next
                  learning step.
                </p>

                <button
                  onClick={() => navigate("/ai-assistant")}
                  className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-purple-500 text-white font-bold hover:bg-purple-400 transition"
                >
                  Open AI Guide
                  <FiArrowRight />
                </button>

              </div>

            </div>

          </section>

          {/* ================= COMING SOON ================= */}

          <section className="pb-10">

            <div className="flex items-end justify-between mb-5">

              <div>

                <p className="text-xs text-gray-600 uppercase tracking-[0.2em] font-bold">
                  More Adventures
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold mt-1">
                  Courses Coming Soon
                </h2>

                <p className="text-sm text-gray-600 mt-2">
                  Unlock new skills as EduPath grows.
                </p>

              </div>

              <span className="text-xs text-gray-700">
                50+ Courses
              </span>

            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">

              {comingSoonCourses.map((course) => (

                <div
                  key={course}
                  className="group bg-[#090E17] border border-white/[0.05] rounded-xl p-4 hover:border-white/[0.12] transition"
                >

                  <div className="flex items-center justify-between mb-3">

                    <div className="w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center">

                      <FiBookOpen className="text-gray-700 text-sm" />

                    </div>

                    <FiLock className="text-gray-700 text-xs" />

                  </div>

                  <p className="text-xs sm:text-sm text-gray-500 font-medium">
                    {course}
                  </p>

                  <p className="text-[9px] text-gray-700 mt-1 uppercase tracking-wider">
                    Locked
                  </p>

                </div>

              ))}

            </div>

          </section>

        </main>

      </div>

      {/* ================= MOBILE BOTTOM NAV ================= */}

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#080D16]/95 backdrop-blur-xl border-t border-white/[0.07] px-3 py-2">

        <div className="flex items-center justify-around">

          {[
            {
              icon: <FiHome />,
              label: "Home",
              path: "/dashboard",
            },
            {
              icon: <FiBookOpen />,
              label: "Roadmap",
              path: "/roadmap",
            },
            {
              icon: <FiTarget />,
              label: "Skills",
              path: "/skills",
            },
            {
              icon: <FiActivity />,
              label: "Progress",
              path: "/progress",
            },
            {
              icon: <FiMessageCircle />,
              label: "AI",
              path: "/ai-assistant",
            },
          ].map((item) => (

            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`
                flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg
                ${
                  item.path === "/dashboard"
                    ? "text-orange-400"
                    : "text-gray-600"
                }
              `}
            >

              <span className="text-lg">
                {item.icon}
              </span>

              <span className="text-[9px]">
                {item.label}
              </span>

            </button>

          ))}

        </div>

      </div>

      <div className="lg:hidden h-16" />

    </div>
  );
}

export default Dashboard;