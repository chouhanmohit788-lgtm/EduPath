import { useEffect, useRef, useState } from "react";
import {
  FiSend,
  FiMessageCircle,
  FiUser,
  FiStar,
  FiMenu,
  FiX,
  FiHome,
  FiMap,
  FiTarget,
  FiBarChart2,
  FiCpu,
  FiUserCheck,
  FiZap,
  FiSearch,
} from "react-icons/fi";

import { chatApi } from "../services/api";

const API_BASE_URL = "https://edupath-lkv7.onrender.com/api";

function AIAssistant() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const messagesEndRef = useRef(null);

  const profileId = localStorage.getItem("profileId");

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  async function loadHistory() {
    if (!profileId) return;

    try {
      const history = await chatApi.getHistory(profileId);

      const formattedMessages = history.map((item) => ({
        role: item.sender === "AI" ? "ai" : "user",
        message: item.message,
      }));

      setMessages(formattedMessages);
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
  }

  async function handleSend(customMessage = null) {
    const trimmedMessage =
      customMessage !== null
        ? customMessage.trim()
        : input.trim();

    if (!trimmedMessage || loading || !profileId) {
      return;
    }

    setInput("");
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        message: trimmedMessage,
      },
      {
        role: "ai",
        message: "",
      },
    ]);

    try {
      const response = await fetch(
        `${API_BASE_URL}/chat/stream`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            learnerProfile: {
              id: profileId,
            },
            message: trimmedMessage,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Server error: ${response.status}`
        );
      }

      if (!response.body) {
        throw new Error(
          "Streaming response is not supported."
        );
      }

      const reader = response.body.getReader();

      const decoder = new TextDecoder("utf-8");

      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value, {
          stream: true,
        });

        const events = buffer.split("\n\n");

        buffer = events.pop() || "";

        for (const event of events) {
          const lines = event.split("\n");

          let eventType = "message";

          const dataLines = [];

          for (const line of lines) {
            if (line.startsWith("event:")) {
              eventType = line
                .substring(6)
                .trim();
            }

            if (line.startsWith("data:")) {
              dataLines.push(
                line.substring(5).trimStart()
              );
            }
          }

          const data = dataLines.join("\n");

          if (
            eventType === "message" &&
            data
          ) {
            setMessages((prev) => {
              const updated = [...prev];

              const lastIndex =
                updated.length - 1;

              if (
                updated[lastIndex]?.role ===
                "ai"
              ) {
                updated[lastIndex] = {
                  ...updated[lastIndex],

                  message:
                    updated[lastIndex]
                      .message + data,
                };
              }

              return updated;
            });
          }

          if (eventType === "error") {
            throw new Error(data);
          }

          if (eventType === "done") {
            break;
          }
        }
      }
    } catch (error) {
      console.error(
        "Streaming error:",
        error
      );

      setMessages((prev) => {
        const updated = [...prev];

        const lastIndex =
          updated.length - 1;

        if (
          updated[lastIndex]?.role ===
          "ai"
        ) {
          updated[lastIndex] = {
            ...updated[lastIndex],

            message:
              "Sorry, something went wrong. Please try again.",
          };
        }

        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(event) {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      handleSend();
    }
  }

  const suggestions = [
    "Explain Java OOP",
    "Give me DSA practice questions",
    "How should I prepare for placements?",
    "Explain binary search",
  ];

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
      active: true,
    },
    {
      label: "Profile",
      icon: FiUserCheck,
      path: "/profile",
    },
  ];

  function navigate(path) {
    window.location.href = path;
  }

  return (
    <div className="min-h-screen bg-[#050811] text-white overflow-hidden">

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

        <button
          onClick={() =>
            setSidebarCollapsed(
              !sidebarCollapsed
            )
          }
          className="hidden lg:flex absolute bottom-5 left-4 right-4 h-10 items-center justify-center rounded-xl bg-white/[0.04] border border-white/[0.06] text-slate-500 hover:text-white transition"
        >
          {sidebarCollapsed ? "→" : "← Collapse"}
        </button>

      </aside>

      {sidebarOpen && (
        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

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

            <div className="hidden sm:flex items-center gap-2 w-56 lg:w-72 h-10 px-3 rounded-xl bg-white/[0.035] border border-white/[0.07] text-slate-500">
              <FiSearch size={16} />

              <span className="text-xs">
                Search your journey...
              </span>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-orange-500/10 border border-orange-500/20">
              <FiZap
                size={15}
                className="text-orange-400"
              />

              <span className="text-xs font-semibold text-orange-300">
                7 Day Streak
              </span>
            </div>

            <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <FiStar
                size={15}
                className="text-purple-400"
              />

              <span className="text-xs font-semibold text-purple-300">
                1,240 XP
              </span>
            </div>

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-purple-500 flex items-center justify-center font-bold text-sm shadow-[0_0_18px_rgba(249,115,22,0.2)]">
              M
            </div>

          </div>

        </header>

        <main className="max-w-[1250px] mx-auto px-4 sm:px-6 py-6 sm:py-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-6">

            <div>

              <div className="flex items-center gap-3 mb-2">

                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500/20 to-cyan-500/10 border border-purple-500/20 flex items-center justify-center">
                  <FiCpu
                    size={21}
                    className="text-purple-400"
                  />
                </div>

                <div>

                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    AI Assistant
                  </h1>

                  <p className="text-sm text-slate-500">
                    Your personal AI learning companion
                  </p>

                </div>

              </div>

            </div>

            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/[0.035] border border-white/[0.07]">

              <div className="relative">

                <div className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.8)]" />

              </div>

              <div>

                <p className="text-xs font-semibold text-white">
                  EduPath AI
                </p>

                <p className="text-[10px] text-slate-500">
                  Learning system online
                </p>

              </div>

            </div>

          </div>

          <div className="rounded-3xl overflow-hidden border border-white/[0.08] bg-[#080D18] shadow-[0_20px_70px_rgba(0,0,0,0.35)]">

            <div className="px-5 sm:px-6 py-4 border-b border-white/[0.07] bg-gradient-to-r from-purple-500/[0.06] via-transparent to-orange-500/[0.04] flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-[0_0_25px_rgba(139,92,246,0.3)]">

                  <FiStar size={20} />

                  <span className="absolute -right-1 -top-1 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#080D18]" />

                </div>

                <div>

                  <h2 className="font-semibold">
                    EduPath AI
                  </h2>

                  <div className="flex items-center gap-2 text-xs text-slate-500">

                    <span className="text-emerald-400">
                      ●
                    </span>

                    Ready to help you level up

                  </div>

                </div>

              </div>

              <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-500 uppercase tracking-wider">

                <FiMessageCircle size={14} />

                AI Mentor

              </div>

            </div>

            <div className="h-[500px] sm:h-[540px] overflow-y-auto p-4 sm:p-6 space-y-5 scrollbar-thin">

              {messages.length === 0 && (
                <div className="h-full flex items-center justify-center">

                  <div className="text-center max-w-lg">

                    <div className="relative w-20 h-20 mx-auto mb-5">

                      <div className="absolute inset-0 rounded-3xl bg-purple-500/10 blur-xl" />

                      <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500/20 to-blue-500/10 border border-purple-500/20 flex items-center justify-center">

                        <FiCpu
                          size={32}
                          className="text-purple-400"
                        />

                      </div>

                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold mb-2">
                      Welcome, Learner 👋
                    </h2>

                    <p className="text-sm text-slate-500 leading-6">
                      Ask me anything about Java,
                      DSA, SQL, OOP, coding,
                      projects or placement
                      preparation.
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 mt-5">

                      <span className="px-3 py-1.5 rounded-lg bg-orange-500/10 border border-orange-500/15 text-[11px] text-orange-300">
                        Java
                      </span>

                      <span className="px-3 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/15 text-[11px] text-blue-300">
                        DSA
                      </span>

                      <span className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/15 text-[11px] text-purple-300">
                        OOP
                      </span>

                      <span className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/15 text-[11px] text-cyan-300">
                        Placements
                      </span>

                    </div>

                  </div>

                </div>
              )}

              {messages.map(
                (message, index) => {

                  const isUser =
                    message.role ===
                    "user";

                  return (
                    <div
                      key={index}
                      className={`flex gap-3 ${
                        isUser
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >

                      {!isUser && (
                        <div className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.2)]">

                          <FiStar size={16} />

                        </div>
                      )}

                      <div
                        className={`max-w-[82%] sm:max-w-[72%] rounded-2xl px-4 py-3 border ${
                          isUser
                            ? "bg-gradient-to-br from-orange-500 to-orange-600 border-orange-400/20 text-white rounded-br-md shadow-[0_8px_25px_rgba(249,115,22,0.15)]"
                            : "bg-white/[0.035] border-white/[0.07] text-slate-200 rounded-bl-md"
                        }`}
                      >

                        <p className="text-sm leading-6 whitespace-pre-wrap">
                          {message.message}

                          {!isUser &&
                            loading &&
                            index ===
                              messages.length -
                                1 && (
                              <span className="inline-flex ml-1 text-purple-400">

                                <span className="animate-pulse">
                                  ▌
                                </span>

                              </span>
                            )}
                        </p>

                      </div>

                      {isUser && (
                        <div className="w-9 h-9 shrink-0 rounded-xl bg-white/[0.07] border border-white/[0.08] flex items-center justify-center">

                          <FiUser
                            size={16}
                            className="text-orange-400"
                          />

                        </div>
                      )}

                    </div>
                  );
                }
              )}

              <div ref={messagesEndRef} />

            </div>

            <div className="px-4 sm:px-6 pb-3">

              <div className="flex gap-2 overflow-x-auto pb-1">

                {suggestions.map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() =>
                        handleSend(
                          suggestion
                        )
                      }
                      disabled={loading}
                      className="shrink-0 px-3 py-2 rounded-xl border border-white/[0.08] bg-white/[0.025] text-xs text-slate-400 hover:border-orange-500/30 hover:text-orange-300 hover:bg-orange-500/[0.04] transition disabled:opacity-40"
                    >
                      {suggestion}
                    </button>
                  )
                )}

              </div>

            </div>

            <div className="p-4 sm:p-5 border-t border-white/[0.07] bg-black/10">

              <div className="flex items-end gap-3">

                <div className="relative flex-1">

                  <textarea
                    value={input}
                    onChange={(e) =>
                      setInput(
                        e.target.value
                      )
                    }
                    onKeyDown={
                      handleKeyDown
                    }
                    placeholder="Ask EduPath AI anything..."
                    rows={1}
                    disabled={false}
                    className="w-full resize-none rounded-2xl border border-white/[0.08] bg-[#050811] text-white placeholder:text-slate-600 px-4 py-3.5 pr-4 text-sm outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20 transition"
                  />

                </div>

                <button
                  onClick={() =>
                    handleSend()
                  }
                  disabled={
                    !input.trim() ||
                    loading
                  }
                  className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-white flex items-center justify-center shadow-[0_8px_25px_rgba(249,115,22,0.2)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.35)] hover:-translate-y-0.5 transition disabled:opacity-30 disabled:hover:translate-y-0"
                >

                  <FiSend size={18} />

                </button>

              </div>

              <div className="flex items-center justify-between mt-2 px-1">

                <p className="text-[10px] text-slate-600">
                  Enter to send • Shift + Enter for new line
                </p>

                <p className="hidden sm:block text-[10px] text-slate-700">
                  Powered by EduPath AI
                </p>

              </div>

            </div>

          </div>

        </main>

      </div>

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
              item.path ===
              "/ai-assistant";

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

export default AIAssistant;