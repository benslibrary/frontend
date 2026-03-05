"use client";

import Link from "next/link";

const ITEMS: { label: string; href: string | null }[] = [
  { label: "홈", href: null },
  { label: "책찾기", href: "/archive" },
  { label: "책추천", href: "/archive" },
  { label: "독서기록", href: "/archive" },
  { label: "로그인", href: "/login" },
];

export function BottomNav() {
  return (
    <nav className="archive-bottom-nav" aria-label="하단 메뉴">
      {ITEMS.map(({ label, href }, i) =>
        href ? (
          <Link
            key={label}
            href={href}
            className="archive-nav-item"
          >
            {label}
          </Link>
        ) : (
          <span
            key={label}
            className="archive-nav-item active"
            aria-current="page"
          >
            {label}
          </span>
        )
      )}
    </nav>
  );
}
