"use client";

import { useRef, useState } from "react";

type InfoStepProps = {
  onSubmit: (nick: string, phone: string) => void;
  onSkip: () => void;
};

export function InfoStep({ onSubmit, onSkip }: InfoStepProps) {
  const [nick, setNick] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const phoneRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    const trimmedNick = nick.trim();
    const trimmedPhone = phone.trim();
    if (!trimmedNick || !trimmedPhone) {
      setError("정보를 모두 입력해주세요.");
      return;
    }
    if (trimmedPhone.length !== 4 || !/^\d{4}$/.test(trimmedPhone)) {
      setError("전화번호 뒷자리 4자리를 입력해주세요.");
      return;
    }
    setError("");
    onSubmit(trimmedNick, trimmedPhone);
  };

  const handleLoad = () => {
    setError("");
    alert("불러오기 기능은 준비 중입니다.");
  };

  return (
    <section className="archive-step active" aria-label="정보 입력">
      <h1 className="archive-fade-up">
        당신의 정보를
        <br />
        입력해주세요
      </h1>
      <div className="archive-input-group archive-fade-up">
        <input
          type="text"
          className="archive-input"
          placeholder="별명 입력"
          spellCheck={false}
          value={nick}
          onChange={(e) => setNick(e.target.value)}
          aria-label="별명"
        />
        <input
          ref={phoneRef}
          type="tel"
          className="archive-input"
          placeholder="전화번호 뒷자리 4자리"
          maxLength={4}
          value={phone}
          onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
          aria-label="전화번호 뒷자리 4자리"
        />
        {error && (
          <p className="text-sm mb-2" style={{ color: "var(--archive-point)" }}>
            {error}
          </p>
        )}
        <button type="button" className="archive-btn-main" onClick={handleSubmit}>
          입력하기
        </button>
        <button type="button" className="archive-btn-sub" onClick={handleLoad}>
          불러오기
        </button>
        <button type="button" className="archive-btn-skip" onClick={onSkip}>
          넘어갈래요
        </button>
      </div>
    </section>
  );
}
