import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiPlay,
  FiZap,
  FiTarget,
  FiBarChart2,
  FiCode,
  FiChevronDown,
} from "react-icons/fi";

function Landing() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020711] text-white">

      <style>{`
        .landing-grid {
          background-image:
            linear-gradient(rgba(58,105,170,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(58,105,170,.08) 1px, transparent 1px);
          background-size: 72px 72px;
        }

        .float-slow {
          animation: floatSlow 4s ease-in-out infinite;
        }

        @keyframes floatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }

        .pulse-glow {
          animation: pulseGlow 2.8s ease-in-out infinite;
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: .25;
            transform: scale(.96);
          }
          50% {
            opacity: .65;
            transform: scale(1.04);
          }
        }

        .path-flow {
          stroke-dasharray: 10 10;
          animation: pathFlow 1.8s linear infinite;
        }

        @keyframes pathFlow {
          to {
            stroke-dashoffset: -40;
          }
        }

        .step-one,
        .step-two,
        .step-three,
        .step-four {
          animation: stepGlow 3s ease-in-out infinite;
        }

        .step-two {
          animation-delay: .5s;
        }

        .step-three {
          animation-delay: 1s;
        }

        .step-four {
          animation-delay: 1.5s;
        }

        @keyframes stepGlow {
          0%, 100% {
            opacity: .55;
          }
          50% {
            opacity: 1;
          }
        }

        .spark {
          animation: sparkAnim 2.5s ease-in-out infinite;
        }

        @keyframes sparkAnim {
          0%, 100% {
            opacity: .2;
            transform: scale(.7);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @media (max-width: 1024px) {
          .desktop-nav {
            display: none;
          }
        }
      `}</style>


      {/* ================= NAVBAR ================= */}

      <header className="relative z-50 border-b border-white/[0.06] bg-[#020711]/95 backdrop-blur-xl">

        <div className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-10">

          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-orange-300 via-orange-500 to-yellow-400 shadow-[0_0_25px_rgba(255,150,35,.4)]">
              <FiZap
                size={22}
                className="text-[#06101d]"
              />
            </div>

            <div className="hidden sm:block">
              <div className="text-xl font-bold">
                EduPath AI
              </div>

              <div className="text-[8px] tracking-[0.28em] text-slate-500">
                LEARN • PRACTICE • GROW
              </div>
            </div>
          </Link>


          <nav className="desktop-nav hidden items-center gap-7 lg:flex">

            <a
              href="#home"
              className="rounded-xl bg-orange-500/10 px-5 py-2.5 text-sm text-orange-300"
            >
              Home
            </a>

            <a
              href="#features"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Features
            </a>

            <a
              href="#how"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              How It Works
            </a>

            <a
              href="#why"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              Testimonials
            </a>

            <a
              href="#faq"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              FAQ
            </a>

          </nav>


          <div className="flex items-center gap-2 sm:gap-3">

            <Link
              to="/login"
              className="hidden rounded-xl border border-slate-700 px-5 py-2.5 text-sm text-slate-200 transition hover:border-orange-400 hover:text-orange-300 sm:block"
            >
              Log In
            </Link>

            <Link
              to="/register"
              className="rounded-xl bg-gradient-to-r from-orange-400 to-yellow-400 px-4 py-2.5 text-sm font-bold text-[#07101d] shadow-[0_0_28px_rgba(255,160,40,.3)] transition hover:scale-[1.03] sm:px-5"
            >
              Get Started
            </Link>

          </div>

        </div>

      </header>


      {/* ================= HERO ================= */}

      <section
        id="home"
        className="relative min-h-[calc(100vh-76px)] overflow-hidden"
      >

        <div className="landing-grid pointer-events-none absolute inset-0" />

        <div className="pointer-events-none absolute left-[-200px] top-[30%] h-[500px] w-[500px] rounded-full bg-orange-500/[0.04] blur-[150px]" />

        <div className="pointer-events-none absolute right-[-200px] top-[10%] h-[600px] w-[600px] rounded-full bg-blue-500/[0.04] blur-[160px]" />


        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-76px)] max-w-[1500px] grid-cols-1 items-center px-5 py-10 sm:px-8 lg:grid-cols-[43%_57%] lg:px-10 lg:py-0">


          {/* ================= LEFT ================= */}

          <div className="relative z-30 max-w-[650px]">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-orange-400/50 bg-orange-400/[0.04] px-4 py-2 text-xs text-orange-300 sm:text-sm">

              <FiZap size={14} />

              Your Learning Journey, Reimagined

              <FiArrowRight size={13} />

            </div>


            <h1 className="text-[46px] font-black leading-[0.96] tracking-[-0.045em] sm:text-[58px] md:text-[68px] lg:text-[62px] xl:text-[74px]">

              <span className="text-white">
                Learn. Practice.
              </span>

              <br />

              <span className="text-white">
                Grow.
              </span>

              <br />

              <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-yellow-300 bg-clip-text text-transparent">
                Like a Game.
              </span>

            </h1>


            <p className="mt-7 max-w-[590px] text-sm leading-7 text-slate-400 sm:text-base sm:leading-8 lg:text-lg">

              An AI-powered learning platform that
              turns your career goals into an exciting
              journey with personalized roadmaps,
              skill battles, and real progress.

            </p>


            <div className="mt-9 flex flex-wrap gap-3 sm:gap-4">

              <Link
                to="/register"
                className="group flex items-center gap-3 rounded-2xl bg-gradient-to-r from-orange-400 to-yellow-400 px-6 py-3.5 text-sm font-bold text-[#07101d] shadow-[0_0_35px_rgba(255,160,40,.32)] transition hover:scale-[1.03] sm:px-7 sm:py-4 sm:text-base"
              >

                Start Your Journey

                <FiArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />

              </Link>


              <button
                type="button"
                className="flex items-center gap-3 rounded-2xl border border-slate-700 bg-[#07101d]/80 px-5 py-3.5 text-sm text-slate-200 transition hover:border-blue-400 sm:px-6 sm:py-4 sm:text-base"
              >

                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-400/10">

                  <FiPlay
                    size={13}
                    className="ml-0.5 text-orange-300"
                  />

                </span>

                Watch Demo

              </button>

            </div>


            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[11px] text-slate-500 sm:text-xs">

              <span className="flex items-center gap-2">
                <i className="h-2 w-2 rounded-full bg-orange-400" />
                Personalized Learning
              </span>

              <span className="flex items-center gap-2">
                <i className="h-2 w-2 rounded-full bg-blue-400" />
                AI Powered
              </span>

              <span className="flex items-center gap-2">
                <i className="h-2 w-2 rounded-full bg-purple-400" />
                Gamified Progress
              </span>

            </div>

          </div>


          {/* ================= RIGHT VISUAL ================= */}

          <div
            className="
              relative
              mx-auto
              mt-8
              h-[560px]
              w-full
              max-w-[760px]
              lg:mt-0
              lg:-translate-x-[5%]
              xl:-translate-x-[7%]
            "
          >


            {/* DREAM CAREER */}

            <div className="absolute right-[7%] top-[2%] z-30 rounded-2xl border border-orange-400/50 bg-[#06101d]/95 px-6 py-3.5 text-center shadow-[0_0_35px_rgba(255,150,40,.13)] backdrop-blur-md sm:px-9">

              <div className="text-[10px] tracking-[0.35em] text-orange-300">
                YOUR
              </div>

              <div className="mt-1 text-base font-black sm:text-xl">
                DREAM CAREER
              </div>

            </div>


            {/* MAIN SVG */}

            <svg
              viewBox="0 0 900 680"
              className="absolute inset-0 h-full w-full"
              preserveAspectRatio="xMidYMid meet"
            >

              <defs>

                <linearGradient
                  id="careerCrystal"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#ffe79b"
                  />

                  <stop
                    offset="45%"
                    stopColor="#ffae25"
                  />

                  <stop
                    offset="100%"
                    stopColor="#ff7200"
                  />
                </linearGradient>


                <linearGradient
                  id="cityBuilding"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#193568"
                  />

                  <stop
                    offset="100%"
                    stopColor="#081226"
                  />
                </linearGradient>


                <linearGradient
                  id="platformBlue"
                  x1="0"
                  y1="0"
                  x2="1"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor="#113d8b"
                  />

                  <stop
                    offset="50%"
                    stopColor="#071c45"
                  />

                  <stop
                    offset="100%"
                    stopColor="#020916"
                  />
                </linearGradient>


                <filter
                  id="glowOrange"
                  x="-100%"
                  y="-100%"
                  width="300%"
                  height="300%"
                >

                  <feGaussianBlur
                    stdDeviation="8"
                    result="blur"
                  />

                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>

                </filter>


                <filter
                  id="glowBlue"
                  x="-100%"
                  y="-100%"
                  width="300%"
                  height="300%"
                >

                  <feGaussianBlur
                    stdDeviation="6"
                    result="blur"
                  />

                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>

                </filter>

              </defs>


              {/* CITY */}

              <g opacity=".95">

                <rect
                  x="500"
                  y="190"
                  width="50"
                  height="235"
                  rx="3"
                  fill="url(#cityBuilding)"
                  stroke="#254d86"
                />

                <rect
                  x="555"
                  y="120"
                  width="58"
                  height="305"
                  rx="3"
                  fill="url(#cityBuilding)"
                  stroke="#2b477b"
                />

                <rect
                  x="618"
                  y="205"
                  width="52"
                  height="220"
                  rx="3"
                  fill="url(#cityBuilding)"
                  stroke="#315a8c"
                />

                <rect
                  x="675"
                  y="145"
                  width="60"
                  height="280"
                  rx="3"
                  fill="url(#cityBuilding)"
                  stroke="#49376f"
                />

                <rect
                  x="741"
                  y="220"
                  width="46"
                  height="205"
                  rx="3"
                  fill="url(#cityBuilding)"
                  stroke="#315581"
                />

                <rect
                  x="440"
                  y="250"
                  width="50"
                  height="175"
                  rx="3"
                  fill="url(#cityBuilding)"
                  stroke="#244b7d"
                />

              </g>


              {/* LIGHTS */}

              <g opacity=".65">

                <rect
                  x="512"
                  y="220"
                  width="18"
                  height="5"
                  fill="#248cff"
                />

                <rect
                  x="512"
                  y="275"
                  width="18"
                  height="5"
                  fill="#248cff"
                />

                <rect
                  x="568"
                  y="165"
                  width="22"
                  height="5"
                  fill="#ff9d1c"
                />

                <rect
                  x="568"
                  y="225"
                  width="22"
                  height="5"
                  fill="#248cff"
                />

                <rect
                  x="568"
                  y="285"
                  width="22"
                  height="5"
                  fill="#ff9d1c"
                />

                <rect
                  x="688"
                  y="185"
                  width="24"
                  height="5"
                  fill="#248cff"
                />

                <rect
                  x="688"
                  y="245"
                  width="24"
                  height="5"
                  fill="#a855f7"
                />

                <rect
                  x="688"
                  y="305"
                  width="24"
                  height="5"
                  fill="#248cff"
                />

              </g>


              {/* CENTRAL GLOW */}

              <circle
                cx="620"
                cy="235"
                r="105"
                fill="#ff9d1c"
                opacity=".07"
                className="pulse-glow"
              />

              <circle
                cx="620"
                cy="235"
                r="65"
                fill="#ff9d1c"
                opacity=".10"
                className="pulse-glow"
              />


              {/* CENTRAL CRYSTAL */}

              <g className="float-slow">

                <rect
                  x="577"
                  y="192"
                  width="86"
                  height="86"
                  rx="4"
                  transform="rotate(45 620 235)"
                  fill="url(#careerCrystal)"
                  filter="url(#glowOrange)"
                />

                <path
                  d="M620 204 L648 235 L620 266 L592 235 Z"
                  fill="#fff0bb"
                  opacity=".30"
                />

                <path
                  d="M611 216 L627 235 L618 249"
                  fill="none"
                  stroke="#07101c"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

              </g>


              {/* CAREER PATH */}

              <path
                d="M620 285 C620 335 590 360 575 390 C560 420 580 448 620 488"
                fill="none"
                stroke="#ff9d1c"
                strokeWidth="4"
                opacity=".85"
                filter="url(#glowOrange)"
              />

              <path
                d="M620 285 C620 335 590 360 575 390 C560 420 580 448 620 488"
                fill="none"
                stroke="#ffd35c"
                strokeWidth="2"
                strokeDasharray="8 9"
                className="path-flow"
              />


              {/* LEVEL STEPS */}

              <g className="step-one">

                <rect
                  x="595"
                  y="350"
                  width="70"
                  height="20"
                  rx="4"
                  fill="#173f83"
                  stroke="#2e8cff"
                />

                <path
                  d="M630 354 L637 362 L630 368 L623 362 Z"
                  fill="#ffb22d"
                />

              </g>


              <g className="step-two">

                <rect
                  x="575"
                  y="380"
                  width="90"
                  height="23"
                  rx="4"
                  fill="#1c4e99"
                  stroke="#7c5cff"
                />

                <path
                  d="M620 384 L627 392 L620 398 L613 392 Z"
                  fill="#ffb22d"
                />

              </g>


              <g className="step-three">

                <rect
                  x="550"
                  y="416"
                  width="112"
                  height="25"
                  rx="4"
                  fill="#173c7c"
                  stroke="#248cff"
                />

                <path
                  d="M606 421 L614 430 L606 437 L598 430 Z"
                  fill="#ffb22d"
                />

              </g>


              <g className="step-four">

                <rect
                  x="520"
                  y="455"
                  width="145"
                  height="30"
                  rx="5"
                  fill="#173568"
                  stroke="#ff9d1c"
                />

                <path
                  d="M592 461 L601 470 L592 478 L583 470 Z"
                  fill="#ffbd38"
                />

              </g>


              {/* PLATFORM */}

              <ellipse
                cx="610"
                cy="505"
                rx="230"
                ry="68"
                fill="#020813"
                stroke="#8b4614"
                strokeWidth="5"
              />

              <ellipse
                cx="610"
                cy="505"
                rx="210"
                ry="56"
                fill="none"
                stroke="#247fff"
                strokeWidth="9"
                filter="url(#glowBlue)"
              />

              <ellipse
                cx="610"
                cy="505"
                rx="176"
                ry="44"
                fill="url(#platformBlue)"
                stroke="#27528c"
              />

              <ellipse
                cx="610"
                cy="505"
                rx="140"
                ry="31"
                fill="none"
                stroke="#315c94"
              />

              <ellipse
                cx="610"
                cy="505"
                rx="108"
                ry="21"
                fill="none"
                stroke="#183d70"
              />


              {/* PLATFORM CORE */}

              <rect
                x="560"
                y="472"
                width="100"
                height="48"
                rx="3"
                fill="#07111f"
                stroke="#a56831"
              />

              <rect
                x="595"
                y="483"
                width="30"
                height="30"
                transform="rotate(45 610 498)"
                fill="url(#careerCrystal)"
                filter="url(#glowOrange)"
              />


              {/* STARS */}

              <circle
                cx="470"
                cy="165"
                r="2"
                fill="#ff9d1c"
                className="spark"
              />

              <circle
                cx="760"
                cy="140"
                r="2"
                fill="#248cff"
                className="spark"
              />

              <circle
                cx="430"
                cy="300"
                r="2"
                fill="#a855f7"
                className="spark"
              />

              <circle
                cx="810"
                cy="320"
                r="2"
                fill="#22d3ee"
                className="spark"
              />

            </svg>


            {/* FEATURE CARDS */}

            <FeatureCard
              className="left-[1%] top-[28%]"
              icon={<FiTarget />}
              title="Personalized"
              subtitle="Roadmaps"
              type="purple"
            />

            <FeatureCard
              className="right-[2%] top-[28%]"
              icon={<FiZap />}
              title="AI Mentor"
              subtitle="24/7 Support"
              type="blue"
            />

            <FeatureCard
              className="left-[1%] top-[50%]"
              icon={<FiCode />}
              title="Skill Battles"
              subtitle="Practice & Assessments"
              type="cyan"
            />

            <FeatureCard
              className="right-[2%] top-[50%]"
              icon={<FiBarChart2 />}
              title="Track Progress"
              subtitle="Earn Rewards"
              type="orange"
            />


            {/* BOTTOM SLOGAN */}

            <div className="absolute bottom-[4%] right-[7%] z-30 text-right">

              <div className="text-xl font-bold italic text-orange-300 sm:text-2xl">
                Small Steps.
              </div>

              <div className="text-xl font-bold italic text-yellow-300 sm:text-2xl">
                Big Results.
              </div>

            </div>


            {/* SCROLL */}

            <div className="absolute bottom-[-1%] left-1/2 z-30 hidden -translate-x-1/2 flex-col items-center md:flex">

              <FiChevronDown
                size={22}
                className="animate-bounce text-orange-400"
              />

              <span className="mt-1 text-[8px] tracking-[0.4em] text-slate-600">
                SCROLL TO EXPLORE
              </span>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FEATURES ================= */}

      <section
        id="features"
        className="border-t border-white/[0.06] bg-[#030a16] py-20 sm:py-24"
      >

        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          <div className="mb-12 text-center">

            <div className="text-xs font-semibold tracking-[0.25em] text-orange-400">
              THE EDUPATH SYSTEM
            </div>

            <h2 className="mt-3 text-3xl font-black sm:text-5xl">
              Your Career.
              <span className="text-orange-400">
                {" "}Your Game.
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              Turn learning into quests, challenges,
              progress and achievements.
            </p>

          </div>


          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">

            {[
              [
                "AI Roadmap",
                "Personalized career roadmap based on your goals.",
              ],
              [
                "Skill Battles",
                "Practice coding and concepts through focused challenges.",
              ],
              [
                "Track Progress",
                "Track XP, levels, streaks and learning progress.",
              ],
              [
                "Achievements",
                "Complete quests and unlock career milestones.",
              ],
            ].map(([title, description]) => (

              <div
                key={title}
                className="rounded-2xl border border-slate-800 bg-[#07101d]/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-orange-400/40"
              >

                <div className="mb-5 h-1 w-12 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400" />

                <h3 className="text-lg font-bold">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {description}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* ================= FOOTER ================= */}

      <footer className="border-t border-white/[0.06] py-8">

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 sm:flex-row sm:px-8 lg:px-10">

          <div className="flex items-center gap-2 text-sm text-slate-500">

            <FiZap className="text-orange-400" />

            EduPath AI

          </div>

          <div className="text-xs text-slate-600">
            Small Steps. Big Results.
          </div>

          <div className="text-xs text-slate-600">
            Learn • Practice • Grow • Achieve
          </div>

        </div>

      </footer>

    </div>
  );
}


