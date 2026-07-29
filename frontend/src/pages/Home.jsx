import { motion } from "framer-motion";
import Navbar from "../component/Landing/Navbar";
import Hero from "../component/Landing/Hero";
import Trending from "../component/Landing/Trending";
import Reasons from "../component/Landing/Reasons";
import FAQ from "../component/Landing/FAQ";
import Footer from "../component/Landing/Footer";
import Reveal from "../component/Reveal";

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-black min-h-screen"
    >
      <Navbar />

      <Hero />

      <Reveal>
        <Trending />
      </Reveal>

      <Reveal delay={0.1}>
        <Reasons />
      </Reveal>

      <Reveal delay={0.2}>
        <FAQ />
      </Reveal>

      <Reveal delay={0.3}>
        <Footer />
      </Reveal>
    </motion.div>
  );
};

export default Home;