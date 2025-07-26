import React, { useEffect, useRef, useState } from 'react';

const fakeLogs = [
  "⭑ Scanning IP: 192.168.0.101 - SUCCESS",
  "⭑ Device connected: RASPBERRY_PI_4",
  "⭑ Port 22 open - SSH Service detected",
  "⭑ Injecting payload into test node...",
  "⭑ Running vulnerability scan on subnet...",
  "⭑ Tracking signal... triangulation complete",
  "⭑ Process PID: 5042 monitored",
  "⭑ Secure handshake established ✅",
  "⭑ Accessing encrypted drive...",
  "⭑ Firewall bypass module injected",
  "⭑ Sniffing packets on local adapter...",
  "⭑ CPU core 3 overclocked temporarily",
  "⭑ Hostname resolved: agent.delta.node",
  "⭑ System integrity: STABLE",
  "⭑ Signature verified: [0xFFB31A]",
  "⭑ Uploading logs to secure vault...",
];
const RadarBlip = ({ id, x, y, isRed }) => (
  <div
    key={id}
    className={`absolute w-2 h-2 rounded-full ${
      isRed ? 'bg-red-500 neon-red-blink' : 'bg-green-400 neon-green-blink'
    }`}
    style={{
      top: `${y}%`,
      left: `${x}%`,
      transform: 'translate(-50%, -50%)',
    }}
  />
);


const RadarScanner = () => {
  const [blips, setBlips] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const angle = Math.random() * 360;
      const radius = Math.random() * 45;
      const x = 50 + radius * Math.cos((angle * Math.PI) / 180);
      const y = 50 + radius * Math.sin((angle * Math.PI) / 180);
      const id = Date.now();
      const isRed = Math.random() < 0.15; // 15% chance to be red

      setBlips((prev) => [...prev, { id, x, y, isRed }]);

      setTimeout(() => {
        setBlips((prev) => prev.filter((b) => b.id !== id));
      }, 1500);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[200px] h-[200px]  rounded-full border-2 border-green-500 overflow-hidden shadow-inner shadow-green-800">
      {/* Rotating radar sweep */}
      <div className="absolute w-full h-full rounded-full animate-[spin_4s_linear_infinite] origin-center">
        <div className="w-1/2 h-full bg-gradient-to-r from-green-400/40 to-transparent origin-left" />
      </div>

      {/* Blips */}
      {blips.map((blip) => (
        <RadarBlip key={blip.id} {...blip} />
      ))}

      {/* Concentric Circles */}
      {[25, 50, 75].map((percent, i) => (
        <div
          key={i}
          className="absolute border border-green-600 rounded-full"
          style={{
            top: `${50 - percent / 2}%`,
            left: `${50 - percent / 2}%`,
            width: `${percent}%`,
            height: `${percent}%`,
          }}
        />
      ))}

      {/* Center Dot */}
      <div className="absolute w-2 h-2 bg-green-400 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
};

const SystemLogs = () => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const systemRef = useRef(null);

  useEffect(() => {
    if (lineIndex < fakeLogs.length) {
      const line = fakeLogs[lineIndex];
      if (charIndex < line.length) {
        const timeout = setTimeout(() => {
          setCurrentLine((prev) => prev + line[charIndex]);
          setCharIndex((prev) => prev + 1);
        }, 40);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setDisplayedLines((prev) => [...prev, currentLine]);
          setCurrentLine('');
          setLineIndex((prev) => prev + 1);
          setCharIndex(0);
        }, 300);
        return () => clearTimeout(timeout);
      }
    } else {
      // Restart log loop
      const loopTimeout = setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLine('');
        setLineIndex(0);
        setCharIndex(0);
      }, 2000);
      return () => clearTimeout(loopTimeout);
    }
  }, [charIndex, lineIndex, currentLine]);

  useEffect(() => {
    if (systemRef.current) {
      systemRef.current.scrollTop = systemRef.current.scrollHeight;
    }
  }, [displayedLines, currentLine]);

  return (
    <div
      ref={systemRef}
      className=" text-green-400 font-mono text-sm p-4 rounded-lg h-50 w-[22rem] overflow-y-auto "
    >
      {displayedLines.map((line, i) => (
        <div key={i}>~ {line}</div>
      ))}
      {lineIndex < fakeLogs.length && (
        <div>
          ~ {currentLine}
          <span className="animate-pulse">_</span>
        </div>
      )}
    </div>
  );
};

const SystemRadarScanner = () => {
  return (
    <div className="relative flex items-center gap-6 border-1 border-green-900 rounded-xl p-5 w-fit shadow-lg overflow-hidden">
      {/* Background Image */}
      <div className="absolute h-80 w-150 top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-0 p-6">
        <img src="/worldMap.png" alt="Background" className="w-full h-full opacity-20" />
      </div>

      {/* Foreground content */}
      <div className="relative z-1 flex items-center gap-6">
        <RadarScanner />
        <SystemLogs />
      </div>
    </div>

  );
};

export default SystemRadarScanner;
