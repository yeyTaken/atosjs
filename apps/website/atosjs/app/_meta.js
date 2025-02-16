// app/_meta.js
import { FaBook } from 'react-icons/fa';
// import { FaNewspaper } from "react-icons/fa6";

const docs = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <FaBook style={{ marginRight: '0.5em' }} />
    Docs
  </span>
);
/*
const blog = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <FaNewspaper style={{ marginRight: '0.5em' }} />
    Blog
  </span>

);
*/


export default {
  index: {
    display: 'hidden'
  },
  docs: {
    type: 'page',
    title: docs,
  },
  /*blog: {
    type: 'page',
    title: blog,
  } */
}