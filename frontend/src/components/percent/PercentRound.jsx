// PercentRound.jsx

import './Percent.scss';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PercentRound = ({ value, icon, isVisible }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setProgress(value);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [value, isVisible]);

  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="percent-round">
      <svg className="percent-round-svg" viewBox="0 0 110 110">
        <circle
          className="percent-round-bg"
          cx="55"
          cy="55"
          r={radius}
          strokeWidth="10"
        />
        <circle
          className="percent-round-fg"
          cx="55"
          cy="55"
          r={radius}
          strokeWidth="10"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
        />
      </svg>
      {icon && (
        <FontAwesomeIcon
          icon={icon}
          className="percent-round-icon"
        />
      )}
    </div>
  );
};

export default PercentRound;