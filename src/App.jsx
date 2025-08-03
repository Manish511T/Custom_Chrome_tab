import React, { useState } from 'react';
import Header from './components/header';
import Terminal from './components/terminal';
import TodoList from './components/todoList';
import SearchBar from './components/searchBar';
import SystemScanner from './components/systemScanner';
import UserProfile from './components/userProfile';
import ShortcutDashboard from './components/shortcutDashboard';
import WelcomeMsg from './components/welcomeMsg';
import EncryptedChat from './components/encryptedChat';
const App = () => {
  const [showForm, setShowForm] = useState(false); // <-- new state

  return (
    <div className="relative w-screen h-screen bg-[#16161d] text-green-400 overflow-hidden ">
      {/* Optional: Dimmed background when form active */}
      {showForm && (
        <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 pointer-events-none transition-all duration-300" />
      )}

      {/* Header - Fixed on top */}
      <div className={`absolute top-0 left-0 right-0 z-10 shadow-md transition-opacity ${showForm ? 'opacity-30 pointer-events-none' : ''}`}>
        <Header />
      </div>

      {/* Main Content Area - Terminal and TodoList */}
      <div className={`absolute w-full top-[25%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-between items-center px-10 z-10 transition-opacity ${showForm ? 'opacity-30 pointer-events-none' : ''}`}>
        <div className="bg-black/30 flex flex-col overflow-auto rounded-xl p-2 z-20">
          <i className="ri-terminal-line text-2xl"></i>
          <Terminal />
        </div>
        <div className="overflow-auto rounded-xl p-2">
          <TodoList />
        </div>
      </div>

      {/* Greeting Message */}
      <div className={`absolute top-[18%] left-0 right-0 z-2 flex justify-center items-center h-16 transition-opacity ${showForm ? 'opacity-30 pointer-events-none' : ''}`}>
        <WelcomeMsg />
      </div>

      <div className="relative h-screen w-screen overflow-hidden gap-5 flex flex-col items-center justify-center">
        <div className={`absolute top-[35%] left-1/2 transform -translate-x-1/2 w-full max-w-xl px-4  z-50 transition-opacity ${showForm ? 'opacity-0 pointer-events-none' : ''}`}>
          <SearchBar />
        </div>

        <ShortcutDashboard showForm={showForm} setShowForm={setShowForm} />
      </div>

      {/* Scanner and Profile */}
      <div className={`absolute bottom-0 left-5 right-0 px-6 py-4 flex justify-between items-center transition-opacity ${showForm ? 'opacity-30 pointer-events-none' : ''}`}>
        <SystemScanner />
      </div>
      <div className={`absolute bottom-0 right-7 p-6 transition-opacity z-20 ${showForm ? 'opacity-30 pointer-events-none' : ''}`}>
        <UserProfile />
      </div>
      <div className='absolute top-[60%] left-[50%] w-full h-full overflow-hidden bg-transparent text-green-400/40 font-mono text-[14px] leading-tight z-0 pointer-events-none'>
        <EncryptedChat />
      </div>


    </div>
  );
};

export default App;
