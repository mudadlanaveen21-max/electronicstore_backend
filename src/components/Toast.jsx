import { useEffect } from "react";
import { CheckCircle, AlertCircle, Info, X } from "lucide-react";

export default function Toast({ message, type = "success", onClose, duration = 3000 }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  if (!message) return null;

  const iconMap = {
    success: <CheckCircle className="toast-icon success" size={20} />,
    error: <AlertCircle className="toast-icon error" size={20} />,
    info: <Info className="toast-icon info" size={20} />
  };

  return (
    <div className={`toast-notification toast-${type}`}>
      {iconMap[type] || iconMap.info}
      <span className="toast-text">{message}</span>
      <button className="toast-close" onClick={onClose} aria-label="Close notification">
        <X size={16} />
      </button>
    </div>
  );
}
