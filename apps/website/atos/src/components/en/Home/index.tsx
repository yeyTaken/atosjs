'use client'

import { motion } from 'framer-motion'
import Prism from 'prismjs'
import { useEffect } from 'react'
import { FaArrowRight, FaGithub } from 'react-icons/fa'

import '@/components/theme/prismjs/atos.css';

export default function Home() {

  useEffect(() => {
    Prism.highlightAll() // run highlight after render
  }, [])

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-start min-h-screen py-8 px-4 lg:px-16">
      {/* Coluna Esquerda */}
      <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start">
        <h1 className="text-4xl font-bold text-center lg:text-left">
          Welcome to Atos
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            JS
          </span>
          !
        </h1>
        <p className="mt-4 text-lg text-center lg:text-left lg:max-w-[80%]">
          The
          {' '}
          <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            AtosJS
          </span>
          {' '}
          is your ultimate toolkit for transforming your developer experience,
          making your daily routine more productive and efficient.
        </p>
        <div className="mt-6 flex gap-4">
          <a
            href="/docs"
            className="px-6 py-2 border-2 border-blue-800 text-blue-800 rounded-lg hover:bg-blue-900 hover:text-white transition flex items-center gap-2"
          >
            <span>Get Started</span>
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

      {/* Coluna Direita: Caixa de código com Prismjs */}
      <div className="w-full lg:w-1/2 mt-8 lg:mt-0 hidden lg:block">
        <pre className="rounded-lg bg-gray-900 p-4 overflow-x-auto">
          <code className="language-javascript">
            {`const { GiftManager, TimeFormat } = require('atosjs');

module.exports = { 
  // GiftManager instance:
  // If no database is specified, AtosDB with the "json.sqlite" file will be used by default.
  // To disable logging (default: true), uncomment 'logging: false'.
  gift: new GiftManager({
    // logging: false, // Disables logs
    // If you want to specify a path, you can do it like this
    // quickdb: { filePath: 'source/to/path/test.sqlite' },
    // atosdb: { filePath: 'source/to/path/test.sqlite' },
    // mongodb: { connect: 'MONGO_URI', dbName: 'your-database-name' }, // Uses MongoDB
  }),

  // TimeFormat instance to handle time-related operations.
  t: new TimeFormat(),
};`}
          </code>
        </pre>
      </div>
    </div>
  )
}
