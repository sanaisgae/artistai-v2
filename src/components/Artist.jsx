import React, { useState } from "react";
import {
  LayoutGrid,
  Star,
  RotateCcw,
  MessageSquare,
  Trash2,
  X,
  Paperclip,
  Mic,
  Zap,
  SendHorizontal,
  Menu,
} from "lucide-react";

const ArtistApp = () => {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [messages, setMessages] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [input, setInput] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const artists = [
    "Vincent Van Gogh",
    "Leonardo Da Vinci",
    "Pablo Picasso",
  ];

  const artistBackgrounds = {
    "Pablo Picasso":
      "https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg",
    "Leonardo Da Vinci":
      "https://upload.wikimedia.org/wikipedia/commons/f/f4/The_Scream.jpg",
    "Vincent Van Gogh":
      "https://upload.wikimedia.org/wikipedia/commons/9/94/Starry_Night_Over_the_Rhone.jpg",
  };

  const getPersonaResponse = (artist) => {
    const responses = {
      "Pablo Picasso":
        "My spirit is a paradox—gentle as this dove, yet ferocious in my regeneration of art.",
      "Leonardo Da Vinci":
        "Insatiable curiosity drives me. What mysteries do you hold?",
      "Vincent Van Gogh":
        "I feel your words with an intensity that burns!",
    };
    return responses[artist] || "I am here to create.";
  };

  const handleSend = () => {
    if (!input.trim() || !selectedArtist) return;

    const userMsg = {
      id: Date.now(),
      text: input,
      sender: "User",
      isUser: true,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");

    setTimeout(() => {
      const botMsg = {
        id: Date.now() + 1,
        text: getPersonaResponse(selectedArtist),
        sender: selectedArtist,
        isUser: false,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 1000);
  };

  const clearSession = () => {
    setMessages([]);
  };

  const clearHistory = () => {
    setChatHistory([]);
  };

  const currentBgImage = artistBackgrounds[selectedArtist];

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* SIDEBAR */}
      <aside
        className={`fixed md:relative z-30 h-full w-[300px] bg-[#0a0a0a] p-6 border-r border-white/5 transition-transform duration-300 
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-[#CDD400]">Artist.AI</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden"
          >
            <X size={28} />
          </button>
        </div>

        {/* Choose Artist */}
        <div className="mb-8">
          <h2 className="mb-4 opacity-50">Choose Artist</h2>
          <div className="flex flex-wrap gap-2">
            {artists.map((artist) => (
              <button
                key={artist}
                onClick={() => {
                  setSelectedArtist(artist);
                  setSidebarOpen(false);
                }}
                className={`px-4 py-2 rounded-full border text-sm
                ${
                  selectedArtist === artist
                    ? "bg-[#CDD400] text-black"
                    : "bg-white/5"
                }`}
              >
                {artist}
              </button>
            ))}
          </div>
        </div>

        {/* Session Controls */}
        <button
          onClick={clearSession}
          className="w-full bg-red-800 py-3 rounded-xl mb-4"
        >
          Clear Session
        </button>

        {chatHistory.length > 0 && (
          <button
            onClick={clearHistory}
            className="w-full bg-gray-700 py-3 rounded-xl"
          >
            Clear History
          </button>
        )}
      </aside>

      {/* MAIN CHAT AREA */}
      <div className="flex-1 relative flex flex-col">
        {/* Background */}
        {currentBgImage && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: `url(${currentBgImage})` }}
          />
        )}

        {/* Header */}
        <div className="p-4 flex items-center gap-4 md:hidden z-10">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu size={28} />
          </button>
          <span>{selectedArtist || "Select Artist"}</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 z-10">
          {!selectedArtist && (
            <div className="flex items-center justify-center h-full opacity-30">
              Choose your Artist to begin!
            </div>
          )}

          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div className="bg-black/70 p-4 rounded-2xl max-w-md">
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 z-10">
          <div className="flex items-center gap-3 bg-black/80 p-3 rounded-2xl border border-white/10">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              disabled={!selectedArtist}
              placeholder={
                selectedArtist
                  ? `Ask ${selectedArtist}...`
                  : "Select an artist..."
              }
              className="flex-1 bg-transparent outline-none"
            />
            <button
              onClick={handleSend}
              disabled={!selectedArtist}
              className="text-[#CDD400]"
            >
              <SendHorizontal size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistApp;
