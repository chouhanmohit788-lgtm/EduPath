import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiShield,
  FiUser,
  FiZap,
} from "react-icons/fi";

import { userApi } from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await userApi.create({
        name,
        email,
        password,
        role: "USER",
      });

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (error) {
      setError(
        error.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-hidden bg-[#020711] text-white">

      {/* ================= BACKGROUND ================= */}

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

      <div className="pointer-events-none fixed left-[-180px] top-[15%] h-[500px] w-[500px] rounded-full bg-orange-500/[0.07] blur-[150px]" />

      <div className="pointer-events-none fixed right-[-180px] bottom-[-150px] h-[550px] w-[550px] rounded-full bg-blue-500/[0.06] blur-[160px]" />


      {/* ================= NAVBAR ================= */}

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


          {/* Back */}

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

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-72px)] max-w-7xl items-center px-5 py-10 sm:px-8">

        <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-20">


          {/* ================= LEFT SIDE ================= */}

          <div className="hidden lg:block">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-400/[0.04] px-4 py-2 text-sm text-orange-300">

              <FiZap size={14} />

              Start Your Journey

            </div>


            <h1 className="max-w-xl text-[58px] font-black leading-[0.98] tracking-[-0.04em]">

              <span className="text-white">
                Build.
              </span>

              <br />

              <span className="text-white">
                Learn.
              </span>

              <br />

              <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
                Level Up.
              </span>

            </h1>


            <p className="mt-7 max-w-lg text-base leading-8 text-slate-400">

              Create your EduPath account and turn your
              career goal into a personalized learning
              journey.

            </p>


            {/* ================= QUEST CARD ================= */}

            <div className="relative mt-12 max-w-xl overflow-hidden rounded-3xl border border-slate-800 bg-[#06101d]/75 p-6 backdrop-blur-xl">

              <div className="absolute right-5 top-5 rounded-lg border border-orange-400/30 bg-orange-400/[0.06] px-3 py-1.5 text-[10px] font-semibold tracking-wider text-orange-300">
                NEW QUEST
              </div>


              <div className="mb-8">

                <div className="text-xs text-slate-500">
                  YOUR JOURNEY
                </div>

                <div className="mt-1 text-lg font-bold">
                  Create • Learn • Grow
                </div>

              </div>


              {/* Journey */}

              <div className="relative">

                <div className="absolute left-5 right-5 top-5 h-[2px] bg-slate-800" />

                <div className="relative flex justify-between">

                  <QuestNode
                    number="1"
                    title="Create"
                    active
                  />

                  <QuestNode
                    number="2"
                    title="Learn"
                  />

                  <QuestNode
                    number="3"
                    title="Practice"
                  />

                  <QuestNode
                    number="4"
                    title="Achieve"
                  />

                </div>

              </div>


              {/* Bottom */}

              <div className="mt-8 grid grid-cols-3 gap-3">

                <InfoBox
                  value="AI"
                  label="Personalized"
                />

                <InfoBox
                  value="XP"
                  label="Gamified"
                />

                <InfoBox
                  value="24/7"
                  label="AI Mentor"
                />

              </div>

            </div>


            {/* Tags */}

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


          {/* ================= REGISTER CARD ================= */}

          <div className="mx-auto w-full max-w-[470px]">

            {/* Mobile Logo */}

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


            {/* Card */}

            <div className="relative overflow-hidden rounded-[28px] border border-slate-800 bg-[#07111f]/95 p-6 shadow-[0_30px_100px_rgba(0,0,0,.45)] backdrop-blur-xl sm:p-8">

              {/* Top glow */}

              <div className="absolute left-1/2 top-0 h-[2px] w-[65%] -translate-x-1/2 bg-gradient-to-r from-transparent via-orange-400 to-transparent" />

              <div className="pointer-events-none absolute -right-20 -top-20 h-40 w-40 rounded-full bg-orange-500/[0.07] blur-3xl" />


              {/* Header */}

              <div className="relative">

                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-orange-400/30 bg-orange-400/[0.07]">

                  <FiUser
                    size={21}
                    className="text-orange-300"
                  />

                </div>


                <h2 className="text-2xl font-bold">
                  Create Account
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Start your personalized learning journey.
                </p>

              </div>


              {/* Error */}

              {error && (
                <div className="relative mt-5 rounded-xl border border-red-400/30 bg-red-500/[0.08] p-3 text-sm text-red-300">
                  {error}
                </div>
              )}


              {/* Success */}

              {success && (
                <div className="relative mt-5 rounded-xl border border-green-400/30 bg-green-500/[0.08] p-3 text-sm text-green-300">
                  {success}
                </div>
              )}


              {/* Form */}

              <form
                onSubmit={handleRegister}
                className="relative mt-7 space-y-5"
              >

                {/* Name */}

                <div>

                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Full Name
                  </label>

                  <div className="relative">

                    <FiUser
                      size={17}
                      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-600"
                    />

                    <input
                      type="text"
                      placeholder="Enter your name"
                      value={name}
                      onChange={(e) =>
                        setName(e.target.value)
                      }
                      className="w-full rounded-xl border border-slate-800 bg-[#020914] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-slate-700 focus:border-orange-400/60 focus:bg-[#071321] focus:ring-1 focus:ring-orange-400/20"
                      required
                    />

                  </div>

                </div>


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
                      placeholder="Create a password"
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


                {/* Secure */}

                <div className="flex items-center gap-2 text-xs text-slate-600">

                  <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

                  Your learning journey starts here

                </div>


                {/* Register */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-orange-400 to-yellow-400 py-3.5 font-bold text-[#07101d] shadow-[0_0_30px_rgba(255,150,40,.2)] transition hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(255,150,40,.35)] disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {loading
                    ? "Creating Account..."
                    : "Start Your Journey"}

                  {!loading && (
                    <span className="transition group-hover:translate-x-1">
                      →
                    </span>
                  )}

                </button>

              </form>


              {/* Login */}

              <div className="relative mt-7 border-t border-slate-800 pt-6 text-center">

                <p className="text-sm text-slate-500">

                  Already have an account?{" "}

                  <button
                    type="button"
                    onClick={() =>
                      navigate("/login")
                    }
                    className="font-semibold text-orange-300 transition hover:text-yellow-300 hover:underline"
                  >
                    Login
                  </button>

                </p>

              </div>

            </div>


            {/* Bottom */}

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
   QUEST NODE
========================================================= */

function QuestNode({
  number,
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
        {number}
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
   INFO BOX
========================================================= */

function InfoBox({ value, label }) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#020914]/70 px-3 py-3 text-center">

      <div className="text-sm font-bold text-orange-300">
        {value}
      </div>

      <div className="mt-1 text-[9px] text-slate-600">
        {label}
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

export default Register;