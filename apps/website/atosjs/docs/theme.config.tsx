import React from 'react'
import { DocsThemeConfig } from 'nextra-theme-docs'
// import { useConfig } from 'nextra-theme-docs'

const config: DocsThemeConfig = {
  i18n: [
    { locale: 'en', name: 'English' },
    { locale: 'pt', name: 'Português' },
  ],
  banner: {
    key: 'atosjs',
    content: (
      <a href="https://atos.js.org/discord" target="_blank">
        🎉 Discord AtosJS. Read more →
      </a>
    )
  },
  logo: (
    <>
    <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
      <path
        clipRule="evenodd"
        d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
        fill="currentColor"
        fillRule="evenodd"
      />
    </svg>
    <span style={{ marginLeft: '.4em', fontWeight: 800 }}>
        AtosJS
      </span>
    </>
  ),
  project: {
    link: 'https://github.com/yeyTaken/atosjs',
  },
  docsRepositoryBase: 'https://github.com/yeyTaken/atosjs',
}

export default config

