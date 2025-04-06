import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl font-bold text-center mb-12">About RAMI</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-bold mb-4 text-blue-600">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                RAMI is revolutionizing the recruitment industry through innovative 
                AI-powered resume screening. Our mission is to eliminate the tedious 
                manual screening process and help recruiters focus on what matters most: 
                connecting with great candidates.
              </p>
              <p className="text-gray-600">
                We believe in creating efficiency through technology while maintaining 
                the human touch in recruitment.
              </p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white p-8 rounded-lg shadow-md"
            >
              <h2 className="text-2xl font-bold mb-4 text-purple-600">Our Vision</h2>
              <p className="text-gray-600 mb-6">
                We envision a future where recruitment is seamless, unbiased, and 
                data-driven. RAMI combines advanced AI algorithms with human expertise 
                to transform how organizations find talent.
              </p>
              <p className="text-gray-600">
                Our goal is to make sophisticated resume screening technology accessible 
                to organizations of all sizes.
              </p>
            </motion.div>
          </div>

          <div className="mt-16" ref={ref}>
            <h2 className="text-2xl font-bold mb-8 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold mb-2 text-blue-600">Innovation</h3>
                <p className="text-gray-600">
                  Pushing the boundaries of AI technology in recruitment
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold mb-2 text-purple-600">Efficiency</h3>
                <p className="text-gray-600">
                  Streamlining processes to save time and resources
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-white p-6 rounded-lg shadow-md"
              >
                <h3 className="text-xl font-bold mb-2 text-blue-600">Fairness</h3>
                <p className="text-gray-600">
                  Ensuring unbiased and equitable screening processes
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default About;