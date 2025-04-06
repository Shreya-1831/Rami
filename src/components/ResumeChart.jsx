// src/components/ResumeChart.jsx
import {
    PieChart, Pie, Cell,
    BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
  } from 'recharts';
  
  const COLORS = ['#4ade80', '#f87171'];
  
  export default function ResumeChart({ analysis }) {
    const match = parseInt(analysis.match(/Match Score:\s*(\d+)%/)?.[1] || 0);
    const presentSkills = analysis.match(/Key Skills Present:\n([\s\S]*?)\nMissing Skills:/)?.[1]?.trim().split('\n') || [];
    const missingSkills = analysis.match(/Missing Skills:\n([\s\S]*?)\nExperience:/)?.[1]?.trim().split('\n') || [];
    const totalExperience = parseFloat(analysis.match(/Total:\s*(\d+(?:\.\d+)?)/)?.[1] || 0);
    const relevantExperience = parseFloat(analysis.match(/Relevant:\s*(\d+(?:\.\d+)?)/)?.[1] || 0);
  
    return (
      <div className="space-y-4 mt-4">
        {/* Match Score */}
        <div>
          <p className="text-white text-sm mb-1">Match Score</p>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={[
                  { name: 'Match', value: match },
                  { name: 'Remaining', value: 100 - match },
                ]}
                dataKey="value"
                outerRadius={60}
                label
              >
                <Cell fill={COLORS[0]} />
                <Cell fill={COLORS[1]} />
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
  
        {/* Skills */}
        <div>
          <p className="text-white text-sm mb-1">Skills Present vs Missing</p>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={[
              { name: 'Present', value: presentSkills.length },
              { name: 'Missing', value: missingSkills.length },
            ]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#60a5fa" />
            </BarChart>
          </ResponsiveContainer>
        </div>
  
        {/* Experience */}
        <div>
          <p className="text-white text-sm mb-1">Experience (Years)</p>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={[
              { name: 'Total', value: totalExperience },
              { name: 'Relevant', value: relevantExperience },
            ]}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#facc15" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
  