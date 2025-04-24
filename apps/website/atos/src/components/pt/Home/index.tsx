'use client'

import { motion } from 'framer-motion'
import Prism from 'prismjs'
import { useEffect } from 'react'
import { FaArrowRight, FaGithub } from 'react-icons/fa'

import '@/components/theme/prismjs/atos.css';

export default function Home() {

  useEffect(() => {
    Prism.highlightAll() // executa o highlight após o render
  }, [])

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
          O
          {' '}
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            AtosJS
          </span>
          {' '}
          é o seu conjunto definitivo de ferramentas para transformar sua
          experiência como desenvolvedor, tornando seu dia a dia mais
          produtivo e eficiente.
        </p>
        <div className="mt-6 flex gap-4">
          <a
            href="/docs"
            className="px-6 py-2 border-2 border-blue-800 text-blue-800 rounded-lg hover:bg-blue-900 hover:text-white transition flex items-center gap-2"
          >
            <span>Começar</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              className="inline-block"
            >
              <FaArrowRight />
            </motion.span>
          </a>
          <a
            href="https://github.com/yeyTaken/atosjs"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 flex items-center gap-2 rounded-lg hover:bg-gray-900 bg-gray-800 text-white transition"
          >
            <FaGithub />
            GitHub
          </a>
        </div>
      </div>

      {/* Right Column: Caixa de código com Prismjs */}
      <div className="w-full lg:w-1/2 mt-8 lg:mt-0 hidden lg:block">
        <pre className="rounded-lg bg-gray-900 p-4 overflow-x-auto">
          <code className="language-javascript">
            {`// Configuração do arquivo: atos.config.js
const { GiftManager, TimeFormat } = require('atosjs');

module.exports = { 
  // Instância do GiftManager:
  // Se nenhum banco de dados for especificado, será usado por padrão o AtosDB com o arquivo "json.sqlite".
  // Para desativar os logs (padrão: true), descomente 'logging: false'.
  gift: new GiftManager({
    // logging: false, // Desativa os logs
    // quickdb: { filePath: 'data.db' }, // Usa o QuickDB com o arquivo 'data.db' padrão é "json.sqlite"
    // atosdb: { filePath: 'atos.db' }, // Usa o AtosDB com o arquivo 'atos.db' padrão é "json.sqlite"
    // mongodb: { connect: 'MONGO_URI', dbName: 'nome-do-seu-banco' }, // Usa o MongoDB
  }),

  // Instância do TimeFormat para lidar com operações relacionadas a tempo.
  t: new TimeFormat(),
};`}
          </code>
        </pre>
      </div>
    </div>
  )
}
