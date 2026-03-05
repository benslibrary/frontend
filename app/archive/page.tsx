"use client";

import React, { useState, useEffect } from "react";

export default function Page() {
  const [step, setStep] = useState(1); // 1: 오프닝, 2: 입력, 3: 도장판, 4: 홈화면
  const [nickname, setNickname] = useState("");
  const [phoneTail, setPhoneTail] = useState("");
  const [agreed, setAgreed] = useState(false);

  // 도장 찍힌 후 2초 뒤에 홈화면으로 자동 이동
  useEffect(() => {
    if (step === 3) {
      const timer = setTimeout(() => {
        setStep(4);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [step]);

  // 2026년 2월 달력 데이터 (28일까지, 일요일 시작)
  const feb2026 = Array.from({ length: 28 }, (_, i) => i + 1);
  const attendanceDays = [1, 5, 12, 25]; // 초록색 점이 찍힐 날짜

  return (
    <main className="flex min-h-screen w-full justify-center bg-black font-sans text-white overflow-x-hidden">
      <div className="relative flex w-full max-w-[430px] flex-col">
        
        {/* Step 1: 오프닝 화면 */}
        {step === 1 && (
          <section className="flex flex-1 flex-col justify-between px-7 py-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <div className="mt-20">
              <h1 className="text-[34px] font-bold leading-[1.3]">
                안녕하세요!<br/>
                <span className="text-zinc-500">벤의 서재</span>에 오신걸<br/>
                환영해요!
              </h1>
              <p className="mt-6 text-[18px] text-zinc-500 font-medium leading-relaxed">
                오늘도 당신만의 독서 기록을<br/>차곡차곡 쌓아보세요.
              </p>
            </div>
            <button 
              onClick={() => setStep(2)} 
              className="w-full rounded-[24px] bg-white py-5 text-[18px] font-bold text-black active:scale-[0.96] transition-all"
            >
              시작하기
            </button>
          </section>
        )}

        {/* Step 2: 정보 입력 및 혜택 안내 */}
        {step === 2 && (
          <section className="flex flex-1 flex-col px-7 py-12 animate-in fade-in slide-in-from-bottom-6 duration-700">
            <header className="mt-10">
              <h1 className="text-[28px] font-bold tracking-tight text-white">
                당신의 별명을<br/>입력해주세요.
              </h1>
            </header>
            
            {/* 혜택 안내 섹션 */}
            <div className="mt-8 flex flex-col gap-4 rounded-[28px] bg-[#1a1a1b] p-6 border border-zinc-900">
              <div className="flex items-center gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-[13px] font-bold">1</span>
                <span className="text-[15px] font-semibold text-zinc-200">5회 출석 시 1회 무료 이용권 발급</span>
              </div>
              <div className="h-[1px] w-full bg-zinc-800/50" />
              <div className="flex items-center gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-[13px] font-bold">2</span>
                <span className="text-[15px] font-semibold text-zinc-200">5회 독서기록 시 1회 무료이용권 발급</span>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-8">
              <div className="flex flex-col gap-2">
                <label className="ml-1 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-600">Nickname</label>
                <input type="text" placeholder="어떻게 불러드릴까요?" value={nickname} onChange={(e) => setNickname(e.target.value)} className="w-full bg-transparent border-b-2 border-zinc-800 py-3 text-[20px] focus:border-white outline-none transition-all" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="ml-1 text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-600">Phone</label>
                <input type="tel" maxLength={4} placeholder="번호 뒷자리 4자리" value={phoneTail} onChange={(e) => setPhoneTail(e.target.value)} className="w-full bg-transparent border-b-2 border-zinc-800 py-3 text-[20px] focus:border-white outline-none transition-all" />
              </div>

              <div className="flex items-center gap-3 px-1">
                <input type="checkbox" id="privacy" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="h-5 w-5 rounded border-zinc-800 bg-transparent text-white focus:ring-0" />
                <label htmlFor="privacy" className="text-[14px] text-zinc-500 cursor-pointer select-none">개인정보 수집 동의 (필수)</label>
              </div>

              <div className="mt-6 mb-10 flex flex-col gap-4">
                <button 
                  onClick={() => agreed && nickname && phoneTail ? setStep(3) : alert("정보를 입력하고 동의해주세요.")} 
                  className={`w-full rounded-[24px] py-5 text-[18px] font-bold transition-all ${agreed && nickname && phoneTail ? "bg-white text-black active:scale-[0.96]" : "bg-zinc-900 text-zinc-600 cursor-not-allowed"}`}
                >
                  책 읽으러 가기
                </button>
                <button onClick={() => setStep(4)} className="w-full py-2 text-[14px] font-medium text-zinc-700 underline underline-offset-4">
                  넘어갈래요
                </button>
              </div>
            </div>
          </section>
        )}

        {/* Step 3: 도장 찍기 화면 (중앙 배치) */}
        {step === 3 && (
          <section className="flex h-screen flex-col items-center justify-center px-7 animate-in fade-in duration-500">
            <h2 className="mb-10 text-xl font-bold text-zinc-400 italic tracking-widest uppercase">Stamp Card</h2>
            <div className="grid grid-cols-5 gap-4 rounded-[32px] bg-[#121212] p-8 border border-zinc-900 shadow-2xl">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="flex h-14 w-14 items-center justify-center rounded-full bg-black border border-zinc-800 relative overflow-hidden">
                  {i === 0 && ( 
                    <div className="animate-bounce-in w-full h-full">
                      <img src="/logo.jpg" alt="stamp" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-10 text-zinc-500 animate-pulse">방문 도장이 찍혔습니다!</p>
          </section>
        )}

        {/* Step 4: 홈 대시보드 (인스타그램 스타일) */}
        {step === 4 && (
          <section className="flex flex-1 flex-col animate-in fade-in duration-700 pb-24">
            <header className="px-7 pt-12">
              <h1 className="text-[26px] font-bold text-white">{nickname || "방문객"}님</h1>
              <div className="mt-8 flex justify-between rounded-[24px] bg-[#121212] p-6 text-center border border-zinc-900">
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-[12px] text-zinc-500 font-medium">방문</span>
                  <span className="text-[18px] font-bold">1회</span>
                </div>
                <div className="h-8 w-[1px] bg-zinc-800 my-auto" />
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-[12px] text-zinc-500 font-medium">읽은 책</span>
                  <span className="text-[18px] font-bold">0권</span>
                </div>
                <div className="h-8 w-[1px] bg-zinc-800 my-auto" />
                <div className="flex flex-col gap-1 flex-1">
                  <span className="text-[12px] text-zinc-500 font-medium">독서기록</span>
                  <span className="text-[18px] font-bold">0회</span>
                </div>
              </div>
            </header>

            <div className="mt-10 px-7">
              <h3 className="mb-6 text-[18px] font-bold px-1 text-zinc-200">2026년 2월</h3>
              <div className="rounded-[28px] bg-[#121212] p-6 border border-zinc-900">
                <div className="grid grid-cols-7 mb-6 text-center text-[12px] font-bold text-zinc-600">
                  {['일','월','화','수','목','금','토'].map(d => <div key={d}>{d}</div>)}
                </div>
                <div className="grid grid-cols-7 gap-y-7 text-center">
                  {feb2026.map(day => (
                    <div key={day} className="relative flex flex-col items-center justify-center py-1">
                      <span className="text-[16px] font-semibold text-zinc-300">{day}</span>
                      {attendanceDays.includes(day) && (
                        <div className="absolute -bottom-2 h-1.5 w-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 하단 네비게이션바 */}
            <nav className="fixed bottom-0 left-1/2 flex w-full max-w-[430px] -translate-x-1/2 justify-around border-t border-zinc-900 bg-black/90 py-4 backdrop-blur-lg z-50">
              <button className="flex flex-col items-center gap-1.5 text-white">
                <span className="text-2xl">🏠</span>
                <span className="text-[10px] font-bold">홈</span>
              </button>
              <button className="flex flex-col items-center gap-1.5 text-zinc-600">
                <span className="text-2xl">📚</span>
                <span className="text-[10px] font-medium">책추천</span>
              </button>
              <button className="flex flex-col items-center gap-1.5 text-zinc-600">
                <span className="text-2xl">🔍</span>
                <span className="text-[10px] font-medium">검색</span>
              </button>
              <button className="flex flex-col items-center gap-1.5 text-zinc-600">
                <span className="text-2xl">✍️</span>
                <span className="text-[10px] font-medium">기록</span>
              </button>
              <button className="flex flex-col items-center gap-1.5 text-zinc-600">
                <span className="text-2xl">👥</span>
                <span className="text-[10px] font-medium">모임</span>
              </button>
            </nav>
          </section>
        )}

      </div>

      <style jsx global>{`
        @keyframes bounce-in {
          0% { transform: scale(0); opacity: 0; }
          70% { transform: scale(1.1); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-bounce-in {
          animation: bounce-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </main>
  );
}