import { useState } from 'react';
import { personalInfo } from '@/config';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, Mail, BookOpen, Phone, X } from 'lucide-react';

export function ContactSidebar() {
  const { language } = useLanguage();
  const [showQR, setShowQR] = useState(false);

  return (
    <>
      {/* Fixed sidebar */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-1">
        {/* WeChat */}
        <button onClick={() => setShowQR(true)} className="group relative flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 bg-[#0a1628]/80 backdrop-blur-md border border-blue-400/20 rounded-l-xl hover:bg-green-600 hover:border-green-500 transition-all duration-300" title="WeChat">
          <MessageCircle className="w-4 h-4 lg:w-5 lg:h-5 text-blue-300 group-hover:text-white transition-colors" />
          <span className="absolute right-full mr-2 px-2 py-1 bg-[#0a1628] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-blue-400/20">WeChat</span>
        </button>
        {/* Gmail */}
        <a href={`mailto:${personalInfo.primaryEmail}`} className="group relative flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 bg-[#0a1628]/80 backdrop-blur-md border border-blue-400/20 rounded-l-xl hover:bg-red-500 hover:border-red-400 transition-all duration-300" title="Email">
          <Mail className="w-4 h-4 lg:w-5 lg:h-5 text-blue-300 group-hover:text-white transition-colors" />
          <span className="absolute right-full mr-2 px-2 py-1 bg-[#0a1628] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-blue-400/20">Email</span>
        </a>
        {/* ResearchGate */}
        <a href={personalInfo.researchGate} target="_blank" rel="noopener noreferrer" className="group relative flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 bg-[#0a1628]/80 backdrop-blur-md border border-blue-400/20 rounded-l-xl hover:bg-emerald-600 hover:border-emerald-500 transition-all duration-300" title="ResearchGate">
          <BookOpen className="w-4 h-4 lg:w-5 lg:h-5 text-blue-300 group-hover:text-white transition-colors" />
          <span className="absolute right-full mr-2 px-2 py-1 bg-[#0a1628] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-blue-400/20">ResearchGate</span>
        </a>
        {/* Phone */}
        <a href={`tel:${personalInfo.phone}`} className="group relative flex items-center justify-center w-10 h-10 lg:w-11 lg:h-11 bg-[#0a1628]/80 backdrop-blur-md border border-blue-400/20 rounded-l-xl hover:bg-blue-600 hover:border-blue-500 transition-all duration-300" title="Phone">
          <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-blue-300 group-hover:text-white transition-colors" />
          <span className="absolute right-full mr-2 px-2 py-1 bg-[#0a1628] text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-blue-400/20">{personalInfo.phone}</span>
        </a>
      </div>

      {/* WeChat QR Modal */}
      {showQR && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={() => setShowQR(false)}>
          <div className="absolute inset-0 bg-[#0a1628]/80 backdrop-blur-xl" />
          <div className="relative z-10 bg-white rounded-3xl p-6 sm:p-8 shadow-2xl max-w-sm w-full text-center" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowQR(false)} className="absolute top-3 right-3 w-8 h-8 bg-black/10 hover:bg-black/20 rounded-full flex items-center justify-center transition-all">
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-bold text-exvia-black mb-1">{language === 'zh' ? '添加微信好友' : 'Add on WeChat'}</h3>
            <p className="text-sm text-exvia-black/50 mb-4">{personalInfo.wechat}</p>
            <div className="w-48 h-48 mx-auto rounded-2xl overflow-hidden border-2 border-blue-100 bg-gray-50 flex items-center justify-center">
              <img src="/images/wechat-qr.png" alt="WeChat QR" className="w-full h-full object-contain p-2" />
            </div>
            <p className="text-xs text-exvia-black/40 mt-4">{language === 'zh' ? '扫描二维码添加好友' : 'Scan QR code to add friend'}</p>
          </div>
        </div>
      )}
    </>
  );
}
