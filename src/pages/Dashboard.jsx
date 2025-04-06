import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback } from 'react';
import { FaUpload, FaBriefcase, FaSpinner, FaVolumeUp } from 'react-icons/fa';
import { useUser } from '@clerk/clerk-react';
import { useDropzone } from 'react-dropzone';
import { analyzeResume } from '../utils/gemini';
import { speak } from '../utils/speech';
import { readFileContent } from '../utils/readFileContent';
import ResumeChart from '../components/ResumeChart';

function Dashboard() {
  const { user } = useUser();
  const [resumes, setResumes] = useState([]);
  const [jobTitle, setJobTitle] = useState('');
  const [showJobForm, setShowJobForm] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [openAnalyses, setOpenAnalyses] = useState([]);

  const extractMatchScore = (analysis) => {
    const match = analysis.match(/Match Score:\s*(\d+)%/);
    return match ? parseInt(match[1]) : 0;
  };

  const extractVoiceFeedback = (analysis) => {
    const voiceFeedbackMatch = analysis.match(/Voice Feedback(?: Summary)?:\s*([\s\S]*)/);
    return voiceFeedbackMatch ? voiceFeedbackMatch[1].trim() : null;
  };

  const playVoiceFeedback = async (analysis) => {
    const voiceFeedback = extractVoiceFeedback(analysis);
    if (voiceFeedback) {
      try {
        await speak(voiceFeedback);
      } catch (error) {
        console.error('Error playing voice feedback:', error);
      }
    }
  };

  const handleJobTitleSubmit = (e) => {
    e.preventDefault();
    setShowJobForm(false);
  };

  const analyzeResumeContent = async (file, jobTitle) => {
    const content = await readFileContent(file);
    if (!content) throw new Error('No content found in file');
    const analysis = await analyzeResume(content, jobTitle);
    if (!analysis) throw new Error('Analysis failed');
    return analysis;
  };

  const onDrop = useCallback(async (acceptedFiles) => {
    if (!jobTitle) {
      setError('Please set a job title first');
      setShowJobForm(true);
      return;
    }

    setError(null);
    setAnalyzing(true);

    const results = [];

    for (const file of acceptedFiles) {
      try {
        const analysis = await analyzeResumeContent(file, jobTitle);
        const matchScore = extractMatchScore(analysis);

        results.push({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name.replace(/\.[^/.]+$/, ''),
          analysis,
          matchScore,
          status: 'Analyzed',
          uploadDate: new Date().toISOString().split('T')[0],
        });
      } catch (error) {
        results.push({
          id: Math.random().toString(36).substr(2, 9),
          name: file.name.replace(/\.[^/.]+$/, ''),
          analysis: `Failed to analyze: ${error.message}`,
          matchScore: 0,
          status: 'Error',
          uploadDate: new Date().toISOString().split('T')[0],
        });
      }
    }

    setResumes((prev) =>
      [...prev, ...results].sort((a, b) => b.matchScore - a.matchScore)
    );

    setAnalyzing(false);
  }, [jobTitle]);

  const toggleAnalysis = (id) => {
    setOpenAnalyses((prev) =>
      prev.includes(id) ? prev.filter((resId) => resId !== id) : [...prev, id]
    );
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/plain': ['.txt'],
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
    multiple: true,
  });

  return (
    <div className="min-h-screen bg-[#0D0E23] pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-purple-400 mb-2">
              Welcome, {user?.firstName || 'User'}!
            </h1>
            <p className="text-gray-400">
              {jobTitle ? `Analyzing resumes for: ${jobTitle}` : 'Set a job title to start analyzing resumes'}
            </p>
          </div>
          <button
            onClick={() => setShowJobForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 mt-4 md:mt-0"
          >
            <FaBriefcase />
            <span>{jobTitle ? 'Change Job Title' : 'Set Job Title'}</span>
          </button>
        </div>

        {/* Job Title Form */}
        <AnimatePresence>
          {showJobForm && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8 bg-gray-800 p-6 rounded-lg"
            >
              <form onSubmit={handleJobTitleSubmit}>
                <label className="block text-gray-300 mb-2">Job Title</label>
                <input
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 mb-4"
                  placeholder="e.g. Frontend Developer"
                  required
                />
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowJobForm(false)}
                    className="text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-purple-600 px-4 py-2 rounded text-white hover:bg-purple-700"
                  >
                    Save
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`mb-8 p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-purple-400 bg-purple-400/10'
              : 'border-gray-600 hover:border-purple-400 hover:bg-purple-400/5'
          }`}
        >
          <input {...getInputProps()} />
          <FaUpload className="mx-auto text-4xl text-purple-400 mb-4" />
          <p className="text-gray-300">
            {isDragActive ? 'Drop the resumes here...' : "Drag 'n' drop resumes, or click to select files"}
          </p>
          <p className="text-gray-500 text-sm mt-2">Supports TXT, PDF, DOC, DOCX</p>
        </div>

        {analyzing && (
          <div className="text-center mb-8">
            <FaSpinner className="animate-spin text-purple-400 text-3xl mx-auto mb-2" />
            <p className="text-gray-300">Analyzing resumes...</p>
          </div>
        )}

        {/* Resume Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume, index) => (
            <motion.div
              key={resume.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`bg-gray-800 rounded-lg p-6 hover:shadow-lg transition-all ${
                resume.status === 'Error' ? 'border border-red-500/50' : ''
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">{resume.name}</h3>
                  <p className="text-purple-400">Rank #{index + 1} | Score: {resume.matchScore}%</p>
                </div>
                <button
                  onClick={() => playVoiceFeedback(resume.analysis)}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                >
                  <FaVolumeUp size={20} />
                </button>
              </div>

              <details
                open={openAnalyses.includes(resume.id)}
                className="text-gray-300 text-sm mb-4"
                onClick={() => toggleAnalysis(resume.id)}
              >
                <summary className="cursor-pointer text-purple-300 hover:underline">
                  View Full Analysis
                </summary>
                <pre className="whitespace-pre-wrap mt-2">{resume.analysis}</pre>
              </details>

              {openAnalyses.includes(resume.id) && <ResumeChart analysis={resume.analysis} />}

              <p className="text-sm text-gray-500 mt-4">Analyzed on {resume.uploadDate}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
