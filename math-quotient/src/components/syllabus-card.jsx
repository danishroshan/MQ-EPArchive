import React from 'react';
import { Sigma } from 'lucide-react';
import PaperComponent from './paper-component';

const SyllabusCard = ({ syllabus }) => {
  const curriculumColors = {
    british: 'bg-blue-500',
    ib: 'bg-emerald-500',
    american: 'bg-orange-500'
  };

  const iconColor = curriculumColors[syllabus.curriculum] || 'bg-violet-500';

  return (
    <div 
      className="bg-white rounded-2xl border border-gray-200 overflow-hidden" 
      style={{ backgroundColor: 'white' }}
    >
      <div className="p-6 border-b border-gray-100 bg-white">
        <div className="flex items-start space-x-4">
          <div className={`p-4 rounded-xl ${iconColor} text-white`}>
            <Sigma className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3">
              <h3 className="text-xl font-bold text-gray-900">{syllabus.subject}</h3>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-medium rounded-full">
                {syllabus.examBoard}
              </span>
            </div>
            <p className="mt-2 text-gray-600 text-sm leading-relaxed">
              {syllabus.description}
            </p>
          </div>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100 bg-white">
        {syllabus.papers.map((paper, idx) => (
          <PaperComponent key={idx} paper={paper} />
        ))}
      </div>
    </div>
  );
};

export default SyllabusCard;