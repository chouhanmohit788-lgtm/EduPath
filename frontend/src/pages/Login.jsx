import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShield,
  FiZap,
} from "react-icons/fi";

import { userApi } from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const user = await userApi.getByEmail(email);

      if (!user) {
        throw new Error("User not found.");
      }

      if (user.password !== password) {
        throw new Error("Invalid email or password.");
      }

      // Temporary MVP session
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        })
      );

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#020711] text-white">

      {/* Background Grid */}
      <div
        className="pointer-events-none fixed inset-0 opacity-70"
        style={{
          backgroundImage: `
            linear-gradient(rgba(65,100,160,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(65,100,160,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      {/* Orange Glow */}
      <div className="pointer-events-none fixed left-[-180px] top-[20%] h-[500px] w-[500px] rounded-full bg-orange-500/[0.07] blur-[150px]" />

      {/* Blue Glow */}
      <div className="pointer-events-none fixed right-[-180px] bottom-[-150px] h-[550px] w-[550px] rounded-full bg-blue-500/[0.06] blur-[160px]" />


      {/* ================= TOP BAR ================= */}

      <header className="relative z-20 border-b border-white/[0.06] bg-[#020711]/80 backdrop-blur-xl">

        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">

          {/* Logo */}

          <button
            type="button"
            onClick={() => navigate("/")}
            className="group flex items-center gap-3"
          >

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-300 via-orange-500 to-yellow-400 shadow-[0_0_28px_rgba(255,150,35,.35)] transition group-hover:scale-105">

              <FiZap
                size={21}
                className="text-[#07101d]"
              />

            </div>

            <div className="text-left">

              <div className="text-lg font-bold tracking-tight">
                EduPath AI
              </div>

              <div className="text-[8px] tracking-[0.3em] text-slate-500">
                LEARN • PRACTICE • GROW
              </div>

            </div>

          </button>


          {/* Back Home */}

          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-slate-400 transition hover:text-orange-300"
          >

            <FiArrowLeft size={16} />

            <span className="hidden sm:block">
              Back to Home
            </span>

          </button>

        </div>

      </header>


      {/* ================= MAIN ================= */}

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl items-center px-5 py-10 sm:px-8 lg:py-8">

        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-20">


          {/* ================= LEFT SIDE ================= */}

          <div className="hidden lg:block">

            {/* Small Label */}

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-400/[0.04] px-4 py-2 text-sm text-orange-300">

              <FiZap size={14} />

              Welcome back, learner

            </div>


            {/* Heading */}

            <h1 className="max-w-xl text-[58px] font-black leading-[0.98] tracking-[-0.04em]">

              <span className="text-white">
                Continue.
              </span>

              <br />

              <span className="text-white">
                Your Journey.
              </span>

              <br />

              <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
                Level Up.
              </span>

            </h1>


            <p className="mt-7 max-w-lg text-base leading-8 text-slate-400">
              Your personalized learning world is waiting.
              Continue your roadmap, complete quests and
              build the skills for your dream career.
            </p>


            {/* ================= MINI ROADMAP ================= */}

            <div className="relative mt-12 max-w-xl rounded-3xl border border-slate-800 bg-[#06101d]/70 p-6 backdrop-blur-xl">

              <div className="absolute right-5 top-5 rounded-lg border border-orange-400/30 bg-orange-400/[0.06] px-3 py-1.5 text-[10px] font-semibold tracking-wider text-orange-300">
                YOUR PROGRESS
              </div>


              <div className="mb-8">

                <div className="text-xs text-slate-500">
                  CAREER QUEST
                </div>

                <div className="mt-1 text-lg font-bold">
                  Your Dream Career
                </div>

              </div>


              {/* Progress Line */}

              <div className="relative">

                <div className="absolute left-5 right-5 top-5 h-[2px] bg-slate-800" />

                <div className="absolute left-5 top-5 h-[2px] w-[48%] bg-gradient-to-r from-orange-500 to-yellow-400" />


                <div className="relative flex justify-between">

                  {/* Node 1 */}

                  <RoadmapNode
                    icon="✓"
                    title="Learn"
                    active
                  />

                  {/* Node 2 */}

                  <RoadmapNode
                    icon="✓"
                    title="Practice"
                    active
                  />

                  {/* Node 3 */}

                  <RoadmapNode
                    icon="3"
                    title="Improve"
                  />

                  {/* Node 4 */}

                  <RoadmapNode
                    icon="4"
                    title="Achieve"
                  />

                </div>

              </div>


              {/* XP */}

              <div className="mt-8 flex items-center justify-between">

                <div>

                  <div className="text-xs text-slate-500">
                    CURRENT XP
                  </div>

                  <div className="mt-1 text-xl font-bold text-orange-300">
                    1,240 XP
                  </div>

                </div>


                <div className="text-right">

                  <div className="text-xs text-slate-500">
                    NEXT LEVEL
                  </div>

                  <div className="mt-1 text-sm font-semibold text-white">
                    760 XP remaining
                  </div>

                </div>

              </div>


              {/* XP Bar */}

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-800">

                <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 shadow-[0_0_15px_rgba(255,150,40,.45)]" />

              </div>

            </div>


            {/* Feature Tags */}

            <div className="mt-7 flex flex-wrap gap-3">

              <MiniTag
                icon={<FiShield size={13} />}
                text="AI Powered"
              />

              <MiniTag
                icon={<FiZap size={13} />}
                text="Gamified Learning"
              />

              <MiniTag
                icon={<FiLock size={13} />}
                text="Personalized"
              />

            </div>

          </div>


          {/* ================= LOGIN SIDE ================= */}

          <div className="mx-auto w-full max-w-[470px]">

            {/* Mobile Brand */}

            <div className="mb-8 text-center lg:hidden">

              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-300 via-orange-500 to-yellow-400 shadow-[0_0_30px_rgba(255,150,35,.35)]">

                <FiZap
                  size={27}
                  className="text-[#07101d]"
                />

              </div>

              <h1 className="text-3xl font-black">
                EduPath AI
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Learn • Practice • Grow
              </p>

            </div>


            {/* Login Card */}

            <div className="relative overflow-hidden rounded-[28px] border border-slate-800 bg-[#07111f]/95 p-6 shadow-[0_30px_100px_rgba(0,0,0,.45)] backdrop-blur-xl sm:p-8">

              {/* Top Glow */}

              <div className="absolute left-1/2 top-0 h-[2px] w-[65%] -translate-x-1/2 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />

              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-orange-500/[0.07] blur-3xl" />


              {/* Card Header */}

              <div className="relative">

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-orange-400/30 bg-orange-400/[0.07]">

                  <FiZap
                    size={21}
                    className="text-orange-300"
                  />

                </div>


                <h2 className="text-2xl font-bold">
                  Welcome Back
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Continue your journey with EduPath AI.
                </p>

              </div>


              {/* Error */}

              {error && (
                <div className="relative mt-5 rounded-xl border border-red-400/30 bg-red-500/[0.08] p-3 text-sm text-red-300">
                  {error}
                </div>
              )}


              {/* Form */}

              <form
                onSubmit={handleLogin}
                className="relative mt-7 space-y-5"
              >

                {/* Email */}

                <div>

                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Email
                  </label>

                  <div className="relative">

                    <FiMail
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                    />

                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-800 bg-[#020914] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-orange-400/60 focus:bg-[#071321] focus:ring-1 focus:ring-orange-400/20"
                      required
                    />

                  </div>

                </div>


                {/* Password */}

                <div>

                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Password
                  </label>

                  <div className="relative">

                    <FiLock
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                    />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-800 bg-[#020914] py-3.5 pl-11 pr-12 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-orange-400/60 focus:bg-[#071321] focus:ring-1 focus:ring-orange-400/20"
                      required
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-600 transition hover:text-orange-300"
                    >
                      {showPassword ? (
                        <FiEyeOff size={17} />
                      ) : (
                        <FiEye size={17} />
                      )}
                    </button>

                  </div>

                </div>


                {/* Small Info */}

                <div className="flex items-center justify-between text-xs">

                  <span className="flex items-center gap-2 text-slate-600">

                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

                    Secure Login

                  </span>

                  <span className="text-slate-600">
                    EduPath AI

                  </span>

                </div>


                {/* Login Button */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-orange-400 to-yellow-400 py-3.5 font-bold text-[#07101d] shadow-[0_0_30px_rgba(255,150,40,.2)] transition hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(255,150,40,.35)] disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {loading
                    ? "Logging in..."
                    : "Enter EduPath"}

                  {!loading && (
                    <span className="transition group-hover:translate-x-1">
                      →
                    </span>
                  )}

                </button>

              </form>


              {/* Register */}

              <div className="relative mt-7 border-t border-slate-800 pt-6 text-center">

                <p className="text-sm text-slate-500">

                  New to EduPath?{" "}

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/register")
                    }
                    className="font-semibold text-orange-300 transition hover:text-yellow-300 hover:underline"
                  >
                    Create Account
                  </button>

                </p>

              </div>

            </div>


            {/* Bottom Text */}

            <div className="mt-5 flex items-center justify-center gap-2 text-[10px] tracking-wider text-slate-700">

              <FiShield size={12} />

              YOUR LEARNING JOURNEY • YOUR PROGRESS • YOUR FUTURE

            </div>

          </div>

        </div>

      </main>

    </div>
  );
}


/* =========================================================
   ROADMAP NODE
========================================================= */

function RoadmapNode({
  icon,
  title,
  active = false,
}) {
  return (
    <div className="relative z-10 flex flex-col items-center">

      <div
        className={`
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          text-xs
          font-bold
          ${
            active
              ? "border-orange-400 bg-orange-400 text-[#07101d] shadow-[0_0_20px_rgba(255,150,40,.3)]"
              : "border-slate-700 bg-[#07101d] text-slate-600"
          }
        `}
      >
        {icon}
      </div>

      <div
        className={`
          mt-2
          text-[10px]
          ${
            active
              ? "text-slate-300"
              : "text-slate-600"
          }
        `}
      >
        {title}
      </div>

    </div>
  );
}


/* =========================================================
   MINI TAG
========================================================= */

function MiniTag({ icon, text }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-800 bg-[#07101d]/70 px-3 py-2 text-[11px] text-slate-500">

      <span className="text-orange-400">
        {icon}
      </span>

      {text}

    </div>
  );
}

export default Login;