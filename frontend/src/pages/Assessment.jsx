import { useEffect, useState } from "react";
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
  FiXCircle,
  FiZap,
} from "react-icons/fi";

import {
  assessmentApi,
  assessmentResultApi,
  profileApi,
} from "../services/api";

const questions = [
  {
    id: 1,
    skill: "Java",
    question: "Which keyword is used to create an object in Java?",
    options: ["class", "new", "this", "static"],
    answer: "new",
  },
  {
    id: 2,
    skill: "Data Structures",
    question: "Which data structure follows LIFO?",
    options: ["Queue", "Stack", "Array", "Graph"],
    answer: "Stack",
  },
  {
    id: 3,
    skill: "SQL",
    question: "Which SQL command is used to retrieve data?",
    options: ["INSERT", "UPDATE", "SELECT", "DELETE"],
    answer: "SELECT",
  },
  {
    id: 4,
    skill: "OOP",
    question:
      "Which OOP concept allows a class to acquire properties of another class?",
    options: [
      "Encapsulation",
      "Inheritance",
      "Abstraction",
      "Polymorphism",
    ],
    answer: "Inheritance",
  },
  {
    id: 5,
    skill: "Problem Solving",
    question: "What is the time complexity of binary search?",
    options: ["O(n)", "O(n²)", "O(log n)", "O(1)"],
    answer: "O(log n)",
  },
];

