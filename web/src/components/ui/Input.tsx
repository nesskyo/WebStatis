import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, error, id, className = '', ...props }) => {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="block font-body text-sm font-medium text-ink/70 mb-1.5"
      >
        {label}
      </label>
      <input
        id={inputId}
        className={`
          w-full px-4 py-3
          font-body text-base text-ink
          bg-transparent
          border-2 border-ink/15
          focus:border-accent focus:outline-none
          transition-colors duration-200
          placeholder:text-ink/30
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1.5 font-body text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input;
