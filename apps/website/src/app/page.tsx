"use client";

import { BookOpenTextIcon, GithubIcon, Heart } from "lucide-react";
import Link from "next/link";
import { Snippet } from "@heroui/react";
import { useState } from "react";
import { CopyIcon, CheckIcon } from "@/components/icons";

export default function Home() {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setTimeout(() => setIsClicked(false), 1000); // Volta ao estado original após 1 segundo
  };

  return (
    <>
      <section className="flex items-center justify-center flex-col text-center p-5 md:p-10 space-y-10 md:space-y-20">
        {/* Título e descrição */}
        <div className="space-y-3">
          <h1 className="text-4xl md:text-6xl font-semibold">
            Your <span className="underline">imagination</span> is the limit.
          </h1>
          <p className="text-lg md:text-xl text-paragraph">
            AtosJS is a JavaScript library that simplifies event management. Its main class,
            GiftManager, handles the distribution of virtual rewards, efficiently controlling the
            delivery and validity of prizes.
          </p>
        </div>

        {/* Botões */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          {/* Primeira linha (2 botões em telas pequenas, 3 botões em telas grandes) */}
          <div className="flex flex-row gap-4">
            <Link
              href={"/docs"}
              className="flex items-center justify-center p-3 border-2 border-blue-950 rounded-md hover:bg-blue-950/70 hover:text-white transition-colors ease-in-out duration-300 w-full md:w-auto text-center"
            >
              <BookOpenTextIcon className="inline-block w-6 h-6 mr-1" /> Documentation
            </Link>
            <Link
              href={"https://github.com/yeyTaken/atosjs"}
              className="flex items-center justify-center p-3 border-2 border-white/70 rounded-md hover:bg-white/10 transition-colors ease-in-out duration-300 w-full md:w-auto text-center"
            >
              <GithubIcon className="inline-block w-6 h-6 mr-1" /> Github
            </Link>
          </div>

          {/* Botão Donate (centralizado em telas pequenas, na mesma linha em telas grandes) */}
          <Link
            href={"https://github.com/yeyTaken"}
            className="flex items-center justify-center p-3 border-2 border-pink-600 rounded-md hover:bg-pink-600/70 hover:text-white transition-colors ease-in-out duration-300 w-full md:w-auto text-center"
          >
            <Heart className="inline-block w-6 h-6 mr-1" /> Donate
          </Link>
        </div>

        {/* Snippet */}
        <div onClick={handleClick} className="w-full max-w-md">
          <Snippet
            checkIcon={
              <CheckIcon
                className={isClicked ? "text-green-500" : "text-white"} // Verde quando ativo, branco quando inativo
              />
            }
            copyIcon={<CopyIcon className="text-white" />} // Sempre branco
            variant="bordered"
            className="text-white w-full"
          >
            npm install atosjs@latest
          </Snippet>
        </div>
      </section>
    </>
  );
}