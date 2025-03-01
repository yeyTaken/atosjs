import type { MetaRecord } from 'nextra'
import { FaBook } from 'react-icons/fa';
// import { FaNewspaper } from "react-icons/fa6";

const docs = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <FaBook style={{ marginRight: '0.5em' }} />
    Docs
  </span>
);

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
    type: 'page',
    title: docs,
  },
} satisfies MetaRecord
