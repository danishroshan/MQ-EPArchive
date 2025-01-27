import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/navbar';
import SearchBar from './components/search-bar';
import CurriculumFilter from './components/curriculum-filter';
import SyllabusCard from './components/syllabus-card';
import { syllabusData } from './data/syllabus-data';
import heroImg from './heroImg.png';

const MathBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const symbols = ['∑', '∫', 'π', '√', '∞', 'θ', 'λ', '+', '=', 'α', 'β', 'Δ'];
  const [particles, setParticles] = useState([]);

  const createParticles = useCallback(() => {
    const gridGap = 100;
    const rows = Math.ceil(300 / gridGap); // Adjusted for the header height
    const cols = Math.ceil((window.innerWidth * 2) / gridGap);
    const newParticles = [];
    
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        newParticles.push({
          id: `${row}-${col}`,
          x: col * gridGap + gridGap/2,
          y: row * gridGap + gridGap/2,
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
          size: 24,
          opacity: 0.4,
        });
      }
    }
    
    return newParticles;
  }, []);

  useEffect(() => {
    setParticles(createParticles());

    const handleResize = () => {
      setParticles(createParticles());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [createParticles]);

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  return (
    <div 
      className="absolute inset-0 pointer-events-none overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="animate-move-left flex">
        <div className="flex-none">
          {particles.map((particle) => {
            const distance = Math.sqrt(
              Math.pow(mousePosition.x - particle.x, 2) + 
              Math.pow(mousePosition.y - particle.y, 2)
            );
            const interaction = distance < 300 ? (300 - distance) / 300 : 0;
            
            return (
              <div
                key={particle.id}
                className="absolute transform transition-all duration-300 select-none text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500"
                style={{
                  left: particle.x,
                  top: particle.y,
                  fontSize: particle.size + interaction * 10 + 'px',
                  opacity: 0.35,
                  transform: `translate(-50%, -50%) rotate(${45 + interaction * 45}deg)`,
                }}
              >
                {particle.symbol}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const PastPaperLibrary = () => {
  const [selectedCurriculum, setSelectedCurriculum] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSyllabus = syllabusData.filter(syllabus => {
    const matchesCurriculum = selectedCurriculum === 'all' || syllabus.curriculum === selectedCurriculum;
    const matchesSearch = syllabus.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         syllabus.examBoard.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCurriculum && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <style>
        {`
          @keyframes moveLeft {
            from { transform: translateX(0); }
            to { transform: translateX(-100%); }
          }
          @keyframes floatUpDown {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-15px); }
          }
          .animate-move-left {
            animation: moveLeft 80s linear infinite;
          }
          .animate-float {
            animation: floatUpDown 4s ease-in-out infinite;
          }
        `}
      </style>
      
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 pt-20 pb-10">
        <div className="text-center mb-4 p-2 rounded-lg relative overflow-hidden">
          <MathBackground />
          
          <div className="w-56 h-56 mx-auto mb-2 relative z-10 animate-float">
            <img 
              src={heroImg} 
              alt="Student conquering mountains" 
              className="w-full h-full object-contain"
            />
          </div>

          <h1 className="text-5xl font-serif font-medium text-gray-900 mb-4 relative inline-block z-10">
            Exam Papers Archive
            <div className="absolute -bottom-2 right-0 w-1/2 transform -translate-x-1/2">
              <svg className="w-full" height="16" preserveAspectRatio="none" viewBox="0 0 400 16">
                <path 
                  d="M 0,8 C 50,2 100,14 150,8 S 250,2 300,8 S 350,14 400,8" 
                  className="stroke-indigo-200"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path 
                  d="M 0,10 C 75,4 125,16 200,10 S 300,4 400,10" 
                  className="stroke-teal-200"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path 
                  d="M 0,12 C 100,6 150,14 250,12 S 350,6 400,12" 
                  className="stroke-indigo-300"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto relative z-10">
            All your previous years' question papers in one place to help you prepare and succeed.
          </p>
        </div>

        <div className="mb-8 space-y-6">
          <SearchBar 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <CurriculumFilter
            selectedCurriculum={selectedCurriculum}
            onCurriculumChange={setSelectedCurriculum}
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          {filteredSyllabus.map((syllabus, index) => (
            <SyllabusCard key={index} syllabus={syllabus} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastPaperLibrary;