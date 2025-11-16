
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-12">
      <div className="flex items-center justify-center gap-4 mb-2">
        <span className="text-5xl" role="img" aria-label="diamond emoji">💎</span>
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Veo-licious Gems
        </h1>
      </div>
      <p className="text-lg text-text-secondary">AI Marketing Agency-in-a-Box</p>
    </header>
  );
};

export default Header;
