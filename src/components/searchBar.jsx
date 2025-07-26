import React, { useState, useRef, useEffect } from 'react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [typedMessage, setTypedMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const intervalRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    const message = ` Searching for "${query}"...`;
    setIsTyping(true);
    setTypedMessage('');
    let i = 0;

    intervalRef.current = setInterval(() => {
      if (i >= message.length) {
        clearInterval(intervalRef.current);
        setTimeout(() => {
          const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
          window.open(url, '_blank');
          resetState();
        }, 500);
      } else {
        setTypedMessage((prev) => prev + message.charAt(i));
        i++;
      }
    }, 60);
  };

  const resetState = () => {
    setQuery('');
    setTypedMessage('');
    setIsTyping(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        clearInterval(intervalRef.current);
        resetState();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto font-mono text-green-400 relative px-4">
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-2 bg-black border border-green-500 rounded-md p-3 shadow-md"
      >
        <input
          type="text"
          value={query}
          spellCheck={false}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type your query..."
          className="bg-transparent outline-none w-full text-green-400 placeholder-green-600 focus:ring-0"
        />
        <button
          type="submit"
          className="bg-green-700 hover:bg-green-600 px-4 py-1.5 rounded text-sm font-semibold transition"
        >
          Go
        </button>
      </form>
      {isTyping && (
        <div className="mt-1 px-2 text-sm text-green-300 flex items-center gap-2">
          <span className="animate-blink">|</span>
          <span className="animate-pulse">{typedMessage}</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
