import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { SignedIn, SignedOut, UserButton, useClerk } from '@clerk/clerk-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const clerk = useClerk();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex-shrink-0">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-3xl font-bold gradient-text"
            >
              RAMI
            </motion.div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <SignedIn>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
            </SignedIn>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/contact" className="nav-link">Contact</Link>
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10"
                  }
                }}
              />
            </SignedIn>
            <SignedOut>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => clerk.openSignIn({ routing: 'path' })}
                className="text-blue-600 border border-blue-600 px-4 py-2 rounded-full hover:bg-blue-50 transition-colors"
              >
                Sign In
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => clerk.openSignUp({ routing: 'path' })}
                className="gradient-bg px-4 py-2 rounded-full text-white hover:opacity-90 transition-opacity"
              >
                Sign Up
              </motion.button>
            </SignedOut>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-blue-600"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                <Link
                  to="/"
                  className="block px-3 py-2 nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <SignedIn>
                  <Link
                    to="/dashboard"
                    className="block px-3 py-2 nav-link"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                </SignedIn>
                <Link
                  to="/about"
                  className="block px-3 py-2 nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="block px-3 py-2 nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
                <SignedOut>
                  <button 
                    onClick={() => clerk.openSignIn({ routing: 'path' })}
                    className="block w-full text-left px-3 py-2 nav-link"
                  >
                    Sign In
                  </button>
                  <button 
                    onClick={() => clerk.openSignUp({ routing: 'path' })}
                    className="block w-full text-left px-3 py-2 gradient-bg text-white rounded-full"
                  >
                    Sign Up
                  </button>
                </SignedOut>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}

export default Navbar;