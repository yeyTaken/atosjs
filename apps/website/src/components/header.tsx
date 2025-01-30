"use client";

import { FaDiscord, FaUsers } from "react-icons/fa6";
import Link from "next/link";

export const AtosLogo = () => {
  return (
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
  );
};

export default function Header() {
  return (
    <header className="flex justify-between items-center bg-transparent shadow p-5">
    <div className="flex items-center cursor-pointer">
      <Link href="/" className="flex items-center">
        <AtosLogo />
        <h2 className="font-bold text-inherit ml-2">AtosJS</h2>
      </Link>
    </div>


      <nav>
        <ul className="flex items-center justify-center gap-3">
          <li className="relative text-white cursor-pointer">
            <Link href="/team">
              <FaUsers className="text-2xl cursor-pointer hover:text-red-500/70 hover:text-white transition-colors ease-in-out duration-300" />
            </Link>
          </li>
          <li className="relative text-white cursor-pointer">
            <Link href="/discord">
              <FaDiscord className="text-2xl cursor-pointer hover:text-blue-800/70 hover:text-white transition-colors ease-in-out duration-300" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}