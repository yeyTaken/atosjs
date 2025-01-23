import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  i18n: [
    { locale: 'en', text: 'English' },
    { locale: 'pt', text: 'Português' },
  ],
  banner: {
    key: 'discord',
    text: (
      <a href="https://atos.js.org/discord" target="_blank">
        🎉 Discord AtosJS. Read more →
      </a>
    )
  },
  logo: (
    <>
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    style={{fill: 'currentColor' }}>
      <path 
      d="M20 3H4c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2zM4 19V7h16l.002 12H4z">
        </path>
        <path 
        d="M9.293 9.293 5.586 13l3.707 3.707 1.414-1.414L8.414 13l2.293-2.293zm5.414 0-1.414 1.414L15.586 13l-2.293 2.293 1.414 1.414L18.414 13z">
          </path>
    </svg>
    <span style={{ marginLeft: '.4em', fontWeight: 800 }}>
        AtosJS
      </span>
    </>
  ),
  project: {
    link: 'https://github.com/yeyTaken/atosjs',
  },
  chat: {
    link: 'https://atos.js.org/discord',
  },
  docsRepositoryBase: 'https://github.com/yeyTaken/atosjs',
  footer: {
    text: '© 2025 Rabi & TakenStudios. AtosJS documentation.',
  },
}

export default config
