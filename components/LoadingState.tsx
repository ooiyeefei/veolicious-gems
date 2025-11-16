import React from 'react';

interface LoadingStateProps {
  progress: number;
  message: string;
}

const LoadingState: React.FC<LoadingStateProps> = ({ progress, message }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 min-h-[50vh]">
      <div className="w-24 h-24 border-8 border-slate-200 border-t-primary rounded-full animate-spinner mb-8"></div>
      
      <h2 className="text-3xl font-bold text-text-primary mb-4 animate-pulse">
        Generating your content...
      </h2>
      
      <div className="w-full max-w-md my-6">
        <div className="w-full bg-slate-200 rounded-full h-4 mb-2">
          <div
            className="bg-gradient-to-r from-primary to-secondary h-4 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <p className="text-lg text-text-secondary text-center font-semibold">
          {progress > 0 ? `${Math.round(progress)}%` : ''} {message}
        </p>
      </div>

      <p className="text-text-secondary mt-4">
        ⏱️ This can take up to 10 minutes. Please keep this window open.
      </p>
    </div>
  );
};

export default LoadingState;