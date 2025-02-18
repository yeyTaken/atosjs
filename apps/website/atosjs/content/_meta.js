import { FaHome, FaGift, FaClock, FaInfo, FaDiscord } from 'react-icons/fa';

const index = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <FaHome style={{ marginRight: '0.5em' }} />
    Introduction
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

  "gift-manager": giftManager,
  "time-format": timeFormat,

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
};
