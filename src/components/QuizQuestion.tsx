import React, { useState } from 'react';
import Timer from './Timer';

interface Option {
  id: string;
  text: string;
}

interface QuizQuestionProps {
  options: Option[];
  correctAnswer: string;
  onSubmit: (isCorrect: boolean, selectedOption: string | null) => void;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({ 
  options, 
  correctAnswer, 
  onSubmit 
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    const isCorrect = selectedOption === correctAnswer;
    onSubmit(isCorrect, selectedOption);
  };

  const handleTimeUp = () => {
    onSubmit(selectedOption === correctAnswer, selectedOption);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <Timer duration={20} onTimeUp={handleTimeUp} />
      </div>
      
      <h2 className="text-xl font-bold text-gray-800 mb-4">What is the law of power?</h2>
      
      <div className="space-y-3">
        {options.map((option) => (
          <div 
            key={option.id}
            onClick={() => handleOptionSelect(option.id)}
            className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
              selectedOption === option.id 
                ? 'border-[#0072CE] bg-[#0072CE]/10 ring-2 ring-[#0072CE]' 
                : 'border-gray-200 hover:border-[#0072CE]/50 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-start">
              <div className={`flex items-center justify-center w-6 h-6 rounded-full border ${
                selectedOption === option.id ? 'border-[#0072CE] bg-[#0072CE]' : 'border-gray-300'
              } mr-3`}>
                {selectedOption === option.id && (
                  <span className="text-white text-sm">✓</span>
                )}
              </div>
              <span className={`${selectedOption === option.id ? 'font-medium' : ''}`}>
                {option.text}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={handleSubmit}
        disabled={!selectedOption}
        className={`w-full mt-6 py-2 px-4 rounded-md text-white font-medium transition-all duration-200 ${
          selectedOption 
            ? 'bg-[#0072CE] hover:bg-[#005bb7] shadow-md' 
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        Submit Answer
      </button>
    </div>
  );
};

export default QuizQuestion;