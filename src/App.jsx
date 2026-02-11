import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatBot from './ChatBot';

function App() {
  const [messages, setMessages] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  // NEW: State for mobile menu
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const clearSession = () => { setMessages([]); };
  const clearHistory = () => { setChatHistory([]); };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-black relative">
      {/* Sidebar with mobile drawer logic */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 md:w-[380px]
        w-[88vw] max-w-[380px]
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        ${isSidebarOpen ? 'pointer-events-auto' : 'pointer-events-none md:pointer-events-auto'}
      `}>
        <Sidebar 
          selectedArtist={selectedArtist} 
          setSelectedArtist={(artist) => {
            setSelectedArtist(artist);
            setIsSidebarOpen(false); // Close menu on mobile after selection
          }} 
          onClearSession={clearSession}
          chatHistory={chatHistory}
          onClearHistory={clearHistory}
          onClose={() => setIsSidebarOpen(false)} // Close button for mobile
        />
      </div>

      {/* Main Chat Area */}
      <main className="flex-1 h-full relative">
        <ChatBot
          messages={messages} 
          setMessages={setMessages} 
          selectedArtist={selectedArtist}
          onMenuClick={() => setIsSidebarOpen(true)} // Open menu button
        />
      </main>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default App;
