import React, { useState } from 'react';
import { Paperclip, Mic, Zap, SendHorizontal, Menu } from 'lucide-react';

const ChatBox = ({ messages, setMessages, selectedArtist, onMenuClick }) => {
  const [input, setInput] = useState("");

  const artistBackgrounds = {
    "Pablo Picasso": "https://upload.wikimedia.org/wikipedia/en/7/74/PicassoGuernica.jpg",
    "Leonardo Da Vinci": "https://upload.wikimedia.org/wikipedia/commons/f/f4/The_Scream.jpg",
    "Vincent Van Gogh": "https://upload.wikimedia.org/wikipedia/commons/9/94/Starry_Night_Over_the_Rhone.jpg"
  };

  // ... (persona logic and handleSend logic remain exactly the same)
  const getPersonaResponse = (artist) => {
    const responses = {
      "Pablo Picasso": "My spirit is a paradox—gentle as this dove, yet ferocious in my regeneration of art. Like a child, I see the truth in your words. Let us create something sweet and ferocious together.",
      "Leonardo Da Vinci": "Insatiable curiosity drives me. I must observe the mechanics of your inquiry with the depth of a Renaissance mind. What mysteries do you hold?",
      "Vincent Van Gogh": "I feel your words with an intensity that burns! My sensitivity is deep, often isolated, but my fanatical energy is focused entirely on you right now."
    };
    return responses[artist] || "I am here to create.";
  };

  const handleSend = () => {
    if (!input.trim() || !selectedArtist) return;
    const userMsg = { id: Date.now(), text: input, sender: 'User', isUser: true };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setTimeout(() => {
      const botMsg = { id: Date.now() + 1, text: getPersonaResponse(selectedArtist), sender: selectedArtist, isUser: false };
      setMessages(prev => [...prev, botMsg]);
    }, 1000);
  };

  const currentBgImage = artistBackgrounds[selectedArtist];

  return (
    <div className="relative h-full w-full flex flex-col font-jaro overflow-hidden bg-black">
       
       {/* BACKGROUND ENGINE */}
       <div className="absolute inset-0 z-0">
        {currentBgImage && (
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 opacity-25"
            style={{ backgroundImage: `url("${currentBgImage}")` }}
          />
        )}
      </div>

      <div className="relative z-10 flex flex-col h-full p-4 md:p-10">
        
        {/* MOBILE MENU HEADER */}
        <div className="flex items-center mb-4 md:hidden">
          <button onClick={onMenuClick} className="text-[#CDD400] p-2 hover:bg-white/5 rounded-lg">
            <Menu size={28} />
          </button>
          <span className="ml-4 text-white/50 font-jago uppercase tracking-widest text-sm">
            {selectedArtist || "Select Artist"}
          </span>
        </div>

        {/* MESSAGES AREA */}
        <div className="flex-1 overflow-y-auto space-y-6 md:space-y-8 pr-2 md:pr-4 custom-scrollbar">
          {!selectedArtist && (
             <div className="flex h-full items-center justify-center">
                <p className="text-[#FFFEFE]/20 text-[18px] md:text-[25px] text-center px-4">Choose your Artist from the menu to begin!</p>
             </div>
          )}
          
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.isUser ? 'items-end' : 'items-start'}`}>
              <span className="text-[14px] md:text-[25px] text-[#FFFEFE]/50 mb-1 md:mb-2 px-2">{msg.sender}</span>
              
              <div className={`flex items-start gap-2 md:gap-4 ${msg.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white/20 opacity-20 flex items-center justify-center flex-shrink-0">
                   <span className="text-white text-[10px] md:text-xs">{msg.sender[0]}</span>
                </div>

                <div className={`max-w-[85%] md:max-w-md p-4 md:p-6 bg-black/70 backdrop-blur-xl border border-white/5 rounded-2xl md:rounded-3xl ${msg.isUser ? 'rounded-tr-none' : 'rounded-tl-none'}`}>
                  <p className="text-[16px] md:text-[25px] text-white leading-tight">{msg.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* INPUT BAR */}
        <div className="mt-4 md:mt-6 flex justify-center">
          <div className="flex w-full max-w-4xl items-center gap-3 md:gap-6 rounded-[2rem] md:rounded-[3rem] bg-black/80 p-3 md:p-6 backdrop-blur-2xl border border-white/10 shadow-2xl">
            <div className="hidden sm:flex items-center gap-3 md:gap-5 text-white/40">
              <Paperclip size={24} className="md:size-[28px]" />
              <div className="relative">
                <Mic size={24} className="md:size-[28px]" />
                <span className="absolute -top-1 -right-1 text-[8px] font-bold text-white opacity-50">+</span>
              </div>
              <Zap size={24} className="md:size-[28px]" />
            </div>
            
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              disabled={!selectedArtist}
              placeholder={selectedArtist ? `Ask ${selectedArtist}...` : "Select an artist..."}
              className="flex-1 bg-transparent text-[16px] md:text-[25px] text-white outline-none placeholder:text-white/20 min-w-0"
            />
            
            <button 
              onClick={handleSend} 
              disabled={!selectedArtist} 
              className="text-[#CDD400] transition-all disabled:opacity-10 p-2"
            >
              <SendHorizontal size={28} className="md:size-[32px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;