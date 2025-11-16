
import React from 'react';
import type { ApiResponse } from '../types';
import DayCard from './DayCard';

interface ResultsProps {
  data: ApiResponse;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const Results: React.FC<ResultsProps> = ({ data, showToast }) => {
  const numDays = data.content_calendar.length;

  return (
    <section>
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold mb-2">Your {numDays}-Day Content Calendar for {data.business_name}</h2>
        <p className="text-lg text-text-secondary">Ready to post! Download assets and copy captions.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.content_calendar.map((dayData, index) => (
          <DayCard key={index} dayData={dayData} showToast={showToast} />
        ))}
      </div>
    </section>
  );
};

export default Results;
