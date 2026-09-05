import { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-blue-600';

  return (
    <div className={`fixed bottom-8 right-8 z-50 ${bgColor} text-white px-6 py-3 rounded-lg shadow-2xl animate-fadeInUp flex items-center gap-3`}>
      <span>{message}</span>
      <button onClick={onClose} className="text-white/70 hover:text-white">✕</button>
    </div>
  );
};

export default Toast;