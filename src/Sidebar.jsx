import React from 'react';
import { LayoutGrid, Star, RotateCcw, MessageSquare, Trash2, X } from 'lucide-react';

const Sidebar = ({ selectedArtist, setSelectedArtist, onClearSession, chatHistory, onClearHistory, onClose }) => {
  const artists = ["Vincent Van Gogh", "Leonardo Da Vinci", "Pablo Picasso"];

  return (
    <aside className="h-screen w-full md:w-[380px] bg-[#0a0a0a] flex flex-col p-6 md:p-8 border-r border-white/5 z-20 overflow-hidden">
      
      {/* MOBILE CLOSE BUTTON & LOGO */}
      <div className="flex items-center justify-between mb-12 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 md:w-14 md:h-14 text-white">
            <svg viewBox="0 0 100 100" fill="currentColor">
              <path d="M50 15c-15 0-25 10-25 25 0 8 4 15 10 20-2 5-8 10-15 12 10 2 20-5 25-10 2 0 3 0 5 0s3 0 5 0c5 5 15 12 25 10-7-2-13-7-15-12 6-5 10-12 10-20 0-15-10-25-25-25zm-8 22c2 0 4 2 4 4s-2 4-4 4-4-2-4-4 2-4 4-4zm16 0c2 0 4 2 4 4s-2 4-4 4-4-2-4-4 2-4 4-4zM50 70c-10 0-18-5-20-10h40c-2 5-10 10-20 10z" />
            </svg>
          </div> 
          <h1 className="text-[32px] md:text-[46px] text-[#CDD400] leading-none opacity-60 font-jago font-extrabold">Artist.AI</h1>
        </div>
        
        {/* Close icon for mobile */}
        <button onClick={onClose} className="md:hidden text-white/50 hover:text-white">
          <X size={32} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {/* CHOOSE ARTIST */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6 opacity-60">
            <LayoutGrid size={22} className="text-[#FFFFFF] md:size-[26px]" />
            <h2 className="text-[20px] md:text-[26px] text-[#FFFFFF] opacity-40 font-jago font-extrabold">Choose your Artist</h2>
          </div>
          
          <div className="flex flex-wrap gap-2 md:gap-3">
            {artists.map((artist) => (
              <button
                key={artist}
                onClick={() => setSelectedArtist(artist)}
                className={`px-4 py-2 md:px-5 md:py-3 rounded-full text-[14px] md:text-[16px] transition-all cursor-pointer border border-white/10 font-jago font-extrabold
                  ${selectedArtist === artist 
                    ? 'bg-[#CDD400]/50 text-[#FFFFFF] opacity-100'
                    : 'bg-[#FFFFFF]/5 text-[#FFFFFF]/80 hover:bg-[#CDD400]/20'
                  }`}
              >
                {artist}
              </button>
            ))}
          </div>
        </section>

        {/* DOMAIN EXPERTISE */}
        <section className="mb-10">
          <h2 className="text-[20px] md:text-[26px] text-[#FFFFFF] opacity-20 uppercase mb-4 md:mb-6 font-jago font-extrabold">Domain Expertise</h2>
          <div className="bg-[#FFFFFF]/10 inline-block px-6 py-3 md:px-8 md:py-4 rounded-full text-[18px] md:text-[22px] text-[#FFFFFF]/80 border border-white/5 opacity-40 font-jago font-extrabold">
            Psychological Depth
          </div>
        </section>

        {/* SESSION CONTROL */}
        <section className="mb-10">
          <div className="flex items-center gap-3 mb-6 opacity-40">
            <Star size={22} className="text-[#FFFFFF] fill-[#FFFFFF] md:size-[26px]" />
            <h2 className="text-[20px] md:text-[26px] text-[#FFFFFF] opacity-40 uppercase font-jago font-extrabold">Session Control</h2>
          </div>

          <button 
            onClick={onClearSession}
            className="w-full bg-[#802323] hover:brightness-125 transition-all rounded-[1.5rem] md:rounded-[2rem] py-4 md:py-6 flex items-center justify-center gap-4 cursor-pointer mb-8"
          >
            <RotateCcw size={30} className="text-[#802323] opacity-40 brightness-[4] md:size-[40px]" />
            <span className="text-[20px] md:text-[26px] text-[#ff1717] font-jago font-extrabold">Clear Session</span>
          </button>
        </section>

        {/* CHAT HISTORY */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3 opacity-60">
              <MessageSquare size={22} className="text-[#FFFFFF] md:size-[26px]" />
              <h2 className="text-[20px] md:text-[26px] text-[#FFFFFF] opacity-40 font-jago font-extrabold">Chat History</h2>
            </div>
            {chatHistory.length > 0 && (
              <button onClick={onClearHistory} className="text-white/30 hover:text-[#802323] transition-colors">
                <Trash2 size={18} />
              </button>
            )}
          </div>

          <div className="space-y-3">
            {chatHistory.length === 0 ? (
              <p className="text-white/20 text-[16px] md:text-[18px] italic font-jago font-extrabold">No past history found...</p>
            ) : (
              chatHistory.map((item) => (
                <div key={item.id} className="w-full bg-white/5 border border-white/5 p-3 md:p-4 rounded-2xl flex items-center gap-4 cursor-pointer hover:bg-[#CDD400]/10 transition-all group">
                  <div className="w-2 h-2 rounded-full bg-[#CDD400]/40 group-hover:bg-[#CDD400]" />
                  <span className="text-[16px] md:text-[18px] text-white/60 group-hover:text-white truncate">{item.title}</span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    </aside>
  );
};

export default Sidebar;