function Assessment() {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [profileId, setProfileId] = useState(null);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const savedUser = JSON.parse(
        localStorage.getItem("user") || "null"
      );

      if (!savedUser?.id) {
        setError("Please login again.");
        return;
      }

      try {
        const profile = await profileApi.getByUserId(
          savedUser.id
        );

        setProfileId(profile.id);
      } catch (error) {
        setError(
          "Please complete your learner profile before taking the assessment."
        );
      }
    };

    loadProfile();
  }, []);

  const handleAnswer = (option) => {
    setAnswers((previous) => ({
      ...previous,
      [questions[currentQuestion].id]: option,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(
        (previous) => previous + 1
      );
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(
        (previous) => previous - 1
      );
    }
  };

  const handleSubmit = async () => {
    if (!profileId) {
      setError(
        "Learner profile not found. Please complete your profile."
      );
      return;
    }

    setError("");
    setLoading(true);

    try {
      let correctAnswers = 0;

      const weakTopics = [];

      questions.forEach((question) => {
        const userAnswer =
          answers[question.id];

        if (userAnswer === question.answer) {
          correctAnswers++;
        } else {
          weakTopics.push(question.skill);
        }
      });

      const totalQuestions = questions.length;

      const percentage =
        (correctAnswers / totalQuestions) * 100;

      const assessment =
        await assessmentApi.create({
          learnerProfile: {
            id: profileId,
          },
          title: "EduPath AI Skill Assessment",
          description:
            "Initial assessment covering Java, Data Structures, SQL, OOP and Problem Solving.",
          totalQuestions,
        });

      const assessmentResult =
        await assessmentResultApi.create({
          assessment: {
            id: assessment.id,
          },
          score: correctAnswers,
          percentage,
          correctAnswers,
          totalQuestions,
          weakTopics:
            weakTopics.join(", "),
        });

      setResult({
        score: correctAnswers,
        percentage,
        correctAnswers,
        totalQuestions,
        weakTopics,
        assessmentResult,
      });

      setSubmitted(true);
    } catch (error) {
      setError(
        error.message ||
          "Unable to save assessment. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const restartAssessment = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
    setSubmitted(false);
    setResult(null);
    setError("");
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

  const renderSidebar = () => (
    <>
      {mobileSidebarOpen && (
        <div
          onClick={closeMobileSidebar}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

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
              item.path === "/assessment";

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
    </>
  );

  const renderTopBar = () => (
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
            <p className="text-xs text-orange-400 uppercase tracking-[0.2em] font-bold">
              Skill Battle
            </p>

            <p className="text-sm font-semibold text-gray-300 mt-1">
              Assessment
            </p>
          </div>

        </div>

        <div className="flex items-center gap-3">

          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-500/[0.07] border border-orange-400/10">

            <span>🔥</span>

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
  );

  const contentWrapper = (content) => (
    <div className="min-h-screen bg-[#060A12] text-white overflow-x-hidden">

      {renderSidebar()}

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

        {renderTopBar()}

        {content}

      </div>

    </div>
  );

  /* =========================================================
     START SCREEN
  ========================================================= */

  if (!started) {
    return contentWrapper(
      <main className="max-w-[1250px] mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10">

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#111827] via-[#0C1220] to-[#10121D] border border-orange-400/15 p-6 sm:p-8 lg:p-10">

          <div className="absolute -right-24 -top-24 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />

          <div className="relative">

            <div className="flex flex-col lg:flex-row lg:items-center gap-8">

              <div className="flex-1">

                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-400/20 flex items-center justify-center mb-6">

                  <FiTarget className="text-3xl text-orange-400" />

                </div>

                <p className="text-xs text-orange-400 uppercase tracking-[0.2em] font-bold">
                  Personalized Skill Assessment
                </p>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mt-3 tracking-tight">
                  Test Your Current Skills
                </h1>

                <p className="text-gray-500 mt-4 max-w-2xl leading-7">
                  This short assessment checks your current
                  understanding of Java, Data Structures, SQL,
                  OOP and Problem Solving.
                </p>

                {error && (
                  <div className="mt-6 p-4 rounded-xl bg-red-500/5 border border-red-400/20 text-sm text-red-400">
                    <div className="flex items-center gap-2">
                      <FiAlertCircle />
                      {error}
                    </div>
                  </div>
                )}

                <button
                  onClick={() =>
                    setStarted(true)
                  }
                  disabled={!profileId}
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-orange-500 text-black font-bold hover:bg-orange-400 transition disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Start Assessment
                  <FiArrowRight />
                </button>

              </div>

              <div className="w-full lg:w-[360px]">

                <div className="rounded-2xl bg-[#080D16]/80 border border-white/[0.07] p-5">

                  <p className="text-xs text-gray-600 uppercase tracking-wider">
                    Assessment Stats
                  </p>

                  <div className="grid grid-cols-3 gap-3 mt-5">

                    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 text-center">

                      <p className="text-2xl font-black">
                        {questions.length}
                      </p>

                      <p className="text-[10px] text-gray-600 mt-1">
                        Questions
                      </p>

                    </div>

                    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 text-center">

                      <p className="text-2xl font-black">
                        5
                      </p>

                      <p className="text-[10px] text-gray-600 mt-1">
                        Skills
                      </p>

                    </div>

                    <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-4 text-center">

                      <p className="text-2xl font-black">
                        Basic
                      </p>

                      <p className="text-[10px] text-gray-600 mt-1">
                        Difficulty
                      </p>

                    </div>

                  </div>

                  <div className="mt-6 space-y-3">

                    {[
                      "Java",
                      "Data Structures",
                      "SQL",
                      "OOP",
                      "Problem Solving",
                    ].map((skill, index) => (

                      <div
                        key={skill}
                        className="flex items-center gap-3"
                      >

                        <div className="w-7 h-7 rounded-lg bg-cyan-500/10 border border-cyan-400/10 flex items-center justify-center text-xs text-cyan-400">
                          {index + 1}
                        </div>

                        <span className="text-sm text-gray-400">
                          {skill}
                        </span>

                      </div>

                    ))}

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>
    );
  }

  /* =========================================================
     RESULT SCREEN
  ========================================================= */

  if (submitted && result) {
    return contentWrapper(
      <main className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10">

        <section className="rounded-3xl bg-[#0C1220] border border-white/[0.08] overflow-hidden">

          {/* Result Header */}

          <div className="relative p-6 sm:p-8 lg:p-10 text-center border-b border-white/[0.07]">

            <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl" />

            <div className="relative">

              <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center">

                <FiCheckCircle className="text-3xl text-emerald-400" />

              </div>

              <p className="text-xs text-emerald-400 uppercase tracking-[0.2em] font-bold mt-6">
                Assessment Completed
              </p>

              <h1 className="text-3xl sm:text-4xl font-black mt-2">
                Your Assessment Result
              </h1>

              <p className="text-gray-500 mt-3">
                Your result has been saved to the database.
              </p>

            </div>

          </div>

          {/* Stats */}

          <div className="p-6 sm:p-8">

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-6 text-center">

                <p className="text-xs text-gray-600 uppercase tracking-wider">
                  Score
                </p>

                <p className="text-4xl font-black mt-3 text-orange-400">
                  {result.score}/{result.totalQuestions}
                </p>

              </div>

              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-6 text-center">

                <p className="text-xs text-gray-600 uppercase tracking-wider">
                  Percentage
                </p>

                <p className="text-4xl font-black mt-3 text-cyan-400">
                  {result.percentage.toFixed(0)}%
                </p>

              </div>

              <div className="rounded-2xl bg-white/[0.03] border border-white/[0.07] p-6 text-center">

                <p className="text-xs text-gray-600 uppercase tracking-wider">
                  Correct Answers
                </p>

                <p className="text-4xl font-black mt-3 text-emerald-400">
                  {result.correctAnswers}
                </p>

              </div>

            </div>

            {/* Review */}

            <div className="mt-9">

              <div className="flex items-end justify-between mb-5">

                <div>

                  <p className="text-xs text-cyan-400 uppercase tracking-[0.2em] font-bold">
                    Battle Review
                  </p>

                  <h2 className="text-2xl font-bold mt-1">
                    Question Review
                  </h2>

                </div>

                <span className="hidden sm:block text-xs text-gray-600">
                  {questions.length} Questions
                </span>

              </div>

              <div className="space-y-3">

                {questions.map((question) => {

                  const isCorrect =
                    answers[question.id] ===
                    question.answer;

                  return (
                    <div
                      key={question.id}
                      className={`
                        rounded-2xl p-5
                        border

                        ${
                          isCorrect
                            ? "bg-emerald-500/[0.03] border-emerald-400/10"
                            : "bg-orange-500/[0.03] border-orange-400/10"
                        }
                      `}
                    >

                      <div className="flex gap-4">

                        <div
                          className={`
                            w-10 h-10 shrink-0
                            rounded-xl
                            flex items-center justify-center

                            ${
                              isCorrect
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-orange-500/10 text-orange-400"
                            }
                          `}
                        >

                          {isCorrect ? (
                            <FiCheckCircle />
                          ) : (
                            <FiXCircle />
                          )}

                        </div>

                        <div className="min-w-0">

                          <div className="flex flex-wrap items-center gap-2">

                            <span className="text-[10px] text-cyan-400 uppercase tracking-wider font-bold">
                              {question.skill}
                            </span>

                          </div>

                          <p className="font-semibold mt-1">
                            {question.question}
                          </p>

                          <p className="text-sm text-gray-500 mt-2">
                            Your answer:{" "}
                            <span
                              className={
                                isCorrect
                                  ? "text-emerald-400"
                                  : "text-orange-400"
                              }
                            >
                              {answers[
                                question.id
                              ] ||
                                "Not answered"}
                            </span>
                          </p>

                          {!isCorrect && (
                            <p className="text-sm text-gray-500 mt-1">
                              Correct answer:{" "}
                              <span className="text-emerald-400">
                                {question.answer}
                              </span>
                            </p>
                          )}

                        </div>

                      </div>

                    </div>
                  );
                })}

              </div>

            </div>

            {/* Weak Topics */}

            <div className="mt-8 rounded-2xl bg-gradient-to-r from-[#18132B] to-[#111827] border border-purple-400/15 p-6">

              <div className="flex items-start gap-4">

                <div className="w-11 h-11 shrink-0 rounded-xl bg-purple-500/10 border border-purple-400/20 flex items-center justify-center">

                  <FiTarget className="text-purple-400" />

                </div>

                <div>

                  <p className="text-xs text-purple-400 uppercase tracking-[0.2em] font-bold">
                    Areas Needing More Focus
                  </p>

                  <h3 className="text-xl font-bold mt-2">

                    {result.weakTopics.length >
                    0
                      ? result.weakTopics.join(
                          ", "
                        )
                      : "No major weak topics detected"}

                  </h3>

                  <p className="text-sm text-gray-500 mt-2">
                    These areas can be prioritized in your learning roadmap.
                  </p>

                </div>

              </div>

            </div>

            {/* Actions */}

            <div className="flex flex-col sm:flex-row gap-3 mt-8">

              <button
                onClick={restartAssessment}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-white/[0.1] bg-white/[0.03] font-semibold hover:bg-white/[0.06] transition"
              >
                Retake Assessment
              </button>

              <Link
                to="/roadmap"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-black font-bold hover:bg-orange-400 transition"
              >
                View My Roadmap
                <FiArrowRight />
              </Link>

            </div>

          </div>

        </section>

      </main>
    );
  }

  /* =========================================================
     QUESTION SCREEN
  ========================================================= */

  const question = questions[currentQuestion];

  const selectedAnswer =
    answers[question.id];

  const progress =
    ((currentQuestion + 1) /
      questions.length) *
    100;

  return contentWrapper(
    <main className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-10">

      {/* Question Header */}

      <section className="mb-7">

        <div className="flex items-end justify-between mb-3">

          <div>

            <p className="text-xs text-orange-400 uppercase tracking-[0.2em] font-bold">
              Skill Battle
            </p>

            <h1 className="text-2xl sm:text-3xl font-black mt-1">
              Question {currentQuestion + 1}
              {" "}
              <span className="text-gray-600">
                / {questions.length}
              </span>
            </h1>

          </div>

          <span className="text-sm font-bold text-cyan-400">
            {Math.round(progress)}%
          </span>

        </div>

        <div className="h-2 bg-white/[0.06] rounded-full overflow-hidden">

          <div
            className="h-full rounded-full bg-gradient-to-r from-orange-500 to-yellow-300 transition-all duration-500"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </section>

      {/* Question Card */}

      <section className="relative overflow-hidden rounded-3xl bg-[#0C1220] border border-white/[0.08] p-6 sm:p-8 lg:p-10">

        <div className="absolute -right-24 -top-24 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl" />

        <div className="relative">

          {/* Skill */}

          <div className="flex flex-wrap items-center gap-3">

            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/15 text-xs text-cyan-400 font-bold">

              <FiTarget />

              {question.skill}

            </span>

            <span className="text-xs text-gray-600">
              Question {currentQuestion + 1}
            </span>

          </div>

          {/* Question */}

          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-7 leading-9 max-w-3xl">
            {question.question}
          </h2>

          {/* Options */}

          <div className="space-y-3 mt-8">

            {question.options.map(
              (option, index) => {

                const isSelected =
                  selectedAnswer ===
                  option;

                return (
                  <button
                    key={option}
                    onClick={() =>
                      handleAnswer(
                        option
                      )
                    }
                    className={`
                      group w-full text-left
                      p-4 sm:p-5
                      rounded-2xl
                      border
                      transition-all duration-200

                      ${
                        isSelected
                          ? "border-orange-400/50 bg-orange-500/[0.08] shadow-[0_8px_30px_rgba(249,115,22,0.06)]"
                          : "border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/[0.14]"
                      }
                    `}
                  >

                    <div className="flex items-center gap-4">

                      <div
                        className={`
                          w-10 h-10 shrink-0
                          rounded-xl
                          flex items-center justify-center
                          border
                          text-sm font-bold

                          ${
                            isSelected
                              ? "bg-orange-500 text-black border-orange-400"
                              : "bg-white/[0.03] text-gray-500 border-white/[0.07] group-hover:text-white"
                          }
                        `}
                      >
                        {String.fromCharCode(
                          65 + index
                        )}
                      </div>

                      <span
                        className={`
                          font-medium

                          ${
                            isSelected
                              ? "text-white"
                              : "text-gray-400 group-hover:text-gray-200"
                          }
                        `}
                      >
                        {option}
                      </span>

                      {isSelected && (
                        <FiCheckCircle className="ml-auto text-orange-400 text-xl" />
                      )}

                    </div>

                  </button>
                );
              }
            )}

          </div>

          {/* Error */}

          {error && (
            <div className="mt-6 p-4 rounded-xl bg-red-500/5 border border-red-400/20 text-sm text-red-400 flex items-center gap-2">
              <FiAlertCircle />
              {error}
            </div>
          )}

          {/* Navigation */}

          <div className="flex items-center justify-between gap-3 mt-8 pt-6 border-t border-white/[0.07]">

            <button
              onClick={handlePrevious}
              disabled={
                currentQuestion === 0
              }
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] font-semibold text-gray-400 hover:text-white hover:bg-white/[0.05] transition disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <FiChevronLeft />
              <span className="hidden sm:inline">
                Previous
              </span>
            </button>

            {currentQuestion ===
            questions.length - 1 ? (

              <button
                onClick={handleSubmit}
                disabled={
                  !selectedAnswer ||
                  loading
                }
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-orange-500 text-black font-bold hover:bg-orange-400 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >

                <FiCheckCircle />

                {loading
                  ? "Saving..."
                  : "Submit Assessment"}

              </button>

            ) : (

              <button
                onClick={handleNext}
                disabled={!selectedAnswer}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-xl bg-orange-500 text-black font-bold hover:bg-orange-400 transition disabled:opacity-40 disabled:cursor-not-allowed"
              >

                Next
                <FiChevronRight />

              </button>

            )}

          </div>

        </div>

      </section>

    </main>
  );
}

export default Assessment;