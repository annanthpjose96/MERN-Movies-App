import { useEffect, useRef, useState } from "react";
import { FaPaperPlane, FaRobot, FaTimes, FaPlus } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import ReactMarkdown from "react-markdown";

import { askMovieAI, clearAISession } from "../../redux/api/aiApi";

import MovieCard from "./MovieCard";

const DEFAULT_MESSAGES = [
  {
    sender: "ai",
    type: "chat",
    text:
      "👋 **Hello! I'm MovieFlix AI.**\n\n" +
      "Ask me anything about movies.\n\n" +
      "🎬 Recommendations\n" +
      "🍿 What to watch\n" +
      "⭐ Similar movies\n" +
      "🎭 Genres\n" +
      "📖 Movie explanations",
  },
];

const SUGGESTED_PROMPTS = [
  "🎬 Action",
  "😂 Comedy",
  "❤️ Romance",
  "👻 Horror",
  "🚀 Sci-Fi",
  "🧠 Mind Bending",
  "🔥 Trending",
  "🏆 Top Rated",
];

/* ================= ANIMATION VARIANTS ================= */

const panelVariant = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: 30,
    scale: 0.92,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const promptsContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.04, delayChildren: 0.15 },
  },
};

const promptItem = {
  hidden: { opacity: 0, y: 8, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

const messageVariant = {
  hidden: { opacity: 0, y: 12, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const AIChat = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem("movieflix-ai-chat");

    if (!saved) return DEFAULT_MESSAGES;

    try {
      const parsed = JSON.parse(saved);

      return parsed.length ? parsed : DEFAULT_MESSAGES;
    } catch {
      return DEFAULT_MESSAGES;
    }
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("movieflix-ai-chat", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const startNewChat = () => {
    clearAISession();

    setMessages(DEFAULT_MESSAGES);

    setInput("");
  };

  const sendMessage = async (customPrompt = null) => {
    const prompt = customPrompt || input;

    if (!prompt.trim() || loading) return;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        type: "chat",
        text: prompt,
      },
    ]);

    if (!customPrompt) {
      setInput("");
    }

    setLoading(true);

    try {
      const response = await askMovieAI(prompt);

      if (response.type === "recommendation") {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            type: "recommendation",
            text: response.message,
            movies: response.movies,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: "ai",
            type: "chat",
            text: response.message,
          },
        ]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          sender: "ai",
          type: "chat",
          text: "❌ Sorry, I couldn't reach the AI server. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="ai-chat-panel"
          variants={panelVariant}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-24 right-8 z-[999] w-[380px] h-[600px] bg-[#141414] rounded-3xl border border-zinc-700 shadow-2xl overflow-hidden flex flex-col"
        >
          {/* ================= HEADER ================= */}

          <div className="bg-red-600 px-5 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.span
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 4,
                  }}
                >
                  <FaRobot className="text-white text-lg" />
                </motion.span>

                <h2 className="text-white font-bold text-2xl">
                  MovieFlix AI
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <motion.button
                  onClick={startNewChat}
                  title="New Chat"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9, rotate: 180 }}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <FaPlus size={12} className="text-white" />
                </motion.button>

                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.15, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-white text-lg"
                >
                  <FaTimes />
                </motion.button>
              </div>
            </div>
          </div>

          {/* ================= SUGGESTED PROMPTS ================= */}

          <div className="border-b border-zinc-800 px-4 py-3">
            <motion.div
              className="flex flex-wrap gap-2"
              variants={promptsContainer}
              initial="hidden"
              animate="visible"
            >
              {SUGGESTED_PROMPTS.map((prompt) => (
                <motion.button
                  key={prompt}
                  variants={promptItem}
                  disabled={loading}
                  onClick={() => sendMessage(prompt)}
                  whileHover={{ scale: 1.06 }}
                  whileTap={{ scale: 0.94 }}
                  className="bg-zinc-800 hover:bg-red-600 transition-colors rounded-full px-3 py-1.5 text-[12px] text-gray-200"
                >
                  {prompt}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* ================= CHAT ================= */}

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                variants={messageVariant}
                initial="hidden"
                animate="visible"
              >
                <div
                  className={`flex ${
                    message.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2.5 rounded-2xl whitespace-pre-wrap leading-6 shadow ${
                      message.sender === "user"
                        ? "bg-red-600 text-white rounded-br-md"
                        : "bg-zinc-800 text-gray-200 rounded-bl-md"
                    }`}
                  >
                    <ReactMarkdown
                      components={{
                        h1: ({ children }) => (
                          <h1 className="text-lg font-bold mb-2">
                            {children}
                          </h1>
                        ),

                        h2: ({ children }) => (
                          <h2 className="text-base font-bold mb-2">
                            {children}
                          </h2>
                        ),

                        h3: ({ children }) => (
                          <h3 className="font-bold mb-2">{children}</h3>
                        ),

                        p: ({ children }) => (
                          <p className="mb-2">{children}</p>
                        ),

                        ul: ({ children }) => (
                          <ul className="list-disc pl-5 space-y-1">
                            {children}
                          </ul>
                        ),

                        ol: ({ children }) => (
                          <ol className="list-decimal pl-5 space-y-1">
                            {children}
                          </ol>
                        ),

                        li: ({ children }) => <li>{children}</li>,

                        strong: ({ children }) => (
                          <strong className="font-bold text-white">
                            {children}
                          </strong>
                        ),

                        code: ({ children }) => (
                          <code className="bg-black rounded px-1 py-0.5 text-red-400">
                            {children}
                          </code>
                        ),

                        a: ({ href, children }) => (
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="text-blue-400 underline"
                          >
                            {children}
                          </a>
                        ),
                      }}
                    >
                      {message.text}
                    </ReactMarkdown>
                  </div>
                </div>

                {message.type === "recommendation" &&
                  message.movies &&
                  message.movies.length > 0 && (
                    <motion.div
                      className="mt-3 space-y-3"
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: {},
                        visible: {
                          transition: { staggerChildren: 0.08 },
                        },
                      }}
                    >
                      {message.movies.map((movie) => (
                        <motion.div
                          key={movie.id}
                          variants={{
                            hidden: { opacity: 0, y: 10 },
                            visible: { opacity: 1, y: 0 },
                          }}
                        >
                          <MovieCard movie={movie} />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
              </motion.div>
            ))}

            <AnimatePresence>
              {loading && (
                <motion.div
                  key="typing-indicator"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="flex justify-start"
                >
                  <div className="bg-zinc-800 px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-3">
                    <FaRobot className="text-red-500 text-lg" />

                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-bounce"></span>

                      <span
                        className="w-2 h-2 rounded-full bg-red-500 animate-bounce"
                        style={{
                          animationDelay: "0.15s",
                        }}
                      ></span>

                      <span
                        className="w-2 h-2 rounded-full bg-red-500 animate-bounce"
                        style={{
                          animationDelay: "0.3s",
                        }}
                      ></span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* ================= INPUT ================= */}

          <div className="border-t border-zinc-800 bg-[#181818] p-3">
            <div className="flex items-center gap-2">
              {" "}
              <input
                type="text"
                value={input}
                placeholder="Ask MovieFlix AI..."
                disabled={loading}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage();
                  }
                }}
                className="flex-1 bg-zinc-800 rounded-xl px-4 py-2.5 outline-none text-white placeholder-gray-500 border border-transparent focus:border-red-500 transition"
              />
              <motion.button
                onClick={() => sendMessage()}
                disabled={loading}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-xl bg-red-600 hover:bg-red-700 disabled:bg-red-900 flex items-center justify-center transition-colors duration-200"
              >
                <FaPaperPlane className="text-white text-sm" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIChat;
