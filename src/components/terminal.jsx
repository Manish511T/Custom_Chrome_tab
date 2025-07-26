import React, { useEffect, useRef, useState } from 'react';

const cppCodeLines = [
  '#include <iostream>',
  '#include <vector>',
  '#include <algorithm>',
  '#include <random>',
  '#include <chrono>',
  '',
  'using namespace std;',
  '',
  'class HackerSort {',
  'private:',
  '    vector<int> data;',
  '',
  '    void glitchEffect() {',
  '        cout << "[!] Glitching Matrix..." << endl;',
  '    }',
  '',
  'public:',
  '    HackerSort(int size) {',
  '        generateData(size);',
  '    }',
  '',
  '    void generateData(int size) {',
  '        data.clear();',
  '        random_device rd;',
  '        mt19937 gen(rd());',
  '        uniform_int_distribution<> dist(1, 100);',
  '',
  '        for (int i = 0; i < size; ++i) {',
  '            data.push_back(dist(gen));',
  '        }',
  '        glitchEffect();',
  '    }',
  '',
  '    void printData(const string& label) {',
  '        cout << "[*] " << label << ": ";',
  '        for (auto n : data) cout << n << " ";',
  '        cout << endl;',
  '    }',
  '',
  '    void quickHackSort() {',
  '        cout << "[#] Initiating QuickHackSort..." << endl;',
  '        sort(data.begin(), data.end(), [](int a, int b) {',
  '            return a < b;',
  '        });',
  '    }',
  '',
  '    void injectBackdoor() {',
  '        cout << "[~] Injecting stealth backdoor at index 0..." << endl;',
  '        data[0] = -1337;',
  '    }',
  '};',
  '',
  'int main() {',
  '    cout << ">> Accessing core memory stream..." << endl;',
  '',
  '    HackerSort hSort(10);',
  '    hSort.printData("Unsorted");',
  '',
  '    hSort.quickHackSort();',
  '    hSort.injectBackdoor();',
  '',
  '    hSort.printData("Sorted + Exploit");',
  '',
  '    cout << ">> Transmission Complete. Disconnecting..." << endl;',
  '    return 0;',
  '}'
];

const Terminal = () => {
  const [displayedLines, setDisplayedLines] = useState([]);
  const [currentLine, setCurrentLine] = useState('');
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (lineIndex < cppCodeLines.length) {
      const line = cppCodeLines[lineIndex];
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
      // Loop reset logic
      const loopTimeout = setTimeout(() => {
        setDisplayedLines([]);     
        setCurrentLine('');
        setLineIndex(0);
        setCharIndex(0);
      }, 2000); // Pause before restart
      return () => clearTimeout(loopTimeout);
    }
  }, [charIndex, lineIndex, currentLine]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [displayedLines, currentLine]);

  return (
    <div
      ref={terminalRef}
      className="bg-black/30 text-green-400 font-mono text-sm p-4 rounded-lg h-50 w-[22rem] overflow-y-auto  border-1 border-green-900"
    >
      {displayedLines.map((line, i) => (
        <div key={i}>~ {line}</div>
      ))}
      {lineIndex < cppCodeLines.length && (
        <div>
          ~ {currentLine}
          <span className="animate-pulse">_</span>
        </div>
      )}
    </div>
  );
};

export default Terminal;
