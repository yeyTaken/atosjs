import type { MetaRecord } from 'nextra'
import { FaHome, FaGift, FaClock, FaInfo, FaDiscord, FaDatabase } from 'react-icons/fa';

const index = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <FaHome style={{ marginRight: '0.5em' }} />
    Introdução
  </span>
);

const giftManager = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <FaGift style={{ marginRight: '0.5em' }} />
    GiftManager
  </span>
);

const timeFormat = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <FaClock style={{ marginRight: '0.5em' }} />
    TimeFormat
  </span>
);

const database = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <FaDatabase style={{ marginRight: '0.5em' }} />
    AtosDB
  </span>
);

const about = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <FaInfo style={{ marginRight: '0.5em' }} />
    About
  </span>
);

const discord = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <FaDiscord style={{ marginRight: '0.5em' }} />
    Discord
  </span>
);

export default {
  index: {
    title: index
  },

  _: {
    type: 'separator',
    title: 'Classes'
  },

  "gift-manager": {
    title: giftManager
  },
  "time-format": timeFormat,
  "atos-db": database,

  __: {
    type: 'separator',
    title: 'More'
  },

  'about-link': {
    title: about,
    href: '/about'
  },
  'discord-link': {
    title: discord,
    href: '/discord'
  }
} satisfies MetaRecord;