import { FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";

const AIButton = ({ onClick }) => {
  return (
    <div className="fixed bottom-8 right-8 z-[999]">
      {/* Idle pulsing ring — draws the eye without being distracting */}
      <motion.span
        className="absolute inset-0 rounded-full bg-red-600"
        animate={{
          scale: [1, 1.5, 1.5],
          opacity: [0.5, 0, 0],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeOut",
        }}
      />

      <motion.button
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.92 }}
        initial={{ opacity: 0, y: 20, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="
          relative
          w-16
          h-16
          rounded-full
          bg-red-600
          hover:bg-red-700
          shadow-2xl
          transition-colors
          duration-300
          flex
          items-center
          justify-center
          group
        "
      >
        <motion.span
          animate={{ rotate: [0, -8, 8, -8, 0] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
        >
          <FaRobot
            size={28}
            className="text-white group-hover:rotate-12 transition-transform duration-300"
          />
        </motion.span>
      </motion.button>
    </div>
  );
};

export default AIButton;
