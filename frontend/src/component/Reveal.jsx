import { motion } from "framer-motion";

/**
 * Reveal
 *
 * Wraps any section and animates it in the first time it scrolls
 * into view. Combines fade + slide + a subtle scale/blur focus pull
 * for a more premium, cinematic feel than a plain fade.
 *
 * Props:
 * - delay: extra delay (seconds) before this section's animation starts
 * - direction: "up" | "down" | "left" | "right" — which way it slides in from
 * - distance: how far (px) it travels during the reveal
 * - amount: how much of the section must be visible before it triggers (0-1)
 */
const Reveal = ({
  children,
  delay = 0,
  direction = "up",
  distance = 60,
  amount = 0.15,
}) => {
  const offset = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { y: 0, x: distance },
    right: { y: 0, x: -distance },
  }[direction];

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: offset.y,
        x: offset.x,
        scale: 0.96,
        filter: "blur(6px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        filter: "blur(0px)",
      }}
      viewport={{ once: true, amount }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1], // smooth "premium" ease-out curve
      }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;
