"use client";

import React, { useState } from "react";

export default function Page() {
  const [nickname, setNickname] = useState<string>("");
  const [phoneTail, setPhoneTail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert(`반가워요, ${nickname}님! 출석 체크가 완료되었습니다.`);
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-[#F9F8F4] px-6">
      <div className="w-full max-w-sm overflow-hidden rounded-[2rem] bg-white p-10 shadow-xl shadow-zinc-200/50">
        
        <div className="mb-10 text-center">
          <div className="inline-block mb-4 rounded-full bg-orange-50 p-4">
             <span className="text-3xl">📚</span>
          </div>
          <h1 className="text-2xl font-bold text-zinc-800 tracking-tight">벤의 서재</h1>
          <p className="mt-2 text-sm text-zinc-500">오늘의 독서를 기록해 보세요</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <label htmlFor="nickname" className="block mb-2 ml-1 text-sm font-semibold text-zinc-700">
              어떻게 불러드릴까요? (별명)
            </label>
            <input
              id="nickname"
              required
              type="text"
              placeholder="예: 북바인더"
              value={nickname}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNickname(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-zinc-800 focus:border-orange-300 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all"
            />
          </div>

          <div>
            <label htmlFor="phoneTail" className="block mb-2 ml-1 text-sm font-semibold text-zinc-700">
              전화번호 뒷자리 (4자리)
            </label>
            <input
              id="phoneTail"
              required
              type="text"
              maxLength={4}
              placeholder="0000"
              value={phoneTail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhoneTail(e.target.value)}
              className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 text-zinc-800 focus:border-orange-300 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all"
            />
          </div>

          <button
            type="submit"
            className="mt-4 w-full rounded-2xl bg-orange-400 py-4 font-bold text-white shadow-lg shadow-orange-200 hover:bg-orange-500 active:scale-[0.98] transition-all"
          >
            출석 체크하기
          </button>
        </form>

        <p className="mt-8 text-center text-[11px] leading-relaxed text-zinc-400">
          처음 방문이신가요? 별명과 번호만 입력하면 바로 시작됩니다.<br/>
          (개인정보는 안전하게 보관됩니다)
        </p>
      </div>
    </main>
  );
}