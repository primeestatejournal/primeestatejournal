import React, { useState } from 'react';
import { X, Sparkles, Send, ShieldCheck, HelpCircle, ArrowRight, Bot, User, RefreshCw } from 'lucide-react';

interface AIConsultantDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AIConsultantDrawer: React.FC<AIConsultantDrawerProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; source?: string }>>([
    {
      sender: 'ai',
      text: `Hello! I am your PrimeEstateJournal AI Legal & Due Diligence Advisor. 

I can assist you with:
• **Land Titles & Documents**: C of O, Governor's Consent, Gazette, Excision, Deed of Assignment.
• **Diaspora Buying Protocols**: Escrow safety, Power of Attorney, Remote survey charting.
• **High-Growth Locations**: Lekki, Ikoyi, Epe, Ibeju-Lekki, Maitama, Guzape, Port Harcourt.

What real estate or legal due diligence question can I answer for you today?`,
    }
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || loading) return;

    setMessages((prev) => [...prev, { sender: 'user', text: textToSend }]);
    if (!queryText) setInputQuery('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/consultant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: textToSend }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { sender: 'ai', text: data.response, source: data.source }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `When evaluating Nigerian real estate, PrimeEstateJournal enforces 3 mandatory legal checks:
1. **Lands Registry Search**: Confirming ownership title at Ikeja Alausa or AGIS Abuja.
2. **Surveyor General Charting**: Verifying exact boundary coordinates to ensure no government acquisition overlap.
3. **Escrow Disbursement**: Holding funds safely until survey charting and deed execution are complete.`,
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    "What is the difference between C of O and Governor's Consent?",
    "How do I safely buy land in Epe from London without fraud?",
    "Is Ibeju-Lekki land safe from government acquisition?",
    "What are the mandatory legal and survey fees in Lagos?"
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#0B1F3A]/80 backdrop-blur-sm flex justify-end">
      <div className="bg-white w-full max-w-lg h-full flex flex-col shadow-2xl border-l border-slate-200">
        
        {/* Header */}
        <div className="bg-[#0B1F3A] text-white p-5 flex items-center justify-between border-b border-[#1E3A5F]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#155EEF] to-[#0B1F3A] border border-[#D4A72C] flex items-center justify-center text-[#D4A72C]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold font-sans">AI Legal Due Diligence Advisor</h2>
              <p className="text-[10px] text-blue-200">Powered by PrimeEstateJournal Knowledge & Gemini AI</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50 text-xs">
          
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-[#0B1F3A] text-[#D4A72C] flex items-center justify-center shrink-0 mt-0.5">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed space-y-2 ${
                  msg.sender === 'user'
                    ? 'bg-[#155EEF] text-white rounded-tr-none font-medium'
                    : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>
                {msg.source && (
                  <p className="text-[9px] text-slate-400 border-t border-slate-100 pt-1">
                    Source: {msg.source}
                  </p>
                )}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center shrink-0 mt-0.5">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-2 text-slate-500 text-xs italic bg-white p-3 rounded-xl border border-slate-200 w-fit">
              <RefreshCw className="w-4 h-4 animate-spin text-[#155EEF]" />
              <span>Analyzing Nigerian real estate laws & land registry data...</span>
            </div>
          )}

        </div>

        {/* Sample Prompt Chips */}
        <div className="p-3 bg-white border-t border-slate-200">
          <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Suggested Legal Questions</p>
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium px-3 py-1.5 rounded-full whitespace-nowrap transition-all border border-slate-200 shrink-0"
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Query Input Box */}
        <div className="p-4 bg-white border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask about land titles, due diligence, or escrow..."
              className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-[#155EEF]"
            />
            <button
              type="submit"
              disabled={loading || !inputQuery.trim()}
              className="bg-[#155EEF] hover:bg-blue-600 disabled:opacity-50 text-white p-2.5 rounded-xl transition-all shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