/* =========================================================
   FEATURE CARD
========================================================= */

function FeatureCard({
  className,
  icon,
  title,
  subtitle,
  type,
}) {

  const borderMap = {
    purple: "border-purple-400/50",
    blue: "border-blue-400/50",
    cyan: "border-cyan-400/50",
    orange: "border-orange-400/50",
  };

  const iconMap = {
    purple: "bg-purple-500/10 text-purple-300",
    blue: "bg-blue-500/10 text-blue-300",
    cyan: "bg-cyan-500/10 text-cyan-300",
    orange: "bg-orange-500/10 text-orange-300",
  };

  return (
    <div
      className={`
        absolute
        z-40
        ${className}
        flex
        items-center
        gap-2
        rounded-xl
        border
        ${borderMap[type]}
        bg-[#07111f]/95
        px-3
        py-2.5
        shadow-[0_15px_45px_rgba(0,0,0,.35)]
        backdrop-blur-md
        sm:gap-3
        sm:rounded-2xl
        sm:px-5
        sm:py-3
      `}
    >

      <div
        className={`
          flex
          h-8
          w-8
          shrink-0
          items-center
          justify-center
          rounded-lg
          sm:h-10
          sm:w-10
          ${iconMap[type]}
        `}
      >
        {icon}
      </div>

      <div>

        <div className="whitespace-nowrap text-xs font-semibold text-white sm:text-sm">
          {title}
        </div>

        <div className="whitespace-nowrap text-[9px] text-slate-500 sm:text-xs">
          {subtitle}
        </div>

      </div>

    </div>
  );
}

export default Landing;