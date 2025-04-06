import { motion } from 'framer-motion';
import { FaRobot, FaClock, FaBullseye, FaChartBar, FaShieldAlt } from 'react-icons/fa';
import ScrollIndicator from '../components/ScrollIndicator';
import FeatureCard from '../components/FeatureCard';

function Home() {
  const features = [
    {
      icon: FaRobot,
      title: "Smart AI Matching",
      description: "Our advanced AI analyzes resumes in seconds, matching candidates to jobs with 95% accuracy using natural language processing."
    },
    {
      icon: FaClock,
      title: "Lightning Fast",
      description: "Process thousands of resumes in minutes, not hours. Reduce screening time by 75% while improving quality of hire."
    },
    {
      icon: FaBullseye,
      title: "Precision Ranking",
      description: "Multi-factor scoring algorithm ranks candidates by skills, experience, and cultural fit, ensuring you find the perfect match."
    },
    {
      icon: FaChartBar,
      title: "Rich Analytics",
      description: "Real-time insights into your hiring pipeline. Track metrics, identify bottlenecks, and optimize your recruitment process."
    },
    {
      icon: FaShieldAlt,
      title: "Enterprise Security",
      description: "Bank-grade encryption and compliance with GDPR, CCPA, and other privacy regulations keep your data safe and secure."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center hero-bg">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80"
            alt="Technology Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-5xl md:text-6xl font-bold mb-6 hero-text"
              >
                NEXT GENERATION TECHNOLOGY
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl text-gray-300 mb-8"
              >
                Upload your works and reach your dream company
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="space-x-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary"
                >
                  Start For Free
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary"
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="hidden md:block"
            >
              <img
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=80"
                alt="AI Technology"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
          <ScrollIndicator />
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-20 bg-gradient-to-b from-[#0D0E23] to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-4 text-purple-400">Why Choose RAMI?</h2>
            <p className="text-xl text-gray-300">
              Powerful features that transform your hiring process
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home