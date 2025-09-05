import React from 'react';

interface ArrowProps {
  className?: string;
}

const Arrow: React.FC<ArrowProps> = ({ className }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      stroke="#3c4d3d"
      strokeWidth="8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M95 5 C 60 15, 30 40, 10 75 L 5 55 M 10 75 L 35 85" />
    </svg>
  );
};

export default Arrow;