import React from 'react';

interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
}

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange, label }) => {
  return (
    <div className="flex items-center justify-between py-1 cursor-pointer group" onClick={() => onChange(!checked)}>
      <span className="text-xs text-gray-400 group-hover:text-gray-200 transition-colors select-none">{label}</span>
      <div className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 ease-in-out ${checked ? 'bg-green-600' : 'bg-gray-700'}`}>
        <div className={`w-3 h-3 bg-white rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
      </div>
    </div>
  );
};