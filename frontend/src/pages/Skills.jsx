import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiActivity,
  FiAlertCircle,
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiMenu,
  FiMessageCircle,
  FiTarget,
  FiTrendingUp,
  FiUser,
  FiX,
  FiZap,
} from "react-icons/fi";

import { skillGapApi } from "../services/api";

function Skills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    loadSkillGaps();
  }, []);

  const loadSkillGaps = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await skillGapApi.getAll();

      setSkills(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load skill gaps:", err);
      setError("Unable to load skill data.");
    } finally {
      setLoading(false);
    }
  };

  const averageSkillLevel = useMemo(() => {
    if (skills.length === 0) return 0;

    const total = skills.reduce(
      (sum, skill) => sum + (skill.currentLevel || 0),
      0
    );

    return Math.round(total / skills.length);
  }, [skills]);

  const skillsNeedingFocus = useMemo(() => {
    return skills.filter(
      (skill) => (skill.gap || 0) > 0
    ).length;
  }, [skills]);

  const recommendations = useMemo(() => {
    if (skills.length === 0) return [];

    return [...skills]
      .sort(
        (a, b) =>
          (b.gap || 0) - (a.gap || 0)
      )
      .slice(0, 2);
  }, [skills]);

  const getStatus = (skill) => {
    const current = skill.currentLevel || 0;
    const required = skill.requiredLevel || 0;
    const gap = skill.gap || 0;

    if (gap === 0 || current >= required) {
      return "Good";
    }

    if (gap <= 10) {
      return "Improving";
    }

    return "Needs Work";
  };

  const getStatusStyle = (status) => {
    if (status === "Good") {
      return {
        text: "text-emerald-400",
        bg: "bg-emerald-500/10",
        border: "border-emerald-400/20",
      };
    }

    if (status === "Improving") {
      return {
        text: "text-cyan-400",
        bg: "bg-cyan-500/10",
        border: "border-cyan-400/20",
      };
    }

    return {
      text: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-400/20",
    };
  };

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

  const closeMobileSidebar = () => {
    setMobileSidebarOpen(false);
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#060A12] text-white">

        <div className="flex min-h-screen">

          <aside className="hidden lg:flex w-[250px] shrink-0 bg-[#0A0F1A] border-r border-white/[0.07] flex-col">

            <div className="h-[78px] px-5 border-b border-white/[0.07] flex items-center">

              <span className="text-2xl font-black">
                EduPath
              </span>

              <span className="text-2xl font-black text-orange-400 ml-2">
                AI
              </span>

            </div>

            <nav className="px-3 py-6">

              {navItems.map((item) => (

                <Link
                  key={item.label}
                  to={item.path}
                  className={`
                    flex items-center gap-3
                    h-12 px-3 rounded-xl mb-2
                    ${
                      item.path === "/skills"
                        ? "bg-gradient-to-r from-orange-500 to-orange-600 text-black"
                        : "text-gray-400 hover:bg-white/[0.05]"
                    }
                  `}
                >

                  <span className="text-xl">
                    {item.icon}
                  </span>

                  <span className="text-sm font-medium">
                    {item.label}
                  </span>

                </Link>

              ))}

            </nav>

          </aside>

          <main className="flex-1 flex items-center justify-center p-6">

            <div className="w-full max-w-xl rounded-3xl bg-[#0C1220] border border-white/[0.08] p-10 text-center">

              <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">

                <FiTarget className="text-3xl text-cyan-400 animate-pulse" />

              </div>

              <h2 className="text-2xl font-bold">
                Loading your skills...
              </h2>

              <p className="mt-3 text-sm text-gray-500">
                Preparing your skill profile and gaps.
              </p>

              <div className="mt-7 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">

                <div className="h-full w-[60%] rounded-full bg-gradient-to-r from-cyan-500 to-blue-400 animate-pulse" />

              </div>

            </div>

          </main>

        </div>
      </div>
    );
  }

  /* ================= MAIN ================= */

  return (
    <div className="min-h-screen bg-[#060A12] text-white overflow-x-hidden">

      {/* Mobile Overlay */}

      {mobileSidebarOpen && (
        <div
          onClick={closeMobileSidebar}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed left-0 top-0 bottom-0 z-50
          bg-[#0A0F1A]
          border-r border-white/[0.07]
          flex flex-col
          overflow-hidden
          transition-all duration-300

          ${
            sidebarOpen
              ? "w-[250px]"
              : "w-[82px]"
          }

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
            className="flex items-center"
          >

            <span className="text-2xl font-black">
              EduPath
            </span>

            {(sidebarOpen ||
              mobileSidebarOpen) && (
              <span className="text-2xl font-black text-orange-400 ml-2">
                AI
              </span>
            )}

          </Link>

          <button
            onClick={closeMobileSidebar}
            className="ml-auto lg:hidden w-9 h-9 rounded-lg bg-white/5 flex items-center justify-center text-gray-400"
          >
            <FiX />
          </button>

        </div>

        {/* Navigation */}

        <nav className="flex-1 px-3 py-6 overflow-hidden">

          <p
            className={`
              text-[10px] uppercase tracking-[0.2em]
              text-gray-600 px-3 mb-3

              ${
                sidebarOpen ||
                mobileSidebarOpen
                  ? "block"
                  : "hidden"
              }
            `}
          >
            Main Menu
          </p>

          {navItems.map((item) => {

            const active =
              item.path === "/skills";

            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={closeMobileSidebar}
                title={
                  !sidebarOpen
                    ? item.label
                    : ""
                }
                className={`
                  group flex items-center gap-3
                  h-12 px-3 rounded-xl mb-2
                  transition-all duration-200

                  ${
                    active
                      ? "bg-gradient-to-r from-orange-500 to-orange-600 text-black shadow-[0_8px_25px_rgba(249,115,22,0.18)]"
                      : "text-gray-400 hover:text-white hover:bg-white/[0.05]"
                  }

                  ${
                    !sidebarOpen &&
                    !mobileSidebarOpen
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

                {(sidebarOpen ||
                  mobileSidebarOpen) && (
                  <span className="text-sm font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                )}

              </Link>
            );
          })}

        </nav>

        {/* Level Card */}

        {(sidebarOpen ||
          mobileSidebarOpen) ? (

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

          <div className="p-3">

            <div className="w-full h-12 rounded-xl bg-orange-500/10 border border-orange-400/10 flex items-center justify-center">

              <FiZap className="text-orange-400" />

            </div>

          </div>

        )}

        {/* Collapse */}

        <div className="hidden lg:block p-3 border-t border-white/[0.07] shrink-0">

          <button
            onClick={() =>
              setSidebarOpen(
                (value) => !value
              )
            }
            className="w-full h-11 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/[0.06] transition"
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

          ${
            sidebarOpen
              ? "lg:pl-[250px]"
              : "lg:pl-[82px]"
          }
        `}
      >

        {/* ================= TOP BAR ================= */}

        <header className="sticky top-0 z-30 h-[78px] bg-[#060A12]/90 backdrop-blur-xl border-b border-white/[0.07]">

          <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">

            <div className="flex items-center gap-3">

              <button
                onClick={() =>
                  setMobileSidebarOpen(true)
                }
                className="lg:hidden w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-gray-400"
              >
                <FiMenu />
              </button>

              <button
                onClick={() =>
                  setSidebarOpen(
                    (value) => !value
                  )
                }
                className="hidden lg:flex w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] items-center justify-center text-gray-400 hover:text-white transition"
              >
                <FiMenu />
              </button>

              <div>

                <p className="text-xs text-cyan-400 uppercase tracking-[0.2em] font-bold">
                  Skill Tree
                </p>

                <p className="text-sm font-semibold text-gray-300 mt-1">
                  Skills & Skill Gaps
                </p>

              </div>

            </div>

            <div className="flex items-center gap-3">

              <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-500/[0.07] border border-orange-400/10">

                <span>
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
                M
              </div>

            </div>

          </div>

        </header>

        {/* ================= CONTENT ================= */}

        <main className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-9">

          {/* Header */}

          <section className="mb-8">

            <div className="flex items-center gap-3 mb-3">

              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">

                <FiTarget className="text-2xl text-cyan-400" />

              </div>

              <div>

                <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">
                  Your Current Skill Profile
                </p>

                <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
                  Skills & Skill Gaps
                </h1>

              </div>

            </div>

            <p className="text-sm sm:text-base text-gray-500 max-w-2xl leading-6">
              See where you are today and which skills need
              more focus to reach your target role.
            </p>

          </section>

          {/* ================= ERROR ================= */}

          {!loading && error && (

            <div className="rounded-2xl bg-[#0C1220] border border-red-400/20 p-8 text-center">

              <div className="mx-auto w-14 h-14 rounded-2xl bg-red-500/10 border border-red-400/20 flex items-center justify-center">

                <FiAlertCircle className="text-2xl text-red-400" />

              </div>

              <h2 className="mt-5 text-xl font-bold">
                Unable to load skills
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {error}
              </p>

              <button
                onClick={loadSkillGaps}
                className="mt-6 px-5 py-3 rounded-xl bg-orange-500 text-black font-bold hover:bg-orange-400 transition"
              >
                Try Again
              </button>

            </div>

          )}

          {/* ================= CONTENT ================= */}

          {!loading && !error && (

            <>

              {/* ================= SUMMARY ================= */}

              <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

                {/* Skills */}

                <div className="rounded-2xl bg-[#0C1220] border border-white/[0.08] p-5 hover:border-white/[0.15] transition">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm text-gray-600">
                        Skills Assessed
                      </p>

                      <p className="text-3xl font-black mt-2">
                        {skills.length}
                      </p>

                    </div>

                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">

                      <FiCheckCircle className="text-xl text-cyan-400" />

                    </div>

                  </div>

                  <p className="text-xs text-gray-700 mt-4">
                    Skills currently tracked
                  </p>

                </div>

                {/* Average */}

                <div className="rounded-2xl bg-[#0C1220] border border-white/[0.08] p-5 hover:border-white/[0.15] transition">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm text-gray-600">
                        Average Skill Level
                      </p>

                      <p className="text-3xl font-black mt-2">
                        {averageSkillLevel}%
                      </p>

                    </div>

                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center">

                      <FiTrendingUp className="text-xl text-emerald-400" />

                    </div>

                  </div>

                  <div className="mt-4 h-1.5 rounded-full bg-white/[0.07] overflow-hidden">

                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400"
                      style={{
                        width: `${Math.min(
                          Math.max(
                            averageSkillLevel,
                            0
                          ),
                          100
                        )}%`,
                      }}
                    />

                  </div>

                </div>

                {/* Focus */}

                <div className="rounded-2xl bg-[#0C1220] border border-white/[0.08] p-5 hover:border-white/[0.15] transition">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm text-gray-600">
                        Skills Needing Focus
                      </p>

                      <p className="text-3xl font-black mt-2">
                        {skillsNeedingFocus}
                      </p>

                    </div>

                    <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center">

                      <FiAlertCircle className="text-xl text-orange-400" />

                    </div>

                  </div>

                  <p className="text-xs text-gray-700 mt-4">
                    Skills with remaining gaps
                  </p>

                </div>

              </section>

              {/* ================= NO DATA ================= */}

              {skills.length === 0 ? (

                <section className="rounded-3xl bg-[#0C1220] border border-white/[0.08] p-12 text-center">

                  <div className="mx-auto w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">

                    <FiTarget className="text-3xl text-cyan-400" />

                  </div>

                  <h2 className="mt-5 text-xl font-bold">
                    No skill data available
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Complete an assessment to generate your skill gaps.
                  </p>

                </section>

              ) : (

                <>

                  {/* ================= SKILLS ================= */}

                  <section className="mb-8">

                    <div className="flex items-end justify-between mb-5">

                      <div>

                        <p className="text-xs text-cyan-400 uppercase tracking-[0.2em] font-bold">
                          Skill Tree
                        </p>

                        <h2 className="text-2xl sm:text-3xl font-bold mt-1">
                          Your Skills
                        </h2>

                        <p className="text-sm text-gray-600 mt-1">
                          Current level compared with your required level.
                        </p>

                      </div>

                      <span className="hidden sm:block text-xs text-gray-600">
                        {skills.length} Skills
                      </span>

                    </div>

                    <div className="space-y-4">

                      {skills.map((skill) => {

                        const current =
                          skill.currentLevel || 0;

                        const required =
                          skill.requiredLevel || 0;

                        const gap =
                          skill.gap || 0;

                        const status =
                          getStatus(skill);

                        const statusStyle =
                          getStatusStyle(status);

                        return (

                          <div
                            key={skill.id}
                            className="group rounded-2xl bg-[#0C1220] border border-white/[0.08] p-5 sm:p-6 hover:border-white/[0.15] transition-all duration-300"
                          >

                            <div className="flex flex-col lg:flex-row lg:items-center gap-5">

                              {/* Icon + Name */}

                              <div className="lg:w-56 shrink-0">

                                <div className="flex items-center gap-3">

                                  <div className="w-11 h-11 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center">

                                    <FiTarget className="text-cyan-400" />

                                  </div>

                                  <div>

                                    <h3 className="font-bold text-base sm:text-lg">
                                      {skill.skill?.name ||
                                        "Unknown Skill"}
                                    </h3>

                                    <span
                                      className={`
                                        inline-flex
                                        mt-1.5
                                        text-[10px]
                                        px-2.5
                                        py-1
                                        rounded-full
                                        border
                                        font-bold
                                        uppercase
                                        tracking-wider

                                        ${statusStyle.text}
                                        ${statusStyle.bg}
                                        ${statusStyle.border}
                                      `}
                                    >
                                      {status}
                                    </span>

                                  </div>

                                </div>

                              </div>

                              {/* Progress */}

                              <div className="flex-1 min-w-0">

                                <div className="flex justify-between items-center mb-2">

                                  <span className="text-xs text-gray-600 uppercase tracking-wider">
                                    Current Level
                                  </span>

                                  <span className="text-sm font-bold text-white">
                                    {current}%
                                  </span>

                                </div>

                                <div className="relative h-3 bg-white/[0.06] rounded-full overflow-hidden">

                                  {/* Required marker */}

                                  <div
                                    className="absolute top-0 bottom-0 w-px bg-white/40 z-10"
                                    style={{
                                      left: `${Math.min(
                                        Math.max(
                                          required,
                                          0
                                        ),
                                        100
                                      )}%`,
                                    }}
                                  />

                                  <div
                                    className={`
                                      h-full rounded-full
                                      transition-all duration-700

                                      ${
                                        status ===
                                        "Good"
                                          ? "bg-gradient-to-r from-emerald-500 to-cyan-400"
                                          : status ===
                                            "Improving"
                                          ? "bg-gradient-to-r from-cyan-500 to-blue-400"
                                          : "bg-gradient-to-r from-orange-500 to-yellow-300"
                                      }
                                    `}
                                    style={{
                                      width: `${Math.min(
                                        Math.max(
                                          current,
                                          0
                                        ),
                                        100
                                      )}%`,
                                    }}
                                  />

                                </div>

                                <div className="flex justify-between text-[10px] text-gray-600 mt-2">

                                  <span>
                                    Current: {current}%
                                  </span>

                                  <span>
                                    Required: {required}%
                                  </span>

                                </div>

                              </div>

                              {/* Gap */}

                              <div className="lg:w-28 lg:text-right shrink-0">

                                <p className="text-[10px] text-gray-600 uppercase tracking-wider">
                                  Skill Gap
                                </p>

                                <p
                                  className={`
                                    text-2xl font-black mt-1
                                    ${
                                      gap === 0
                                        ? "text-emerald-400"
                                        : "text-orange-400"
                                    }
                                  `}
                                >
                                  {gap}%
                                </p>

                              </div>

                            </div>

                          </div>

                        );
                      })}

                    </div>

                  </section>

                  {/* ================= AI RECOMMENDATION ================= */}

                  <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#18132B] via-[#111827] to-[#0C1220] border border-purple-400/20 p-6 sm:p-7">

                    <div className="absolute -right-24 -top-24 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl" />

                    <div className="relative flex flex-col lg:flex-row lg:items-center gap-5">

                      <div className="w-14 h-14 shrink-0 rounded-2xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center">

                        <FiTarget className="text-2xl text-purple-400" />

                      </div>

                      <div className="flex-1">

                        <p className="text-xs text-purple-400 uppercase tracking-[0.2em] font-bold">
                          AI Skill Recommendation
                        </p>

                        <h3 className="text-xl sm:text-2xl font-bold mt-2">

                          {recommendations.length > 0
                            ? `Focus on ${recommendations
                                .map(
                                  (skill) =>
                                    skill.skill
                                      ?.name
                                )
                                .join(
                                  " and "
                                )}`
                            : "Your skills are on track"}

                        </h3>

                        <p className="text-sm text-gray-500 mt-2 max-w-2xl leading-6">

                          {recommendations.length >
                          0
                            ? "These skills currently have the largest gaps compared with your target role."
                            : "You currently have no significant skill gaps."}

                        </p>

                      </div>

                      <Link
                        to="/roadmap"
                        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-500 text-black font-bold hover:bg-orange-400 transition whitespace-nowrap"
                      >
                        View Roadmap
                        <FiArrowRight />
                      </Link>

                    </div>

                  </section>

                </>

              )}

            </>

          )}

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

            <Link
              key={item.label}
              to={item.path}
              className={`
                flex flex-col items-center gap-1
                px-3 py-1.5 rounded-lg

                ${
                  item.path === "/skills"
                    ? "text-cyan-400"
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

            </Link>

          ))}

        </div>

      </div>

      <div className="lg:hidden h-16" />

    </div>
  );
}

export default Skills;