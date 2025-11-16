
import React, { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const ToastNotification: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      const exitTimer = setTimeout(onClose, 500); // match animation duration
      return () => clearTimeout(exitTimer);
    }, 2500);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-success' : 'bg-error';

  return (
    <div
      className={`fixed bottom-5 right-5 p-4 rounded-lg shadow-lg text-white font-semibold z-50 ${bgColor} ${isExiting ? 'animate-toastOut' : 'animate-toastIn'}`}
    >
      {message}
    </div>
  );
};

export default ToastNotification;
