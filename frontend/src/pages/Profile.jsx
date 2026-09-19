import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiBookOpen,
  FiClock,
  FiTarget,
  FiUser,
  FiMenu,
  FiX,
  FiHome,
  FiMap,
  FiZap,
  FiBarChart2,
  FiCpu,
  FiUserCheck,
  FiAward,
  FiSearch,
} from "react-icons/fi";

import { profileApi, targetRoleApi } from "../services/api";

function Profile() {
  const navigate = useNavigate();

  const savedUser = JSON.parse(
    localStorage.getItem("user") || "null"
  );

  const [education, setEducation] = useState("");
  const [experienceLevel, setExperienceLevel] =
    useState("Beginner");
  const [targetRoleId, setTargetRoleId] = useState("");
  const [studyHours, setStudyHours] = useState("10");
  const [careerGoal, setCareerGoal] = useState("");

  const [targetRoles, setTargetRoles] = useState([]);
  const [profileId, setProfileId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] =
    useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!savedUser?.id) {
        setError("Please login again.");
        setLoading(false);
        return;
      }

      try {
        const roles = await targetRoleApi.getAll();
        setTargetRoles(roles);

        try {
          const profile =
            await profileApi.getByUserId(
              savedUser.id
            );

          setProfileId(profile.id);

          localStorage.setItem(
            "profileId",
            profile.id
          );

          setEducation(
            profile.education || ""
          );

          setExperienceLevel(
            profile.experienceLevel ||
              "Beginner"
          );

          setTargetRoleId(
            profile.targetRoleId || ""
          );

          setStudyHours(
            profile.studyHoursPerWeek?.toString() ||
              "10"
          );

          setCareerGoal(
            profile.careerGoal || ""
          );
        } catch (profileError) {
          console.log(
            "No existing profile found."
          );
        }
      } catch (error) {
        setError(
          error.message ||
            "Unable to load profile data."
        );
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [savedUser?.id]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!savedUser?.id) {
      setError("Please login again.");
      return;
    }

    if (!targetRoleId) {
      setError(
        "Please select a target role."
      );
      return;
    }

    setError("");
    setSaved(false);
    setSaving(true);

    const profileData = {
      education,
      experienceLevel,
      targetRoleId,
      studyHoursPerWeek:
        Number(studyHours),
      careerGoal,
    };

    try {
      if (profileId) {
        const response =
          await profileApi.update({
            id: profileId,
            user: {
              id: savedUser.id,
            },
            ...profileData,
          });

        localStorage.setItem(
          "profileId",
          response?.id || profileId
        );
      } else {
        const response =
          await profileApi.create({
            user: {
              id: savedUser.id,
            },
            ...profileData,
          });

        setProfileId(response.id);

        localStorage.setItem(
          "profileId",
          response.id
        );
      }

      setSaved(true);
    } catch (error) {
      setError(
        error.message ||
          "Failed to save profile."
      );
    } finally {
      setSaving(false);
    }
  };

  const navItems = [
    {
      label: "Dashboard",
      icon: FiHome,
      path: "/dashboard",
    },
    {
      label: "My Roadmap",
      icon: FiMap,
      path: "/roadmap",
    },
    {
      label: "Skills",
      icon: FiTarget,
      path: "/skills",
    },
    {
      label: "Assessment",
      icon: FiZap,
      path: "/assessment",
    },
    {
      label: "Progress",
      icon: FiBarChart2,
      path: "/progress",
    },
    {
      label: "AI Assistant",
      icon: FiCpu,
      path: "/ai-assistant",
    },
    {
      label: "Profile",
      icon: FiUserCheck,
      path: "/profile",
      active: true,
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050811] text-white flex items-center justify-center">

        <div className="text-center">

          <div className="relative w-16 h-16 mx-auto mb-5">

            <div className="absolute inset-0 rounded-2xl bg-orange-500/20 blur-xl animate-pulse" />

            <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-purple-600 flex items-center justify-center shadow-[0_0_30px_rgba(249,115,22,0.3)]">

              <FiUser size={25} />

            </div>

          </div>

          <p className="text-sm text-slate-400">
            Loading your profile...
          </p>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050811] text-white">

      {/* ================= SIDEBAR ================= */}

      <aside
        className={`
          fixed z-50 top-0 left-0 h-screen
          bg-[#080D18]/95 backdrop-blur-xl
          border-r border-white/[0.07]
          transition-all duration-300
          ${
            sidebarCollapsed
              ? "w-[82px]"
              : "w-[250px]"
          }
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* Logo */}

        <div className="h-[76px] flex items-center px-5 border-b border-white/[0.06]">

          <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shadow-[0_0_25px_rgba(249,115,22,0.3)]">
            <FiZap size={20} />
          </div>

          {!sidebarCollapsed && (
            <div className="ml-3">
              <h1 className="font-bold text-lg tracking-wide">
                EduPath
              </h1>

              <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">
                Level Up
              </p>
            </div>
          )}

          <button
            onClick={() =>
              setSidebarOpen(false)
            }
            className="ml-auto lg:hidden text-slate-400 hover:text-white"
          >
            <FiX size={20} />
          </button>

        </div>

        {/* Navigation */}

        <nav className="p-4 space-y-2">

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                onClick={() =>
                  navigate(item.path)
                }
                className={`
                  group relative w-full
                  flex items-center
                  ${
                    sidebarCollapsed
                      ? "justify-center"
                      : "gap-3"
                  }
                  px-3 py-3 rounded-xl
                  transition-all duration-200
                  ${
                    item.active
                      ? "bg-gradient-to-r from-orange-500/20 to-orange-500/5 text-orange-400 border border-orange-500/20"
                      : "text-slate-400 hover:text-white hover:bg-white/[0.04]"
                  }
                `}
              >

                {item.active && (
                  <span className="absolute left-0 top-2 bottom-2 w-[3px] rounded-r-full bg-orange-500 shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
                )}

                <Icon size={19} />

                {!sidebarCollapsed && (
                  <span className="text-sm font-medium">
                    {item.label}
                  </span>
                )}

              </button>
            );
          })}

        </nav>

        {/* Collapse */}

        <button
          onClick={() =>
            setSidebarCollapsed(
              !sidebarCollapsed
            )
          }
          className="hidden lg:flex absolute bottom-5 left-4 right-4 h-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] text-slate-500 hover:text-white transition"
        >
          {sidebarCollapsed
            ? "→"
            : "← Collapse"}
        </button>

      </aside>

      {/* Mobile overlay */}

      {sidebarOpen && (
        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ================= MAIN ================= */}

      <div
        className={`
          min-h-screen transition-all duration-300
          ${
            sidebarCollapsed
              ? "lg:ml-[82px]"
              : "lg:ml-[250px]"
          }
        `}
      >

        {/* ================= TOP BAR ================= */}

        <header className="h-[76px] px-4 sm:px-6 flex items-center justify-between border-b border-white/[0.06] bg-[#050811]/90 backdrop-blur-xl sticky top-0 z-30">

          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                setSidebarOpen(true)
              }
              className="lg:hidden w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.07] flex items-center justify-center text-slate-300"
            >
              <FiMenu size={20} />
            </button>

            {/* Search */}

            <div className="hidden sm:flex items-center gap-2 w-56 lg:w-72 h-10 px-3 rounded-xl bg-white/[0.035] border border-white/[0.07] text-slate-500">
              <FiSearch size={16} />

              <span className="text-xs">
                Search your journey...
              </span>
            </div>

          </div>

          <div className="flex items-center gap-3">

            {/* XP */}

            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20">

              <FiAward
                size={15}
                className="text-purple-400"
              />

              <span className="text-xs font-semibold text-purple-300">
                1,240 XP
              </span>

            </div>

            {/* Profile */}

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-purple-500 flex items-center justify-center font-bold text-sm shadow-[0_0_18px_rgba(249,115,22,0.2)]">
              {savedUser?.name
                ?.charAt(0)
                ?.toUpperCase() || "M"}
            </div>

          </div>

        </header>

        {/* ================= CONTENT ================= */}

        <main className="max-w-[1100px] mx-auto px-4 sm:px-6 py-6 sm:py-8 pb-28 lg:pb-10">

          {/* Header */}

          <section className="mb-7">

            <div className="flex items-center gap-3 mb-2">

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-500/20 to-purple-500/10 border border-orange-500/20 flex items-center justify-center">

                <FiUser
                  size={22}
                  className="text-orange-400"
                />

              </div>

              <div>

                <p className="text-xs text-orange-400 uppercase tracking-[0.2em] font-semibold">
                  Player Profile
                </p>

                <h1 className="text-2xl sm:text-3xl font-bold">
                  Your Learning Profile
                </h1>

              </div>

            </div>

            <p className="text-sm text-slate-500 max-w-2xl mt-3">
              Customize your background, target role
              and learning goals so EduPath can build
              a personalized career journey for you.
            </p>

          </section>

          {/* ================= PROFILE CARD ================= */}

          <section className="rounded-3xl border border-white/[0.08] bg-[#080D18] overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.35)]">

            {/* Profile Banner */}

            <div className="relative h-32 sm:h-40 bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-blue-500/10 border-b border-white/[0.07] overflow-hidden">

              <div className="absolute w-64 h-64 rounded-full bg-orange-500/10 blur-3xl -top-32 -right-10" />

              <div className="absolute w-56 h-56 rounded-full bg-purple-500/10 blur-3xl -bottom-40 left-1/3" />

              <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px]" />

            </div>

            {/* User Info */}

            <div className="px-5 sm:px-8 pb-7">

              <div className="flex flex-col sm:flex-row sm:items-end gap-4 -mt-10 relative">

                {/* Avatar */}

                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-purple-600 border-4 border-[#080D18] flex items-center justify-center text-2xl font-bold shadow-[0_0_30px_rgba(249,115,22,0.25)]">

                  {savedUser?.name
                    ?.charAt(0)
                    ?.toUpperCase() || "M"}

                </div>

                <div className="pb-1">

                  <h2 className="text-xl font-bold">
                    {savedUser?.name ||
                      "Learner"}
                  </h2>

                  <p className="text-sm text-slate-500">
                    {savedUser?.email ||
                      "learner@example.com"}
                  </p>

                </div>

                <div className="sm:ml-auto pb-1">

                  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20">

                    <FiAward
                      size={15}
                      className="text-orange-400"
                    />

                    <span className="text-xs text-orange-300 font-medium">
                      Level 7 Learner
                    </span>

                  </div>

                </div>

              </div>

              {/* Divider */}

              <div className="border-b border-white/[0.07] mt-6" />

              {/* Form */}

              <form
                onSubmit={handleSave}
                className="mt-7 space-y-6"
              >

                {/* Education */}

                <div>

                  <label className="flex items-center gap-2 text-sm font-semibold mb-2.5">

                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/15 flex items-center justify-center">

                      <FiBookOpen
                        size={15}
                        className="text-blue-400"
                      />

                    </span>

                    Education

                  </label>

                  <input
                    type="text"
                    value={education}
                    onChange={(e) =>
                      setEducation(
                        e.target.value
                      )
                    }
                    placeholder="e.g. B.Tech Computer Science"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#050811] border border-white/[0.08] text-white placeholder:text-slate-600 outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition"
                    required
                  />

                </div>

                {/* Experience + Study Hours */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                  {/* Experience */}

                  <div>

                    <label className="block text-sm font-semibold mb-2.5">
                      Experience Level
                    </label>

                    <select
                      value={
                        experienceLevel
                      }
                      onChange={(e) =>
                        setExperienceLevel(
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3.5 rounded-xl bg-[#050811] border border-white/[0.08] text-white outline-none focus:border-orange-500/50 transition"
                    >
                      <option className="bg-[#080D18]">
                        Beginner
                      </option>

                      <option className="bg-[#080D18]">
                        Intermediate
                      </option>

                      <option className="bg-[#080D18]">
                        Advanced
                      </option>
                    </select>

                  </div>

                  {/* Study Hours */}

                  <div>

                    <label className="flex items-center gap-2 text-sm font-semibold mb-2.5">

                      <span className="w-8 h-8 rounded-lg bg-purple-500/10 border border-purple-500/15 flex items-center justify-center">

                        <FiClock
                          size={15}
                          className="text-purple-400"
                        />

                      </span>

                      Study Hours Per Week

                    </label>

                    <input
                      type="number"
                      min="1"
                      max="168"
                      value={studyHours}
                      onChange={(e) =>
                        setStudyHours(
                          e.target.value
                        )
                      }
                      className="w-full px-4 py-3.5 rounded-xl bg-[#050811] border border-white/[0.08] text-white outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition"
                      required
                    />

                  </div>

                </div>

                {/* Target Role */}

                <div>

                  <label className="flex items-center gap-2 text-sm font-semibold mb-2.5">

                    <span className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/15 flex items-center justify-center">

                      <FiTarget
                        size={15}
                        className="text-orange-400"
                      />

                    </span>

                    Target Role

                  </label>

                  <select
                    value={targetRoleId}
                    onChange={(e) =>
                      setTargetRoleId(
                        e.target.value
                      )
                    }
                    className="w-full px-4 py-3.5 rounded-xl bg-[#050811] border border-white/[0.08] text-white outline-none focus:border-orange-500/50 transition"
                    required
                  >

                    <option
                      value=""
                      className="bg-[#080D18]"
                    >
                      Select your target role
                    </option>

                    {targetRoles.map(
                      (role) => (
                        <option
                          key={role.id}
                          value={role.id}
                          className="bg-[#080D18]"
                        >
                          {role.name}
                        </option>
                      )
                    )}

                  </select>

                </div>

                {/* Career Goal */}

                <div>

                  <label className="flex items-center gap-2 text-sm font-semibold mb-2.5">

                    <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/15 flex items-center justify-center">

                      <FiTarget
                        size={15}
                        className="text-cyan-400"
                      />

                    </span>

                    Career Goal

                  </label>

                  <textarea
                    value={careerGoal}
                    onChange={(e) =>
                      setCareerGoal(
                        e.target.value
                      )
                    }
                    placeholder="Tell us what you want to achieve..."
                    rows="4"
                    className="w-full px-4 py-3.5 rounded-xl bg-[#050811] border border-white/[0.08] text-white placeholder:text-slate-600 outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition resize-none"
                    required
                  />

                </div>

                {/* Error */}

                {error && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-300">

                    <FiX
                      size={17}
                      className="mt-0.5 shrink-0"
                    />

                    <span>
                      {error}
                    </span>

                  </div>
                )}

                {/* Success */}

                {saved && (
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-sm text-emerald-300">

                    <FiAward size={17} />

                    Profile saved successfully
                    to database.

                  </div>
                )}

                {/* Buttons */}

                <div className="flex flex-col sm:flex-row gap-3 pt-2">

                  <button
                    type="submit"
                    disabled={saving}
                    className="flex-1 sm:flex-none px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold shadow-[0_8px_25px_rgba(249,115,22,0.2)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.35)] hover:-translate-y-0.5 transition disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {saving
                      ? "Saving..."
                      : "Save Profile"}
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      navigate(
                        "/dashboard"
                      )
                    }
                    className="px-7 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.025] text-slate-300 font-medium hover:bg-white/[0.05] hover:text-white transition"
                  >
                    Back to Dashboard
                  </button>

                </div>

              </form>

            </div>

          </section>

        </main>

      </div>

      {/* ================= MOBILE BOTTOM NAV ================= */}

      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 px-3 pb-3">

        <div className="h-16 rounded-2xl bg-[#080D18]/95 backdrop-blur-xl border border-white/[0.08] flex items-center justify-around shadow-[0_-10px_40px_rgba(0,0,0,0.35)]">

          {[
            {
              label: "Home",
              icon: FiHome,
              path: "/dashboard",
            },
            {
              label: "Roadmap",
              icon: FiMap,
              path: "/roadmap",
            },
            {
              label: "Skills",
              icon: FiTarget,
              path: "/skills",
            },
            {
              label: "AI",
              icon: FiCpu,
              path: "/ai-assistant",
            },
            {
              label: "Profile",
              icon: FiUserCheck,
              path: "/profile",
            },
          ].map((item) => {
            const Icon = item.icon;

            const active =
              item.path === "/profile";

            return (
              <button
                key={item.label}
                onClick={() =>
                  navigate(item.path)
                }
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition ${
                  active
                    ? "text-orange-400 bg-orange-500/10"
                    : "text-slate-500"
                }`}
              >

                <Icon size={18} />

                <span className="text-[9px] font-medium">
                  {item.label}
                </span>

              </button>
            );
          })}

        </div>

      </div>

    </div>
  );
}

export default Profile;