import { BookOpenTextIcon, GithubIcon, Heart } from "lucide-react";
import Link from "next/link";
import { Snippet } from "@heroui/react";

export default function Home() {

  return (
      <section className="flex items-center justify-center flex-col text-center m-10 p-10 space-y-20">
        {/* Título e descrição */}
        <div className="space-y-3">
          <h1 className="text-3xl md:text-6xl font-semibold">
            Your <span className="underline">imagination</span> is the limit.
          </h1>
          <p className="text-lg md:text-xl text-gray-400">
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
              className="flex items-center justify-center p-3 border-2 border-blue-950 rounded-md bg-blue-800/70 hover:bg-blue-950/70 hover:text-white transition-colors ease-in-out duration-300 w-full md:w-auto text-center"
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
        <Snippet symbol="$" variant="bordered" className="text-white" >
          npm install atosjs@latest
        </Snippet>
      </section>
  );
}