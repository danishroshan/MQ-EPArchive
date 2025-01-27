import React, { useState } from 'react';
import { FileText, Download, Clock, BookOpen, ChevronDown } from 'lucide-react';

const PaperComponent = ({ paper }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <div className="border border-gray-100 rounded-lg overflow-hidden">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between bg-white hover:bg-gray-50 transition-colors duration-200"
      >
        <div className="flex items-center space-x-3">
          <FileText className="w-5 h-5 text-blue-500" />
          <div className="text-left">
            <span className="font-medium text-gray-900">{paper.year} {paper.session}</span>
            <span className="ml-2 text-sm text-gray-500">{paper.level}</span>
          </div>
        </div>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'transform rotate-180' : ''}`} />
      </button>
      
      {isExpanded && (
        <div className="border-t border-gray-100">
          {paper.components.map((component, idx) => (
            <div key={idx} className="p-4 flex items-center justify-between hover:bg-blue-50/50 transition-colors duration-200">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-gray-700">{component.name}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1.5 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{component.duration}</span>
                </div>
                <a 
                  href={component.downloadLink}
                  className="p-2 text-blue-500 hover:bg-blue-100 rounded-lg transition-colors duration-200"
                >
                  <Download className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaperComponent;