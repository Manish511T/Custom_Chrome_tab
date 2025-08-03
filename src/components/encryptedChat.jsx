import React, { useEffect, useRef, useState } from 'react';

const characters = '01⛓️⚡#@%&$¥ 127895@#4&^[}](0/;:';
const getRandomChar = () => characters[Math.floor(Math.random() * characters.length)];

const MatrixRain = ({ columns = 40, rows = 25 }) => {
  const [matrix, setMatrix] = useState([]);

  useEffect(() => {
    const initialMatrix = Array.from({ length: columns }, () =>
      Array.from({ length: rows }, () => '')
    );
    setMatrix(initialMatrix);
  }, [columns, rows]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMatrix(prevMatrix =>
        prevMatrix.map(col => {
          const newCol = [...col.slice(1), getRandomChar()];
          return newCol;
        })
      );
    }, 75); // Adjust for speed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute h-30 w-20  bg-transparent text-green-400/40 font-mono text-[14px] leading-tight z-0 pointer-events-none">
      <div className="flex justify-center items-center h-full gap-[2px]">
        {matrix.map((col, colIndex) => (
          <div key={colIndex} className="flex flex-col">
            {col.map((char, rowIndex) => (
              <span
                key={rowIndex}
                className={`transition-opacity duration-200 ${
                  rowIndex === col.length - 1 ? 'text-green-300 font-bold' : 'opacity-60'
                }`}
              >
                {char}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MatrixRain;
