"use client";

import { FaGithub } from "react-icons/fa";

export default function Home() {

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-start min-h-screen py-8 px-4 lg:px-16">
      {/* Left Column */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
        <h1 className="text-4xl font-bold text-center lg:text-left">
          Bem-vindo ao Atos
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            JS
          </span>
          !
        </h1>
        <p className="mt-4 text-lg text-center lg:text-left lg:max-w-[80%]">
          O{' '}
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            AtosJS
          </span>{' '}
          é o seu conjunto definitivo de ferramentas para transformar sua
          experiência como desenvolvedor, tornando seu dia a dia mais
          produtivo e eficiente.
        </p>
        <div className="mt-6 flex gap-4">
          <a
            href="/docs"
            className="px-6 py-2 border-2 border-blue-800 text-blue-800 rounded-lg hover:bg-blue-900 hover:text-white transition"
          >
            Documentação
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 flex items-center gap-2 rounded-lg hover:bg-gray-900 bg-gray-800 text-white transition"
          >
            <FaGithub />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
