'use client';

import { useEffect, useState, useRef } from 'react';
import Confetti from 'react-confetti';

export default function BirthdayPage() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [isMuted, setIsMuted] = useState(true); // Start muted
  const [hasStarted, setHasStarted] = useState(false); // User has interacted
  const audioRef = useRef<HTMLAudioElement>(null);

  // Handle window size for Confetti
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Attempt to play audio muted on mount
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.muted = true;
      audio.loop = true;
      audio.play().catch(() => {}); // Suppress autoplay error silently
    }
  }, []);

  const toggleMute = () => {
    setIsMuted(prev => {
      const next = !prev;
      if (audioRef.current) {
        audioRef.current.muted = next;
        if (!hasStarted && !next) {
          audioRef.current.play().catch(() => {});
          setHasStarted(true);
        }
      }
      return next;
    });
  };

  return (
    <div
      className="relative w-full min-h-screen flex flex-col justify-between items-center text-center overflow-hidden bg-gradient-to-tr from-pink-100 via-yellow-50 to-blue-100"
      style={{
        backgroundImage: "url('/birthday-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundColor: '#ffdce0', // fallback color
      }}
    >
      {/* Audio */}
      <audio ref={audioRef} src="/image/birthday.mp3" autoPlay loop playsInline />

      {/* Confetti */}
      <Confetti width={windowSize.width} height={windowSize.height} />

      {/* Header */}
      <div className="z-10 px-4 py-6 mt-10 md:mt-20 backdrop-blur-md bg-white/50 rounded-xl shadow-lg w-[90%] max-w-2xl animate-fade-in-up">
        <h1 className="text-3xl md:text-5xl font-extrabold text-pink-600 drop-shadow-lg mb-4 leading-snug">
          Happy Birthday Rajnish! 🎂
        </h1>
        <p className="text-base md:text-xl text-gray-800 font-medium leading-relaxed">
          Wishing you joy, health, and happiness always! 🥳
        </p>
      </div>

      {/* Balloons */}
      <div className="balloon balloon1" />
      <div className="balloon balloon2" />
      <div className="balloon balloon3" />

      {/* Footer */}
      <footer className="z-10 w-full px-4 pb-10 flex flex-col items-center gap-4 mt-10">
        <img
          src="/image/rajnish.jpg"
          alt="Rajnish Singh smiling on his birthday"
          className="rounded-full w-28 h-28 md:w-40 md:h-40 object-cover border-4 border-pink-400 shadow-lg"
        />
        <p className="text-sm md:text-lg text-white bg-black/60 px-4 py-2 rounded-lg max-w-xs md:max-w-md">
          🎂 Let’s celebrate Rajnish Singh’s special day together! 💖
        </p>
   
        <button
          onClick={toggleMute}
          className="bg-pink-600 hover:bg-pink-700 text-white px-6 py-2 rounded-full text-sm shadow-md transition focus:outline-none focus:ring focus:ring-pink-300"
        >
          {isMuted ? '🔇 Unmute Music' : '🔊 Mute Music'}
        </button>
      </footer>
        <p className="text-xs md:text-sm text-gray-700">
          Love you Bhaiji ❤️ ~ AviRaj
          </p>
      {/* Tap-to-Start Overlay */}
      {!hasStarted && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/70">
          <button
            onClick={toggleMute}
            className="text-white text-lg md:text-xl bg-pink-600 hover:bg-pink-700 px-6 py-3 rounded-full shadow-lg"
          >
            👉 Tap to Start Music
          </button>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        .balloon {
          position: absolute;
          bottom: -100px;
          width: 60px;
          height: 90px;
          border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          animation: floatUp 8s ease-in-out infinite;
          opacity: 0.8;
        }
        .balloon1 {
          background: #ff6699;
          left: 20%;
          animation-delay: 0s;
        }
        .balloon2 {
          background: #66ccff;
          left: 50%;
          animation-delay: 2s;
        }
        .balloon3 {
          background: #ffcc66;
          left: 75%;
          animation-delay: 4s;
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(0.95);
            opacity: 0.3;
          }
          50% {
            transform: translateY(-50vh) scale(1.05);
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) scale(1);
            opacity: 0;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out both;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
