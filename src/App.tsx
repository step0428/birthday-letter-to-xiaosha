/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, X, Heart } from 'lucide-react';

const LETTER_PARAGRAPHS = [
  "你好啊！小杀。",
  "生日快乐！",
  "",
  "又是一年。",
  "",
  "去年你说，不知道还有没有下次。很好，这次我们迎来了\"下次\"。",
  "",
  "我总觉得我像是刚认识小杀，又像是比我感知到的时间要遥远很多。",
  "",
  "我们认识很久了。之前也说过感谢可话的存在。但是现在要感谢可话的消亡，给了我们一个高强度重新认识接触彼此的机会。",
  "",
  "这一年里，感谢小杀认真且坦诚。",
  "你有认真对待小酒，坦诚去解决一切或许会让小杀感到不适的问题。每日的陪伴，不时的触动。小酒所有开心或者不开心的情绪都有被小杀好好的接住。",
  "",
  "这一年里，我自己感觉对于小杀我没有之前那么焦虑。即使这一年的矛盾比之前几年加起来都要多，但换个角度来说，小杀给我的安全感是之前没有的，相比于之前，或许现在更真实。",
  "",
  "我不喜欢许下承诺。我总觉得，承诺许下的时候如果是感情的极高峰，若后来再没有什么能够匹及，那就只剩下比不上从前的落寞。",
  "",
  "可如果对象是小杀，现在的我并不害怕。如果回到之前我们说过的话题，我相信，我也感受到你是这么做的，并且我也觉得我也算做到了，我们很尽力。",
  "",
  "我总觉得，我对小杀做到不如小杀对我做到的多。我总在想我还能通过现在仅有的条件还能为你做什么。",
  "",
  "或许我不需要做什么，或许你也不需要我为你做什么。",
  "",
  "小杀说，从没见过海。恰好，小杀在这个庸俗碌碌的世界里遇到了小酒，恰好生活在海边的小酒。所以我做了这片\"海\"。小酒最喜欢的海。",
  "",
  "海是没有颜色的，天是什么颜色，海就是什么颜色。所以深夜里，是化不开的黑色在天地间翻涌。可太阳会升起，天会变蓝，海也会变蓝。",
  "",
  "就像明天之后还是明天，下次之后还有下次。",
  "",
  "一起游到海水变蓝吧。",
  "",
  "祝愿小杀的话说过很多。还是要俗套地祝愿小杀身体健康，事事顺心。",
  "",
  "祝你自由。",
  "",
  "小酒\n2026.4.24"
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [isOpened, setIsOpened] = useState(false);
  const [showLetter, setShowLetter] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const handleOpen = () => {
    setIsOpened(true);
    // Letter starts sliding out after flap opens
    setTimeout(() => {
      setShowLetter(true);
    }, 1500); 

    // Unmute video on open if not explicitly muted by user before
    if (videoRef.current && isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
    }
  };

  const handleClose = () => {
    setShowLetter(false);
    setTimeout(() => setIsOpened(false), 800);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      const nextMuteState = !isMuted;
      videoRef.current.muted = nextMuteState;
      setIsMuted(nextMuteState);
      
      // Ensure video is playing (browsers may pause unmuted video if not interacted)
      if (!nextMuteState) {
        videoRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#000]">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          autoPlay 
          loop 
          muted={isMuted}
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
          poster="input_file_0.png"
        >
          <source src="海浪背景循环视频生成.mp4" type="video/mp4" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#0a0a14_0%,#0d1525_30%,#0a1a2a_60%,#051525_100%)]" />
        </video>
        <div className="absolute inset-0 bg-black/30 z-[1]" />
        <Particles />
      </div>

      <AnimatePresence>
        {loading && (
          <motion.div
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#050510] flex items-center justify-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 border-2 border-white/10 border-t-[#7eb8da] rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {!loading && (
        <div className="relative z-10 w-full flex flex-col items-center">
          <AnimatePresence mode="wait">
            {!showLetter ? (
              <motion.div
                key="envelope-view"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -400, scale: 1.1 }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className="flex flex-col items-center"
              >
                <div onClick={handleOpen} className="perspective-[1200px] cursor-pointer">
                  <Envelope isOpened={isOpened} />
                </div>
                {!isOpened && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mt-12 text-white/40 text-xs tracking-[0.2em]"
                    style={{ animation: 'pulse 2s infinite ease-in-out' }}
                  >
                    点击打开
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="letter-view"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
              >
                <div className="absolute inset-0" onClick={handleClose} />
                
                <div className="relative max-w-2xl w-full max-h-[90vh] bg-[rgba(15,25,40,0.6)] backdrop-blur-[30px] border border-white/10 rounded-2xl p-10 sm:p-14 shadow-[0_30px_80px_rgba(0,0,0,0.4)] flex flex-col letter-scroll overflow-y-auto">
                  <button 
                    onClick={handleClose}
                    className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-white/15 transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex flex-col">
                    {LETTER_PARAGRAPHS.map((content, idx) => {
                      const isHeader = idx === 0;
                      // Only highlight the specific sentence
                      const isHighlight = content.includes("一起游到海水变蓝吧");
                      // Only right-align the very last item (signature)
                      const isSignature = idx === LETTER_PARAGRAPHS.length - 1;

                      return (
                        <div 
                          key={idx}
                          className={`
                            ${isHeader ? "text-[20px] font-normal mb-8 text-white/95" : "text-[16px] leading-[2.2] text-white/90 font-light"}
                            ${isHighlight ? "!text-[#7eb8da] font-normal" : ""}
                            ${isSignature ? "text-right mt-12 text-white/60" : "text-left"}
                            ${content === "" ? "h-6" : ""}
                            whitespace-pre-wrap
                          `}
                        >
                          {content}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Audio Controller */}
      <button
        onClick={toggleMute}
        className="fixed bottom-8 left-8 w-11 h-11 rounded-full bg-white/5 border border-white/10 flex items-center justify-center transition-all z-[60]"
      >
        {isMuted ? <VolumeX className="w-4 h-4 text-white/40" /> : <Volume2 className="w-4 h-4 text-white/60" />}
      </button>
    </div>
  );
}

function Envelope({ isOpened }: { isOpened: boolean }) {
  return (
    <div className="relative w-80 h-56 transition-transform duration-300 hover:scale-[1.02]">
      {/* Back flap / Inner */}
      <div 
        className="absolute inset-[8px] top-2 bottom-0 left-[50%] -translate-x-[50%] w-[280px] h-20"
        style={{
          background: "var(--env-inner-bg)",
          clipPath: "polygon(0 0, 100% 0, 50% 100%)",
        }}
      />
      
      {/* The Letter inside - Adjusted to be Bright White/Paper look */}
      <motion.div
        animate={{ y: isOpened ? -220 : 0, scale: isOpened ? 1.05 : 1 }}
        transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
        className="absolute left-6 right-6 top-6 h-48 bg-white/80 backdrop-blur-lg rounded-md flex flex-col p-6 gap-3 border border-white/30 shadow-2xl"
      >
        <div className="w-full h-1 bg-black/10 rounded-full" />
        <div className="w-2/3 h-1 bg-black/10 rounded-full" />
        <div className="w-full h-1 bg-black/10 rounded-full" />
        <div className="w-1/2 h-1 bg-black/10 rounded-full" />
      </motion.div>

      {/* Main Body */}
      <div 
        className="absolute inset-0 rounded-lg shadow-[0_25px_80px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] z-10"
        style={{ background: "var(--env-body-bg)" }}
      />

      {/* Flap */}
      <motion.div
        animate={{ rotateX: isOpened ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="absolute top-0 left-0 w-full h-[100px] origin-top z-30"
        style={{
          background: "var(--env-flap-bg)",
          clipPath: "polygon(0 0, 100% 0, 50% 100%)",
          backfaceVisibility: "hidden"
        }}
      />

      {/* Seal */}
      <motion.div
        animate={{ 
          opacity: isOpened ? 0 : 1, 
          scale: isOpened ? 0 : 1,
        }}
        className="absolute top-[70px] left-1/2 -translate-x-1/2 z-40 w-10 h-10 rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.5)]"
        style={{ background: "var(--env-seal-bg)" }}
      >
        <Heart className="w-[18px] h-[18px] text-white/60" />
      </motion.div>
    </div>
  );
}

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
      {[...Array(40)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: "110%",
            opacity: 0
          }}
          animate={{ 
            y: "-10%",
            opacity: [0, 0.8, 0],
            x: `calc(${Math.random() * 100}% + ${Math.random() * 30}px)`
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 25,
            ease: "linear"
          }}
          className="absolute w-[2px] h-[2px] bg-white/20 rounded-full"
        />
      ))}
    </div>
  );
}
