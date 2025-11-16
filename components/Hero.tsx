import React, { useState } from 'react';

interface HeroProps {
  onGenerate: (websiteUrl: string, address: string, numDays: number) => void;
}

const Hero: React.FC<HeroProps> = ({ onGenerate }) => {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [address, setAddress] = useState('');
  const [numDays, setNumDays] = useState(7);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (websiteUrl && address) {
      onGenerate(websiteUrl, address, numDays);
    }
  };

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumDays(parseInt(e.target.value, 10));
  };

  return (
    <section className="max-w-3xl mx-auto text-center">
      <h2 className="text-4xl md:text-5xl font-bold text-text-primary leading-tight mb-4">
        Transform <span className="text-primary">5 minutes</span> into <span className="text-secondary">{numDays} days</span> of content
      </h2>
      <p className="text-lg text-text-secondary mb-8">
        Professional social media marketing powered by Gemini + Veo
      </p>

      <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white border border-border rounded-2xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 text-left">
          <div className="flex flex-col">
            <label htmlFor="websiteUrl" className="mb-2 font-semibold text-text-secondary">Business Website URL</label>
            <input
              type="url"
              id="websiteUrl"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              placeholder="https://your-business.com"
              required
              className="bg-white border border-border text-text-primary rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary transition duration-300"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address" className="mb-2 font-semibold text-text-secondary">Business Address</label>
            <input
              type="text"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="123 Main St, City, State"
              required
              className="bg-white border border-border text-text-primary rounded-lg p-3 focus:ring-2 focus:ring-primary focus:border-primary transition duration-300"
            />
          </div>
        </div>
        
        <div className="flex flex-col text-left mb-6">
            <label htmlFor="numDays" className="mb-2 font-semibold text-text-secondary">Number of Days</label>
            <div className="day-selector">
              <input 
                 type="range" id="numDays"
                 min="1" max="7" value={numDays}
                 onChange={handleDaysChange}
                 className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between items-center mt-2 text-text-secondary">
                <span className="font-bold text-lg text-primary">{numDays} days</span>
                <span className="text-sm">
                  ({numDays * 3} images &middot; {numDays} videos)
                </span>
              </div>
            </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-3 text-lg font-bold py-4 px-6 bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-lg hover:scale-105 transform transition-all duration-300 ease-in-out"
        >
          <span>Generate Content Calendar</span>
          <span role="img" aria-label="sparkles emoji">✨</span>
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-text-secondary">
        <div className="bg-card-bg p-3 rounded-lg border border-border">✅ {numDays} Posts</div>
        <div className="bg-card-bg p-3 rounded-lg border border-border">✅ {numDays * 3} AI Images</div>
        <div className="bg-card-bg p-3 rounded-lg border border-border">✅ {numDays} AI Videos</div>
        <div className="bg-card-bg p-3 rounded-lg border border-border">✅ Style-Matched</div>
      </div>
    </section>
  );
};

export default Hero;