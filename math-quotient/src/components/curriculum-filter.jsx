import React from 'react';
import { GraduationCap, Star, BookOpen } from 'lucide-react';

const CurriculumFilter = ({ selectedCurriculum, onCurriculumChange }) => {
  const curriculums = [
    { id: 'all', name: 'All Curriculums', icon: GraduationCap, color: 'bg-violet-500' },
    { id: 'british', name: 'British', icon: GraduationCap, color: 'bg-blue-500' },
    { id: 'ib', name: 'IB', icon: Star, color: 'bg-emerald-500' },
    { id: 'american', name: 'American', icon: BookOpen, color: 'bg-orange-500' },
    { id: 'indian', name: 'Indian', icon: BookOpen, color: 'bg-violet-500' },
    { id: 'australian', name: 'Australian', icon: BookOpen, color: 'bg-blue-500' },
    { id: 'canadian', name: 'Canadian', icon: BookOpen, color: 'bg-emerald-500' },
    { id: 'german', name: 'German', icon: BookOpen, color: 'bg-orange-500' },
  ];

  return (
    <div className="flex overflow-x-auto space-x-3 py-2 px-1">
      {curriculums.map((curriculum) => {
        const Icon = curriculum.icon;
        const isSelected = selectedCurriculum === curriculum.id;
        return (
          <button
            key={curriculum.id}
            onClick={() => onCurriculumChange(curriculum.id)}
            className={`flex items-center px-5 py-3 rounded-xl whitespace-nowrap transition-all duration-300 ${
              isSelected
                ? `${curriculum.color} text-white`
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Icon className="w-4 h-4 mr-2" />
            <span className="font-semibold">{curriculum.name}</span>
          </button>
        );
      })}
    </div>
  );
};

export default CurriculumFilter;