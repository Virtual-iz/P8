// PercentLine.jsx

import './Percent.scss';
import { useEffect, useState } from 'react';

const PercentLine = ({ value, isVisible }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setProgress(value);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [value, isVisible]);

  return (
    <div className="percent-line-bar">
      <div
        className="percent-line-fill"
        style={{ width: `${progress}%`, transition: 'width 1s ease-in-out' }}
      />
    </div>
  );
};

export default PercentLine;