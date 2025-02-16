// app/_meta.js
import { FaBook } from 'react-icons/fa';
// import { FaNewspaper } from "react-icons/fa6";

export default {
  index: {
    display: 'hidden'
  },
  docs: {
    type: 'page',
    title: (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <FaBook style={{ marginRight: '0.5em' }} />
        Docs
      </span>
    ),
  },
  /*blog: {
    type: 'page',
    title: (
      <span style={{ display: 'flex', alignItems: 'center' }}>
        <FaNewspaper style={{ marginRight: '0.5em' }} />
        Blog
      </span>
    )
  } */
}