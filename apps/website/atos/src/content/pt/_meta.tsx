import type { MetaRecord } from 'nextra'

export default {
  index: {
    type: 'page',
    display: 'hidden',
    theme: {
      timestamp: false,
      layout: 'full',
      toc: false,
    },
  },
  docs: {
    title: 'Docs',
    type: 'page',
  },
} satisfies MetaRecord
