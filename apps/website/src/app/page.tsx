"use client";

import { BookOpenTextIcon, GithubIcon, Heart } from "lucide-react";
import Link from "next/link";
import { Snippet } from "@heroui/react";
import { useState } from "react";

interface IconProps {
  size?: number;
  height?: number;
  width?: number;
  [key: string]: any; // For additional props
}

export const CopyIcon = ({ size, height, width, ...props }: IconProps) => {
  return (
    <svg
      fill="none"
      height={size || height || 20}
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width={size || width || 20}
      {...props}
    >
      <path d="M6 17C4.89543 17 4 16.1046 4 15V5C4 3.89543 4.89543 3 6 3H13C13.7403 3 14.3866 3.4022 14.7324 4M11 21H18C19.1046 21 20 20.1046 20 19V9C20 7.89543 19.1046 7 18 7H11C9.89543 7 9 7.89543 9 9V19C9 20.1046 9.89543 21 11 21Z" />
    </svg>
  );
};

export const CheckIcon = ({ size, height, width, ...props }: IconProps) => {
  return (
    <svg
      fill="currentColor"
      height={size || height || 24}
      viewBox="0 0 24 24"
      width={size || width || 24}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="m2.394 13.742 4.743 3.62 7.616-8.704-1.506-1.316-6.384 7.296-3.257-2.486zm19.359-5.084-1.506-1.316-6.369 7.279-.753-.602-1.25 1.562 2.247 1.798z" />
    </svg>
  );
};

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 1000); // Volta ao estado original após 1 segundo
  };

  return (
    <>
      <section className="flex items-center justify-center flex-col text-center m-10 p-10 space-y-20">
        <div className="space-y-3">
          <h1 className="text-6xl font-semibold">
            Your <span className="underline">imagination</span> is the limit.
          </h1>
          <p className="text-xl text-paragraph">
            AtosJS is a JavaScript library that simplifies event management. Its main class,
            GiftManager, handles the distribution of virtual rewards, efficiently controlling the
            delivery and validity of prizes.
          </p>
        </div>

        <div className="flex items-center justify-center space-x-5">
          <Link
            href={"/docs"}
            className="flex items-center p-3 border-2 border-blue-950 rounded-md hover:bg-blue-950/70 hover:text-white transition-colors ease-in-out duration-300"
          >
            <BookOpenTextIcon className="inline-block w-6 h-6 mr-1" /> Documentation
          </Link>
          <Link
            href={"https://github.com/yeyTaken/atosjs"}
            className="flex items-center py-3 px-10 border-2 border-white/70 rounded-md"
          >
            <GithubIcon className="inline-block w-6 h-6 mr-1" /> Github
          </Link>
          <Link
            href={"https://github.com/yeyTaken"}
            className="flex items-center py-3 px-10 border-2 border-pink-600 rounded-md"
          >
            <Heart className="inline-block w-6 h-6 mr-1" /> Donate
          </Link>
        </div>

        <div onClick={handleClick}>
          <Snippet
            checkIcon={
              <CheckIcon
                className={isClicked ? "text-green-500" : "text-white"} // Verde quando ativo, branco quando inativo
              />
            }
            copyIcon={<CopyIcon className="text-white" />} // Sempre branco
            variant="bordered"
            className="text-white"
          >
            npm install atosjs@latest
          </Snippet>
        </div>
      </section>
    </>
  );
}