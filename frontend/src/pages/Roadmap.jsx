import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  FiActivity,
  FiArrowRight,
  FiBookOpen,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiHome,
  FiLock,
  FiMenu,
  FiMessageCircle,
  FiPlay,
  FiTarget,
  FiTrendingUp,
  FiUser,
  FiX,
  FiZap,
} from "react-icons/fi";

import { roadmapApi, roadmapTaskApi } from "../services/api";

function Roadmap() {
  const [roadmap, setRoadmap] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);
  const [error, setError] = useState("");

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    loadRoadmap();
  }, []);

  const loadRoadmap = async () => {
    try {
      setLoading(true);
      setError("");

      const profileId = localStorage.getItem("profileId");

      if (!profileId) {
        setError(
          "Learner profile not found. Please complete your profile first."
        );
        return;
      }

      let activeRoadmap;

      try {
        activeRoadmap = await roadmapApi.getActive(profileId);
      } catch (err) {
        activeRoadmap = null;
      }

      if (!activeRoadmap) {
        setGenerating(true);

        activeRoadmap = await roadmapApi.generate(profileId);

        setGenerating(false);
      }

      if (!activeRoadmap) {
        setError("Unable to generate your roadmap.");
        return;
      }

      setRoadmap(activeRoadmap);

      const roadmapTasks = await roadmapTaskApi.getByRoadmap(
        activeRoadmap.id
      );

      setTasks(
        Array.isArray(roadmapTasks)
          ? roadmapTasks
          : []
      );
    } catch (err) {
      console.error("Failed to load roadmap:", err);

      setError(
        err?.message ||
          "Unable to load or generate your roadmap."
      );
    } finally {
      setLoading(false);
      setGenerating(false);
    }
  };

  const refreshTasks = async () => {
    if (!roadmap?.id) return;

    const roadmapTasks =
      await roadmapTaskApi.getByRoadmap(roadmap.id);

    setTasks(
      Array.isArray(roadmapTasks)
        ? roadmapTasks
        : []
    );
  };

  const handleStartTask = async (taskId) => {
    try {
      setActionLoading(taskId);
      setError("");

      await roadmapTaskApi.start(taskId);

      await refreshTasks();
    } catch (err) {
      console.error("Failed to start task:", err);

      setError(
        err?.message ||
          "Unable to start the task."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      setActionLoading(taskId);
      setError("");

      await roadmapTaskApi.complete(taskId);

      await refreshTasks();
    } catch (err) {
      console.error("Failed to complete task:", err);

      setError(
        err?.message ||
          "Unable to complete the task."
      );
    } finally {
      setActionLoading(null);
    }
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "COMPLETED"
  ).length;

  const progress =
    tasks.length > 0
      ? Math.round(
          (completedTasks / tasks.length) * 100
        )
      : 0;

  const getTaskStatus = (task, index) => {
    if (task.status === "COMPLETED") {
      return "completed";
    }

    if (task.status === "IN_PROGRESS") {
      return "current";
    }

    if (index === 0) {
      return "current";
    }

    return "locked";
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

  if (loading || generating) {
    return (
      <div className="min-h-screen bg-[#060A12] text-white">

        <div className="flex min-h-screen">

          {/* Sidebar */}

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
                    flex items-center gap-3 h-12 px-3 rounded-xl mb-2
                    ${
                      item.path === "/roadmap"
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

          {/* Loading */}

          <main className="flex-1 flex items-center justify-center p-6">

            <div className="w-full max-w-xl rounded-3xl bg-[#0C1220] border border-white/[0.08] p-10 text-center">

              <div className="mx-auto mb-6 w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center">

                <FiBookOpen className="text-3xl text-orange-400 animate-pulse" />

              </div>

              <h2 className="text-2xl font-bold">
                {generating
                  ? "Generating your roadmap..."
                  : "Loading your roadmap..."}
              </h2>

              <p className="mt-3 text-sm text-gray-500 leading-6">

                {generating
                  ? "EduPath AI is creating a personalized roadmap from your skill gaps."
                  : "Please wait while we load your learning plan."}

              </p>

              <div className="mt-7 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">

                <div className="h-full w-[65%] rounded-full bg-gradient-to-r from-orange-500 to-yellow-300 animate-pulse" />

              </div>

            </div>

          </main>

        </div>
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (error && !roadmap) {
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
                    flex items-center gap-3 h-12 px-3 rounded-xl mb-2
                    ${
                      item.path === "/roadmap"
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

              <div className="mx-auto mb-5 w-14 h-14 rounded-2xl bg-red-500/10 border border-red-400/20 flex items-center justify-center">

                <FiBookOpen className="text-2xl text-red-400" />

              </div>

              <h2 className="text-2xl font-bold">
                Roadmap unavailable
              </h2>

              <p className="mt-3 text-sm text-gray-500 leading-6">
                {error}
              </p>

              <button
                onClick={loadRoadmap}
                className="mt-7 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-black hover:bg-orange-400 transition"
              >
                Try Again
              </button>

            </div>

          </main>

        </div>
      </div>
    );
  }

  /* ================= MAIN ROADMAP ================= */

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

            {(sidebarOpen || mobileSidebarOpen) && (
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
                sidebarOpen || mobileSidebarOpen
                  ? "block"
                  : "hidden"
              }
            `}
          >
            Main Menu
          </p>

          {navItems.map((item) => {

            const active =
              item.path === "/roadmap";

            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={closeMobileSidebar}
                title={!sidebarOpen ? item.label : ""}
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

              {/* Mobile */}

              <button
                onClick={() =>
                  setMobileSidebarOpen(true)
                }
                className="lg:hidden w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-gray-400 hover:text-white"
              >
                <FiMenu />
              </button>

              {/* Desktop */}

              <button
                onClick={() =>
                  setSidebarOpen(
                    (value) => !value
                  )
                }
                className="hidden lg:flex w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] items-center justify-center text-gray-400 hover:text-white"
              >
                <FiMenu />
              </button>

              <div>

                <p className="text-xs text-orange-400 uppercase tracking-[0.2em] font-bold">
                  Learning Journey
                </p>

                <p className="text-sm font-semibold text-gray-300 mt-1">
                  My Roadmap
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

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

              <div>

                <div className="flex items-center gap-2 mb-3">

                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

                  <p className="text-xs text-gray-500 uppercase tracking-[0.2em]">
                    Personalized Learning Plan
                  </p>

                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                  My Roadmap
                </h1>

                <p className="mt-3 max-w-2xl text-sm sm:text-base text-gray-500 leading-6">
                  Your personalized learning journey.
                  Complete each quest to unlock the next level.
                </p>

              </div>

              {roadmap && (
                <div className="flex items-center gap-3">

                  <div className="rounded-2xl bg-[#0C1220] border border-white/[0.08] px-5 py-4">

                    <p className="text-[10px] text-gray-600 uppercase tracking-wider">
                      Roadmap
                    </p>

                    <p className="text-xl font-bold mt-1">
                      v{roadmap.version || 1}
                    </p>

                  </div>

                  <div className="rounded-2xl bg-[#0C1220] border border-white/[0.08] px-5 py-4">

                    <p className="text-[10px] text-gray-600 uppercase tracking-wider">
                      Duration
                    </p>

                    <p className="text-xl font-bold mt-1">
                      {roadmap.durationDays || 7} Days
                    </p>

                  </div>

                </div>
              )}

            </div>

          </section>

          {/* Error */}

          {error && roadmap && (

            <div className="mb-6 rounded-2xl border border-red-400/20 bg-red-500/5 p-4 text-sm text-red-400">
              {error}
            </div>

          )}

          {/* ================= OVERVIEW ================= */}

          {roadmap && (

            <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

              {/* Progress */}

              <div className="md:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#101827] to-[#0C1220] border border-orange-400/15 p-6">

                <div className="absolute -right-20 -top-20 w-60 h-60 bg-orange-500/10 rounded-full blur-3xl" />

                <div className="relative">

                  <div className="flex items-start justify-between gap-4">

                    <div>

                      <p className="text-xs text-orange-400 uppercase tracking-[0.2em] font-bold">
                        Roadmap Progress
                      </p>

                      <h2 className="text-2xl font-bold mt-2">
                        {progress}% Complete
                      </h2>

                      <p className="text-sm text-gray-500 mt-2">
                        {completedTasks} of {tasks.length} quests completed
                      </p>

                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center">

                      <FiTrendingUp className="text-orange-400 text-2xl" />

                    </div>

                  </div>

                  <div className="mt-6">

                    <div className="h-3 rounded-full bg-white/[0.07] overflow-hidden">

                      <div
                        className="h-full rounded-full bg-gradient-to-r from-orange-500 to-yellow-300 transition-all duration-700"
                        style={{
                          width: `${progress}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>

              </div>

              {/* Tasks */}

              <div className="rounded-3xl bg-[#0C1220] border border-white/[0.08] p-6">

                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">

                  <FiCheckCircle className="text-cyan-400 text-xl" />

                </div>

                <p className="text-sm text-gray-600 mt-5">
                  Total Quests
                </p>

                <p className="text-3xl font-black mt-1">
                  {tasks.length}
                </p>

                <p className="text-xs text-gray-600 mt-2">
                  Keep completing quests to level up.
                </p>

              </div>

            </section>

          )}

          {/* ================= REASON ================= */}

          {roadmap?.reason && (

            <section className="mb-8">

              <div className="rounded-2xl bg-[#0C1220] border border-white/[0.08] p-6">

                <div className="flex items-start gap-4">

                  <div className="w-11 h-11 shrink-0 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center">

                    <FiTarget className="text-purple-400 text-xl" />

                  </div>

                  <div>

                    <p className="text-xs text-purple-400 uppercase tracking-[0.2em] font-bold">
                      AI Recommendation
                    </p>

                    <h2 className="text-lg font-bold mt-1">
                      Why this roadmap?
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                      {roadmap.reason}
                    </p>

                  </div>

                </div>

              </div>

            </section>

          )}

          {/* ================= QUEST HEADER ================= */}

          <section>

            <div className="flex items-end justify-between mb-5">

              <div>

                <p className="text-xs text-cyan-400 uppercase tracking-[0.2em] font-bold">
                  Your Missions
                </p>

                <h2 className="text-2xl sm:text-3xl font-bold mt-1">
                  Learning Quests
                </h2>

                <p className="text-sm text-gray-600 mt-2">
                  Complete quests in sequence to unlock your journey.
                </p>

              </div>

              <div className="hidden sm:flex items-center gap-2 text-xs text-gray-600">

                <FiClock />

                {tasks.length} Tasks

              </div>

            </div>

            {/* ================= TASKS ================= */}

            {tasks.length === 0 ? (

              <div className="rounded-3xl bg-[#0C1220] border border-white/[0.08] p-12 text-center">

                <div className="mx-auto w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center">

                  <FiBookOpen className="text-3xl text-orange-400" />

                </div>

                <h3 className="mt-5 text-xl font-bold">
                  No quests available yet
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  Your roadmap has been created.
                  Learning tasks will be generated next.
                </p>

              </div>

            ) : (

              <div className="relative">

                {/* Timeline */}

                <div className="absolute left-[27px] top-8 bottom-8 w-px bg-gradient-to-b from-orange-400/50 via-cyan-400/20 to-transparent hidden sm:block" />

                <div className="space-y-4">

                  {tasks.map((task, index) => {

                    const status =
                      getTaskStatus(
                        task,
                        index
                      );

                    const isLoading =
                      actionLoading === task.id;

                    return (

                      <div
                        key={task.id}
                        className={`
                          relative rounded-2xl
                          border p-5 sm:p-6
                          transition-all duration-300

                          ${
                            status === "current"
                              ? "bg-gradient-to-r from-[#111827] to-[#0C1220] border-orange-400/25 shadow-[0_10px_35px_rgba(249,115,22,0.06)]"
                              : status === "completed"
                              ? "bg-[#0A111A] border-emerald-400/10"
                              : "bg-[#090E17] border-white/[0.06]"
                          }
                        `}
                      >

                        <div className="flex items-start gap-4">

                          {/* Quest Icon */}

                          <div
                            className={`
                              relative z-10
                              w-12 h-12 shrink-0
                              rounded-xl
                              flex items-center justify-center
                              border

                              ${
                                status === "completed"
                                  ? "bg-emerald-500/10 border-emerald-400/20 text-emerald-400"
                                  : status === "current"
                                  ? "bg-orange-500/10 border-orange-400/25 text-orange-400"
                                  : "bg-white/[0.03] border-white/[0.07] text-gray-600"
                              }
                            `}
                          >

                            {status === "completed" ? (
                              <FiCheckCircle className="text-xl" />
                            ) : status === "current" ? (
                              <FiPlay className="text-xl" />
                            ) : (
                              <FiLock className="text-xl" />
                            )}

                          </div>

                          {/* Content */}

                          <div className="flex-1 min-w-0">

                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">

                              <div>

                                <div className="flex flex-wrap items-center gap-2">

                                  <span
                                    className={`
                                      text-[10px]
                                      uppercase
                                      tracking-[0.15em]
                                      font-bold

                                      ${
                                        status === "completed"
                                          ? "text-emerald-400"
                                          : status === "current"
                                          ? "text-orange-400"
                                          : "text-gray-600"
                                      }
                                    `}
                                  >
                                    Day{" "}
                                    {task.dayNumber ||
                                      index + 1}
                                  </span>

                                  {status ===
                                    "current" && (
                                    <span className="rounded-full bg-orange-500/10 border border-orange-400/20 px-2.5 py-1 text-[9px] text-orange-400 font-bold">
                                      CURRENT QUEST
                                    </span>
                                  )}

                                  {status ===
                                    "completed" && (
                                    <span className="rounded-full bg-emerald-500/10 border border-emerald-400/15 px-2.5 py-1 text-[9px] text-emerald-400 font-bold">
                                      COMPLETED
                                    </span>
                                  )}

                                  {status ===
                                    "locked" && (
                                    <span className="rounded-full bg-white/[0.04] border border-white/[0.06] px-2.5 py-1 text-[9px] text-gray-600 font-bold">
                                      LOCKED
                                    </span>
                                  )}

                                </div>

                                <h3 className="mt-2 text-lg sm:text-xl font-bold">

                                  {task.title ||
                                    "Learning Task"}

                                </h3>

                              </div>

                              <div className="flex items-center gap-2 shrink-0">

                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">

                                  <FiClock className="text-gray-600 text-xs" />

                                  <span className="text-xs text-gray-500">

                                    {task.estimatedMinutes ||
                                      30}{" "}
                                    min

                                  </span>

                                </div>

                              </div>

                            </div>

                            {/* Description */}

                            {task.description && (

                              <p className="mt-3 text-sm leading-6 text-gray-500 max-w-3xl">

                                {task.description}

                              </p>

                            )}

                            {/* Skill */}

                            {task.skill?.name && (

                              <div className="mt-4 inline-flex items-center gap-2">

                                <span className="text-[10px] text-gray-600 uppercase tracking-wider">
                                  Skill
                                </span>

                                <span className="text-xs text-cyan-400 font-medium">
                                  {task.skill.name}
                                </span>

                              </div>

                            )}

                            {/* Actions */}

                            <div className="mt-5">

                              {status ===
                                "current" && (

                                <div className="flex flex-wrap gap-3">

                                  {task.status ===
                                    "IN_PROGRESS" ? (

                                    <button
                                      onClick={() =>
                                        handleCompleteTask(
                                          task.id
                                        )
                                      }
                                      disabled={
                                        isLoading
                                      }
                                      className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-black hover:bg-emerald-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >

                                      <FiCheckCircle />

                                      {isLoading
                                        ? "Completing..."
                                        : "Complete Quest"}

                                      <FiArrowRight />

                                    </button>

                                  ) : (

                                    <button
                                      onClick={() =>
                                        handleStartTask(
                                          task.id
                                        )
                                      }
                                      disabled={
                                        isLoading
                                      }
                                      className="inline-flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-bold text-black hover:bg-orange-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
                                    >

                                      <FiPlay />

                                      {isLoading
                                        ? "Starting..."
                                        : "Start Quest"}

                                      <FiArrowRight />

                                    </button>

                                  )}

                                </div>

                              )}

                              {status ===
                                "completed" && (

                                <div className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400">

                                  <FiCheckCircle />

                                  Quest Completed

                                </div>

                              )}

                              {status ===
                                "locked" && (

                                <div className="inline-flex items-center gap-2 text-sm text-gray-600">

                                  <FiLock />

                                  Complete the previous quest to unlock

                                </div>

                              )}

                            </div>

                          </div>

                        </div>

                      </div>

                    );
                  })}

                </div>

              </div>

            )}

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

            <Link
              key={item.label}
              to={item.path}
              className={`
                flex flex-col items-center gap-1
                px-3 py-1.5 rounded-lg

                ${
                  item.path === "/roadmap"
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

            </Link>

          ))}

        </div>

      </div>

      <div className="lg:hidden h-16" />

    </div>
  );
}

export default Roadmap;