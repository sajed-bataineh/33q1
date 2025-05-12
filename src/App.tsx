import React, { useState } from 'react';
import NameEntry from './components/NameEntry';
import QuizQuestion from './components/QuizQuestion';
import QuizResult from './components/QuizResult';

// Quiz data
const quizOptions = [
  { id: 'A', text: 'Hardware is intangible, software is physical' },
  { id: 'B', text: 'Hardware is physical, software is programs' },
  { id: 'C', text: 'No difference' },
  { id: 'D', text: 'Software manages electricity' }
];

const correctAnswer = 'B';

// Quiz steps
enum QuizStep {
  NAME_ENTRY,
  QUESTION,
  RESULT
}

function App() {
  const [currentStep, setCurrentStep] = useState(QuizStep.NAME_ENTRY);
  const [participantName, setParticipantName] = useState('');
  const [quizResult, setQuizResult] = useState<{
    isCorrect: boolean;
    selectedOption: string | null;
  } | null>(null);

  const handleNameSubmit = (name: string) => {
    setParticipantName(name);
    setCurrentStep(QuizStep.QUESTION);
  };

  const handleQuizSubmit = (isCorrect: boolean, selectedOption: string | null) => {
    setQuizResult({ isCorrect, selectedOption });
    setCurrentStep(QuizStep.RESULT);
  };

  const handleRestart = () => {
    setCurrentStep(QuizStep.NAME_ENTRY);
    setQuizResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col items-center justify-center px-4 py-12 relative">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-[#0072CE]">IT and IOT competition</h1>
        <p className="text-gray-600 mt-2">Quick Knowledge Quiz</p>
      </header>

      <main className="w-full max-w-md">
        {currentStep === QuizStep.NAME_ENTRY && (
          <div className="animate-fadeIn">
            <NameEntry onSubmit={handleNameSubmit} />
          </div>
        )}

        {currentStep === QuizStep.QUESTION && (
          <div className="animate-fadeIn">
            <QuizQuestion 
              options={quizOptions}
              correctAnswer={correctAnswer}
              onSubmit={handleQuizSubmit}
            />
          </div>
        )}

        {currentStep === QuizStep.RESULT && quizResult && (
          <div className="animate-fadeIn">
            <QuizResult 
              isCorrect={quizResult.isCorrect}
              participantName={participantName}
              selectedOption={quizResult.selectedOption}
              correctOption={correctAnswer}
              options={quizOptions}
              onRestart={handleRestart}
            />
          </div>
        )}
      </main>

      <footer className="absolute bottom-4 text-center text-sm text-gray-500">
        Developed by Sajed Bataineh
      </footer>
    </div>
  );
}

export default App;