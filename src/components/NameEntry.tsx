import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

interface NameEntryProps {
  onSubmit: (name: string) => void;
}

const NameEntry: React.FC<NameEntryProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError('Please enter your name');
      return;
    }

    onSubmit(name.trim());
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg transform transition-all duration-300 ease-in-out">
      <h2 className="text-2xl font-bold text-center mb-6 text-[#0072CE]">Welcome to IEEE WIE Competition</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Enter your name to begin
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            className={`w-full px-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#0072CE] focus:border-transparent transition-all duration-200`}
            placeholder="Your Name"
            autoFocus
          />
          {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-[#0072CE] hover:bg-[#005bb7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0072CE] transition-colors duration-200"
        >
          <span>Start Quiz</span>
          <ArrowRight className="ml-2 h-4 w-4" />
        </button>
      </form>
    </div>
  );
};

export default NameEntry;