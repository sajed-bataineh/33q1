import React, { useEffect } from 'react';
import { CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface QuizResultProps {
  isCorrect: boolean;
  participantName: string;
  selectedOption: string | null;
  correctOption: string;
  options: { id: string; text: string }[];
  onRestart: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({
  isCorrect,
  participantName,
  selectedOption,
  correctOption,
  options,
  onRestart
}) => {
  // Find the text of the correct and selected options
  const correctText = options.find(opt => opt.id === correctOption)?.text;
  const selectedText = selectedOption 
    ? options.find(opt => opt.id === selectedOption)?.text 
    : 'No answer selected';

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg animate-fadeIn">
      <div className="flex flex-col items-center mb-6">
        {isCorrect ? (
          <>
            <div className="mb-4 text-green-500">
              <CheckCircle size={64} />
            </div>
            <h2 className="text-2xl font-bold text-center text-green-600">
              Well done, {participantName}!
            </h2>
            <p className="text-center text-green-600 font-medium mt-1">
              Your answer is correct.
            </p>
          </>
        ) : (
          <>
            <div className="mb-4 text-red-500">
              <XCircle size={64} />
            </div>
            <h2 className="text-2xl font-bold text-center text-red-600">
              Sorry, {participantName}.
            </h2>
            <p className="text-center text-red-600 font-medium mt-1">
              Your answer is incorrect.
            </p>
          </>
        )}
      </div>

      <div className="border-t border-b border-gray-200 py-4 mb-4">
        <div className="mb-4">
        </div>
        
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-500">Correct answer:</p>
          <p className="text-md font-medium text-green-600">{correctText}</p>
        </div>
        
        {!isCorrect && selectedOption && (
          <div>
            <p className="text-sm font-medium text-gray-500">Your answer:</p>
            <p className="text-md font-medium text-red-600">{selectedText}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizResult;