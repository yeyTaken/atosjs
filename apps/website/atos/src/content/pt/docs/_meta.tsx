import type { MetaRecord } from 'nextra'
import { AiFillDiscord } from 'react-icons/ai'
import {
  FaClock,
  // FaDiscord,
  FaDatabase,
  FaGift,
  FaHome,
  FaInfo,
} from 'react-icons/fa'
import { MdCatchingPokemon } from 'react-icons/md'

const index = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <FaHome style={{ marginRight: '0.5em' }} />
    Introdução
  </span>
)

const giftManager = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <FaGift style={{ marginRight: '0.5em' }} />
    GiftManager
  </span>
)

const timeFormat = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <FaClock style={{ marginRight: '0.5em' }} />
    TimeFormat
  </span>
)

const database = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <FaDatabase style={{ marginRight: '0.5em' }} />
    AtosDB
  </span>
)

const pokedex = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <MdCatchingPokemon style={{ marginRight: '0.5em' }} />
    PokeDex
  </span>
)

const about = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <FaInfo style={{ marginRight: '0.5em' }} />
    About
  </span>
)

const discord = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <AiFillDiscord style={{ marginRight: '0.5em' }} />
    Discord
  </span>
)

export default {
  index: {
    title: index,
  },

  _: {
    type: 'separator',
    title: 'Classes',
  },

  'gift-manager': giftManager,
  'time-format': timeFormat,
  'atos-db': database,
  pokedex,

  __: {
    type: 'separator',
    title: 'More',
  },

  'about-link': {
    title: about,
    href: '/about',
  },
  'discord-link': {
    title: discord,
    href: '/discord',
  },
} satisfies MetaRecord
