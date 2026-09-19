import { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiTarget,
  FiTrendingUp,
  FiZap,
  FiArrowUpRight,
} from "react-icons/fi";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { progressApi, skillGapApi } from "../services/api";

function Progress() {
  const [progress, setProgress] = useState(null);
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const profileId = localStorage.getItem("profileId");

  useEffect(() => {
    loadProgress();
  }, []);

  async function loadProgress() {
    try {
      setLoading(true);
      setError("");

      if (!profileId) {
        setError("Profile not found. Please login again.");
        return;
      }

      const [progressData, skillGapData] = await Promise.all([
        progressApi.getLatest(profileId),
        skillGapApi.getByLearner(profileId),
      ]);

      setProgress(progressData);

      const formattedSkills = Array.isArray(skillGapData)
        ? skillGapData.map((gap) => ({
            name: gap.skill?.name || "Unknown Skill",
            progress: Math.min(
              Math.max(gap.currentLevel || 0, 0),
              100
            ),
            required: gap.requiredLevel || 0,
            gap: gap.gap || 0,
          }))
        : [];

      setSkills(formattedSkills);
    } catch (err) {
      console.error(err);

      setError(
        err.message || "Unable to load progress data."
      );
    } finally {
      setLoading(false);
    }
  }

  const completedTasks =
    progress?.completedTasks || 0;

  const totalTasks =
    progress?.totalTasks || 0;

  const completionPercentage =
    progress?.completionPercentage || 0;

  const currentStreak =
    progress?.currentStreak || 0;

  const remainingTasks =
    Math.max(
      totalTasks - completedTasks,
      0
    );

  const weeklyData = [
    {
      day: "Mon",
      progress: completionPercentage,
    },
    {
      day: "Tue",
      progress: completionPercentage,
    },
    {
      day: "Wed",
      progress: completionPercentage,
    },
    {
      day: "Thu",
      progress: completionPercentage,
    },
    {
      day: "Fri",
      progress: completionPercentage,
    },
    {
      day: "Sat",
      progress: completionPercentage,
    },
    {
      day: "Sun",
      progress: completionPercentage,
    },
  ];

  const statCards = [
    {
      title: "Overall Progress",
      value: `${Math.round(
        completionPercentage
      )}%`,
      icon: FiTrendingUp,
      iconClass:
        "text-orange-400 bg-orange-500/10",
    },
    {
      title: "Completed Tasks",
      value: completedTasks,
      icon: FiCheckCircle,
      iconClass:
        "text-cyan-400 bg-cyan-500/10",
    },
    {
      title: "Study Streak",
      value: `${currentStreak} ${
        currentStreak === 1
          ? "Day"
          : "Days"
      }`,
      icon: FiClock,
      iconClass:
        "text-purple-400 bg-purple-500/10",
    },
    {
      title: "Tasks Remaining",
      value: remainingTasks,
      icon: FiTarget,
      iconClass:
        "text-blue-400 bg-blue-500/10",
    },
  ];

  return (
    <div className="min-h-screen bg-[#050816] text-white">

      <div className="flex min-h-screen">

        {/* ================= SIDEBAR ================= */}
        <Sidebar />

        <div className="flex-1 min-w-0">

          {/* ================= NAVBAR ================= */}
          <Navbar />

          <main className="relative min-h-screen overflow-hidden">

            {/* Background Glow */}
            <div className="pointer-events-none absolute -top-40 right-0 w-96 h-96 rounded-full bg-orange-500/10 blur-3xl" />

            <div className="pointer-events-none absolute top-[45%] -left-40 w-96 h-96 rounded-full bg-purple-600/10 blur-3xl" />

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

              {/* ================= HEADER ================= */}

              <section className="mb-8">

                <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">

                  <div>

                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 text-orange-400 text-xs font-semibold tracking-wider mb-4">

                      <FiZap />

                      LEARNING ANALYTICS

                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">

                      Your{" "}

                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-300 to-yellow-300">

                        Progress

                      </span>

                    </h1>

                    <p className="text-slate-400 mt-3 max-w-2xl text-sm sm:text-base">

                      Track your learning journey,
                      completed quests and skill
                      development.

                    </p>

                  </div>

                  <div className="flex items-center gap-3">

                    <div className="hidden sm:block px-4 py-3 rounded-2xl border border-white/10 bg-white/[0.03]">

                      <p className="text-[10px] uppercase tracking-widest text-slate-500">

                        Current Level

                      </p>

                      <p className="text-lg font-bold text-white mt-1">

                        Learning Mode

                      </p>

                    </div>

                    <div className="w-12 h-12 rounded-2xl border border-orange-500/20 bg-orange-500/10 flex items-center justify-center">

                      <FiTrendingUp className="text-orange-400 text-xl" />

                    </div>

                  </div>

                </div>

              </section>

              {/* ================= LOADING ================= */}

              {loading && (

                <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">

                  <div className="w-10 h-10 mx-auto rounded-full border-2 border-orange-500/20 border-t-orange-400 animate-spin mb-4" />

                  <p className="text-slate-400">

                    Loading your progress...

                  </p>

                </div>

              )}

              {/* ================= ERROR ================= */}

              {!loading && error && (

                <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6">

                  <p className="text-red-400">

                    {error}

                  </p>

                </div>

              )}

              {/* ================= CONTENT ================= */}

              {!loading && !error && (

                <>

                  {/* ================= STATS ================= */}

                  <section className="grid grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-5 mb-6">

                    {statCards.map((stat) => {

                      const Icon = stat.icon;

                      return (

                        <div
                          key={stat.title}
                          className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#0b1020]/80 p-4 sm:p-5 transition-all duration-300 hover:border-orange-500/20 hover:-translate-y-0.5"
                        >

                          <div className="flex items-start justify-between gap-3">

                            <div>

                              <p className="text-xs sm:text-sm text-slate-500">

                                {stat.title}

                              </p>

                              <p className="text-2xl sm:text-3xl font-bold text-white mt-2">

                                {stat.value}

                              </p>

                            </div>

                            <div
                              className={`w-10 h-10 sm:w-11 sm:h-11 shrink-0 rounded-xl flex items-center justify-center ${stat.iconClass}`}
                            >

                              <Icon className="text-lg" />

                            </div>

                          </div>

                          <div className="absolute -bottom-10 -right-10 w-24 h-24 rounded-full bg-orange-500/5 blur-2xl group-hover:bg-orange-500/10 transition-all" />

                        </div>

                      );
                    })}

                  </section>

                  {/* ================= CHART + ROADMAP ================= */}

                  <section className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">

                    {/* WEEKLY PROGRESS */}

                    <div className="xl:col-span-2 rounded-3xl border border-white/10 bg-[#0b1020]/80 p-5 sm:p-6">

                      <div className="flex items-start justify-between mb-6">

                        <div>

                          <div className="flex items-center gap-2">

                            <h2 className="text-lg sm:text-xl font-semibold">

                              Weekly Progress

                            </h2>

                            <FiArrowUpRight className="text-orange-400" />

                          </div>

                          <p className="text-sm text-slate-500 mt-1">

                            Current roadmap completion
                            level.

                          </p>

                        </div>

                        <div className="px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-semibold">

                          {Math.round(
                            completionPercentage
                          )}
                          %

                        </div>

                      </div>

                      <div className="w-full h-72">

                        <ResponsiveContainer
                          width="100%"
                          height="100%"
                        >

                          <LineChart
                            data={weeklyData}
                            margin={{
                              top: 5,
                              right: 10,
                              left: -20,
                              bottom: 5,
                            }}
                          >

                            <CartesianGrid
                              stroke="rgba(255,255,255,0.06)"
                              strokeDasharray="3 3"
                            />

                            <XAxis
                              dataKey="day"
                              tick={{
                                fill: "#64748b",
                                fontSize: 12,
                              }}
                              axisLine={false}
                              tickLine={false}
                            />

                            <YAxis
                              domain={[0, 100]}
                              tick={{
                                fill: "#64748b",
                                fontSize: 12,
                              }}
                              axisLine={false}
                              tickLine={false}
                            />

                            <Tooltip
                              contentStyle={{
                                background:
                                  "#0b1020",
                                border:
                                  "1px solid rgba(255,255,255,0.1)",
                                borderRadius:
                                  "12px",
                                color: "#ffffff",
                              }}
                              labelStyle={{
                                color: "#94a3b8",
                              }}
                              formatter={(value) => [
                                `${value}%`,
                                "Progress",
                              ]}
                            />

                            <Line
                              type="monotone"
                              dataKey="progress"
                              stroke="#f97316"
                              strokeWidth={3}
                              dot={{
                                r: 4,
                                fill: "#f97316",
                                strokeWidth: 0,
                              }}
                              activeDot={{
                                r: 6,
                                fill: "#fb923c",
                              }}
                            />

                          </LineChart>

                        </ResponsiveContainer>

                      </div>

                    </div>

                    {/* ROADMAP PROGRESS */}

                    <div className="rounded-3xl border border-white/10 bg-[#0b1020]/80 p-5 sm:p-6">

                      <h2 className="text-lg sm:text-xl font-semibold">

                        Roadmap Progress

                      </h2>

                      <p className="text-sm text-slate-500 mt-1">

                        Current learning plan

                      </p>

                      <div className="mt-7 flex justify-center">

                        <div
                          className="relative w-44 h-44 rounded-full flex items-center justify-center"
                          style={{
                            background: `conic-gradient(
                              #f97316 ${
                                completionPercentage *
                                3.6
                              }deg,
                              rgba(255,255,255,0.07) 0deg
                            )`,
                            boxShadow:
                              "0 0 45px rgba(249,115,22,0.12)",
                          }}
                        >

                          <div className="absolute inset-[7px] rounded-full bg-[#090e1d] flex items-center justify-center">

                            <div className="text-center">

                              <p className="text-4xl font-bold text-white">

                                {Math.round(
                                  completionPercentage
                                )}
                                %

                              </p>

                              <p className="text-xs uppercase tracking-widest text-slate-500 mt-1">

                                Completed

                              </p>

                            </div>

                          </div>

                        </div>

                      </div>

                      <div className="mt-8 space-y-3">

                        <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5">

                          <span className="text-sm text-slate-400">

                            Completed

                          </span>

                          <span className="font-semibold text-white">

                            {completedTasks}

                          </span>

                        </div>

                        <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5">

                          <span className="text-sm text-slate-400">

                            Remaining

                          </span>

                          <span className="font-semibold text-orange-400">

                            {remainingTasks}

                          </span>

                        </div>

                        <div className="flex items-center justify-between px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5">

                          <span className="text-sm text-slate-400">

                            Total Tasks

                          </span>

                          <span className="font-semibold text-white">

                            {totalTasks}

                          </span>

                        </div>

                      </div>

                    </div>

                  </section>

                  {/* ================= SKILL PROGRESS ================= */}

                  <section className="rounded-3xl border border-white/10 bg-[#0b1020]/80 p-5 sm:p-6">

                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-7">

                      <div>

                        <div className="flex items-center gap-2">

                          <h2 className="text-lg sm:text-xl font-semibold">

                            Skill Progress

                          </h2>

                          <FiZap className="text-orange-400" />

                        </div>

                        <p className="text-sm text-slate-500 mt-1">

                          Your current progress across
                          important skills.

                        </p>

                      </div>

                      <span className="text-xs text-slate-500">

                        {skills.length} skills tracked

                      </span>

                    </div>

                    {skills.length === 0 ? (

                      <div className="text-center py-10 rounded-2xl border border-dashed border-white/10">

                        <FiTarget className="mx-auto text-2xl text-slate-600 mb-3" />

                        <p className="text-slate-500">

                          No skill progress available
                          yet.

                        </p>

                      </div>

                    ) : (

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">

                        {skills.map((skill) => (

                          <div key={skill.name}>

                            <div className="flex items-center justify-between mb-3">

                              <div className="flex items-center gap-2">

                                <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center">

                                  <FiZap className="text-orange-400 text-sm" />

                                </div>

                                <span className="text-sm font-medium text-slate-200">

                                  {skill.name}

                                </span>

                              </div>

                              <span className="text-sm font-semibold text-orange-400">

                                {skill.progress}%

                              </span>

                            </div>

                            <div className="h-2 bg-white/[0.07] rounded-full overflow-hidden">

                              <div
                                className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-300 transition-all duration-700"
                                style={{
                                  width: `${skill.progress}%`,
                                }}
                              />

                            </div>

                            <div className="flex items-center justify-between mt-2">

                              <span className="text-xs text-slate-600">

                                Required:{" "}
                                {skill.required}%

                              </span>

                              <span
                                className={`text-xs ${
                                  skill.gap > 0
                                    ? "text-red-400"
                                    : "text-emerald-400"
                                }`}
                              >

                                Gap: {skill.gap}%

                              </span>

                            </div>

                          </div>

                        ))}

                      </div>

                    )}

                  </section>

                </>

              )}

            </div>

          </main>

        </div>

      </div>

    </div>
  );
}

export default Progress;