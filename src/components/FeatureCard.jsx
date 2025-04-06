import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState } from 'react';

function FeatureCard({ icon: Icon, title, description, delay }) {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-100, 100], [30, -30]);
  const rotateY = useTransform(mouseX, [-100, 100], [-30, 30]);

  const springConfig = { damping: 25, stiffness: 400 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  function handleMouseMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setIsHovered(true)}
      className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform"
    >
      <motion.div
        animate={{
          scale: isHovered ? 1.1 : 1,
          z: isHovered ? 20 : 0,
        }}
        transition={{ duration: 0.2 }}
        className="text-purple-400 mb-4"
      >
        <Icon size={40} />
      </motion.div>
      <motion.h3
        animate={{
          z: isHovered ? 40 : 0,
        }}
        className="text-2xl font-semibold mb-3 text-purple-400"
      >
        {title}
      </motion.h3>
      <motion.p
        animate={{
          z: isHovered ? 30 : 0,
        }}
        className="text-gray-300"
      >
        {description}
      </motion.p>
    </motion.div>
  );
}

export default FeatureCard;