import React, { useState, useCallback } from 'react';
import type { ApiResponse, Toast } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import LoadingState from './components/LoadingState';
import Results from './components/Results';
import ToastNotification from './components/ToastNotification';
import { generateContent } from './services/api';

type View = 'form' | 'loading' | 'results' | 'error';

interface LoadingProgress {
  progress: number;
  message: string;
}

const App: React.FC = () => {
  const [view, setView] = useState<View>('form');
  const [error, setError] = useState<string | null>(null);
  const [resultsData, setResultsData] = useState<ApiResponse | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [loadingProgress, setLoadingProgress] = useState<LoadingProgress>({ progress: 0, message: '' });

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleGenerate = async (websiteUrl: string, address: string, numDays: number) => {
    setView('loading');
    setError(null);
    setResultsData(null);
    setLoadingProgress({ progress: 0, message: 'Initializing job...' });

    const onProgress = (progress: number, message: string) => {
      setLoadingProgress({ progress, message });
    };

    try {
      const result = await generateContent(websiteUrl, address, numDays, onProgress);
      
      setResultsData(result);
      setView('results');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Generation failed: ${errorMessage}. Please try again.`);
      setView('error');
      showToast(`Generation failed: ${errorMessage}`, 'error');
    }
  };

  const handleTryAgain = () => {
    setView('form');
    setError(null);
  }

  const renderContent = () => {
    switch (view) {
      case 'loading':
        return <LoadingState progress={loadingProgress.progress} message={loadingProgress.message} />;
      case 'results':
        return resultsData ? <Results data={resultsData} showToast={showToast} /> : <LoadingState progress={100} message={"Loading results..."} />;
      case 'error':
        return (
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold text-error mb-4">Oops! Something went wrong.</h2>
            <p className="text-text-secondary mb-6">{error}</p>
            <button
              onClick={handleTryAgain}
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-lg shadow-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 ease-in-out"
            >
              Try Again
            </button>
          </div>
        );
      case 'form':
      default:
        return <Hero onGenerate={handleGenerate} />;
    }
  };

  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)] opacity-20"></div>
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Header />
        <main>
          {renderContent()}
        </main>
      </div>
       <footer className="text-center py-8 text-text-secondary">
        <p>Powered by Gemini, Veo, and Google Cloud</p>
      </footer>
      {toast && <ToastNotification message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
};

export default App;