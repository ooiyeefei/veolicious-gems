import React from 'react';
import type { ContentCalendarDay } from '../types';
import { ClipboardIcon, DownloadIcon, ShareIcon } from './icons/Icons';

interface DayCardProps {
  dayData: ContentCalendarDay;
  showToast: (message: string, type?: 'success' | 'error') => void;
}

const DayCard: React.FC<DayCardProps> = ({ dayData, showToast }) => {
  const handleCopyCaption = () => {
    navigator.clipboard.writeText(dayData.caption)
      .then(() => showToast('Caption copied! 📋'))
      .catch(() => showToast('Failed to copy caption.', 'error'));
  };
  
  // Note: True asset zipping requires a library like JSZip and can be complex
  // due to CORS. This is a simplified version.
  const handleDownloadAssets = () => {
     showToast('Downloading assets... Please allow pop-ups.');
     [...dayData.images, dayData.video_url].forEach(url => {
         window.open(url, '_blank');
     });
  };
  
  const handleShare = () => {
      showToast('Sharing functionality is not yet implemented.', 'error');
  };

  const getDayOfWeek = (dateString: string) => {
      const date = new Date(dateString + 'T00:00:00'); // Assume local timezone
      return date.toLocaleDateString('en-US', { weekday: 'long' });
  }

  return (
    <div className="bg-card-bg border border-border rounded-2xl shadow-md p-6 flex flex-col gap-6 transition-all duration-300 hover:border-primary hover:shadow-lg hover:-translate-y-1">
      <div className="flex justify-between items-center">
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Day {dayData.day}</span>
        <span className="text-sm text-text-secondary">{getDayOfWeek(dayData.date)}, {new Date(dayData.date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
      </div>

      <div className="bg-white p-4 rounded-lg border border-border">
        <p className="text-text-primary whitespace-pre-wrap text-sm leading-relaxed max-h-40 overflow-y-auto">
          {dayData.caption}
        </p>
        <button onClick={handleCopyCaption} className="mt-3 w-full flex items-center justify-center gap-2 text-sm text-primary font-semibold hover:text-primary-hover transition-colors">
          <ClipboardIcon /> Copy Caption
        </button>
      </div>

      <div>
        <div className="grid grid-cols-3 gap-2 mb-4">
          {dayData.images.map((img, index) => (
            <img key={index} src={img} alt={`Generated image ${index + 1}`} className="aspect-square w-full object-cover rounded-md transition-transform duration-300 hover:scale-105" />
          ))}
        </div>
        <div className="relative">
          <video controls poster={dayData.images[0]} className="w-full rounded-lg border border-border">
            <source src={dayData.video_url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <span className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-full">{dayData.video_duration}s</span>
        </div>
      </div>

      <div className="flex gap-4 mt-auto">
        <button onClick={handleDownloadAssets} className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-primary hover:bg-primary-hover text-white font-semibold rounded-lg transition-colors">
            <DownloadIcon /> Download All
        </button>
        <button onClick={handleShare} className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-slate-100 hover:bg-slate-200 text-text-primary font-semibold rounded-lg transition-colors border border-border">
           <ShareIcon /> Share
        </button>
      </div>
    </div>
  );
};

export default DayCard;