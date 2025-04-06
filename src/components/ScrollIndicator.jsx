import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

function ScrollIndicator() {
  const scrollToFeatures = () => {
    const featuresSection = document.getElementById('features');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      onClick={scrollToFeatures}
      className="cursor-pointer flex flex-col items-center mt-12"
    >
      <span className="text-gray-600 mb-2">See How It Works</span>
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <FaChevronDown className="text-blue-600" size={24} />
      </motion.div>
    </motion.div>
  );
}

export default ScrollIndicator;