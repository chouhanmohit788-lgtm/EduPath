import { useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiClock,
  FiTarget,
  FiTrendingUp,
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

      const [progressData, skillGapData] =
        await Promise.all([
          progressApi.getLatest(profileId),
          skillGapApi.getByLearner(profileId),
        ]);

      setProgress(progressData);

      const formattedSkills =
        Array.isArray(skillGapData)
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
        err.message ||
          "Unable to load progress data."
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
    Math.max(totalTasks - completedTasks, 0);

  /*
   * Backend currently stores the latest progress
   * snapshot, not a daily history.
   *
   * Therefore the chart represents the current
   * completion level instead of fake hardcoded data.
   */
  const weeklyData = [
    { day: "Mon", progress: completionPercentage },
    { day: "Tue", progress: completionPercentage },
    { day: "Wed", progress: completionPercentage },
    { day: "Thu", progress: completionPercentage },
    { day: "Fri", progress: completionPercentage },
    { day: "Sat", progress: completionPercentage },
    { day: "Sun", progress: completionPercentage },
  ];

  return (
    <div className="min-h-screen bg-[#F7F5F0] text-[#111111]">

      <div className="flex min-h-screen">

        {/* Sidebar */}
        <Sidebar />

        <div className="flex-1 min-w-0">

          {/* Navbar */}
          <Navbar />

          <main className="max-w-7xl mx-auto px-6 py-10">

            {/* Header */}
            <section className="mb-8">

              <div className="flex items-center gap-3 mb-3">

                <div className="w-11 h-11 rounded-xl bg-white border border-[#E5E1D8] flex items-center justify-center">
                  <FiTrendingUp className="text-xl text-[#C47A32]" />
                </div>

                <div>

                  <p className="text-sm text-[#6B6B63]">
                    Track your learning journey
                  </p>

                  <h1 className="text-3xl md:text-4xl font-bold">
                    Progress
                  </h1>

                </div>

              </div>

              <p className="text-[#6B6B63] max-w-2xl">
                Monitor your learning progress, completed
                tasks and skill development over time.
              </p>

            </section>

            {/* Loading */}
            {loading && (
              <div className="bg-white border border-[#E5E1D8] rounded-2xl p-8 text-center mb-8">
                <p className="text-[#6B6B63]">
                  Loading your progress...
                </p>
              </div>
            )}

            {/* Error */}
            {!loading && error && (
              <div className="bg-white border border-red-200 rounded-2xl p-6 mb-8">
                <p className="text-red-600">
                  {error}
                </p>
              </div>
            )}

            {!loading && !error && (
              <>

                {/* Stats */}
                <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">

                  {/* Overall Progress */}
                  <div className="bg-white border border-[#E5E1D8] rounded-2xl p-5">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-sm text-[#6B6B63]">
                          Overall Progress
                        </p>

                        <p className="text-3xl font-bold mt-2">
                          {Math.round(
                            completionPercentage
                          )}%
                        </p>

                      </div>

                      <div className="w-11 h-11 rounded-xl bg-[#F7F5F0] flex items-center justify-center">
                        <FiTrendingUp className="text-xl text-[#C47A32]" />
                      </div>

                    </div>

                  </div>

                  {/* Completed Tasks */}
                  <div className="bg-white border border-[#E5E1D8] rounded-2xl p-5">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-sm text-[#6B6B63]">
                          Completed Tasks
                        </p>

                        <p className="text-3xl font-bold mt-2">
                          {completedTasks}
                        </p>

                      </div>

                      <div className="w-11 h-11 rounded-xl bg-[#F7F5F0] flex items-center justify-center">
                        <FiCheckCircle className="text-xl text-[#C47A32]" />
                      </div>

                    </div>

                  </div>

                  {/* Study Streak */}
                  <div className="bg-white border border-[#E5E1D8] rounded-2xl p-5">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-sm text-[#6B6B63]">
                          Study Streak
                        </p>

                        <p className="text-3xl font-bold mt-2">
                          {currentStreak}{" "}
                          {currentStreak === 1
                            ? "Day"
                            : "Days"}
                        </p>

                      </div>

                      <div className="w-11 h-11 rounded-xl bg-[#F7F5F0] flex items-center justify-center">
                        <FiClock className="text-xl text-[#C47A32]" />
                      </div>

                    </div>

                  </div>

                  {/* Remaining */}
                  <div className="bg-white border border-[#E5E1D8] rounded-2xl p-5">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-sm text-[#6B6B63]">
                          Tasks Remaining
                        </p>

                        <p className="text-3xl font-bold mt-2">
                          {remainingTasks}
                        </p>

                      </div>

                      <div className="w-11 h-11 rounded-xl bg-[#F7F5F0] flex items-center justify-center">
                        <FiTarget className="text-xl text-[#C47A32]" />
                      </div>

                    </div>

                  </div>

                </section>

                {/* Chart + Roadmap Progress */}
                <section className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

                  {/* Weekly Chart */}
                  <div className="xl:col-span-2 bg-white border border-[#E5E1D8] rounded-2xl p-6">

                    <div className="mb-6">

                      <h2 className="text-xl font-semibold">
                        Weekly Progress
                      </h2>

                      <p className="text-sm text-[#6B6B63] mt-1">
                        Current roadmap completion level.
                      </p>

                    </div>

                    <div className="w-full h-72">

                      <ResponsiveContainer
                        width="100%"
                        height="100%"
                      >

                        <LineChart data={weeklyData}>

                          <CartesianGrid
                            stroke="#E5E1D8"
                            strokeDasharray="3 3"
                          />

                          <XAxis
                            dataKey="day"
                            tick={{
                              fill: "#6B6B63",
                              fontSize: 12,
                            }}
                            axisLine={false}
                            tickLine={false}
                          />

                          <YAxis
                            domain={[0, 100]}
                            tick={{
                              fill: "#6B6B63",
                              fontSize: 12,
                            }}
                            axisLine={false}
                            tickLine={false}
                          />

                          <Tooltip />

                          <Line
                            type="monotone"
                            dataKey="progress"
                            stroke="#111111"
                            strokeWidth={3}
                            dot={{
                              r: 4,
                              fill: "#111111",
                            }}
                          />

                        </LineChart>

                      </ResponsiveContainer>

                    </div>

                  </div>

                  {/* Roadmap Progress */}
                  <div className="bg-white border border-[#E5E1D8] rounded-2xl p-6">

                    <h2 className="text-xl font-semibold">
                      Roadmap Progress
                    </h2>

                    <p className="text-sm text-[#6B6B63] mt-1">
                      Current learning plan
                    </p>

                    <div className="mt-8 flex items-center justify-center">

                      <div
                        className="relative w-40 h-40 rounded-full flex items-center justify-center"
                        style={{
                          background: `conic-gradient(
                            #111111 ${
                              completionPercentage * 3.6
                            }deg,
                            #E5E1D8 0deg
                          )`,
                        }}
                      >

                        <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center">

                          <div className="text-center">

                            <p className="text-3xl font-bold">
                              {Math.round(
                                completionPercentage
                              )}%
                            </p>

                            <p className="text-xs text-[#6B6B63]">
                              Completed
                            </p>

                          </div>

                        </div>

                      </div>

                    </div>

                    <div className="mt-8 space-y-4">

                      <div className="flex justify-between text-sm">

                        <span className="text-[#6B6B63]">
                          Completed
                        </span>

                        <span className="font-semibold">
                          {completedTasks} tasks
                        </span>

                      </div>

                      <div className="flex justify-between text-sm">

                        <span className="text-[#6B6B63]">
                          Remaining
                        </span>

                        <span className="font-semibold">
                          {remainingTasks} tasks
                        </span>

                      </div>

                      <div className="flex justify-between text-sm">

                        <span className="text-[#6B6B63]">
                          Total
                        </span>

                        <span className="font-semibold">
                          {totalTasks} tasks
                        </span>

                      </div>

                    </div>

                  </div>

                </section>

                {/* Skill Progress */}
                <section className="bg-white border border-[#E5E1D8] rounded-2xl p-6">

                  <div className="mb-6">

                    <h2 className="text-xl font-semibold">
                      Skill Progress
                    </h2>

                    <p className="text-sm text-[#6B6B63] mt-1">
                      Your current progress across important
                      skills.
                    </p>

                  </div>

                  {skills.length === 0 ? (

                    <div className="text-center py-8">

                      <p className="text-[#6B6B63]">
                        No skill progress available yet.
                      </p>

                    </div>

                  ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                      {skills.map((skill) => (

                        <div key={skill.name}>

                          <div className="flex justify-between mb-2">

                            <span className="text-sm font-medium">
                              {skill.name}
                            </span>

                            <span className="text-sm text-[#6B6B63]">
                              {skill.progress}%
                            </span>

                          </div>

                          <div className="h-2 bg-[#E5E1D8] rounded-full overflow-hidden">

                            <div
                              className="h-full bg-[#111111] rounded-full"
                              style={{
                                width: `${skill.progress}%`,
                              }}
                            />

                          </div>

                          <div className="flex justify-between mt-1">

                            <span className="text-xs text-[#6B6B63]">
                              Required: {skill.required}%
                            </span>

                            <span className="text-xs text-[#6B6B63]">
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

          </main>

        </div>
      </div>

    </div>
  );
}

export default Progress;