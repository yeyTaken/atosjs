import { FaMagic, FaEye, FaGift, FaProjectDiagram } from 'react-icons/fa';

const generate = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <FaMagic style={{ marginRight: '0.5em' }} />
    Generate
  </span>
);

const view = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <FaEye style={{ marginRight: '0.5em' }} />
    View
  </span>
);

const redeem = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <FaGift style={{ marginRight: '0.5em' }} />
    Redeem
  </span>
);

const exampleProject = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <FaProjectDiagram style={{ marginRight: '0.5em' }} />
    Example Project
  </span>
);

export default {
  generate: {
    title: generate
  },
  view: {
    title: view
  },
  redeem: {
    title: redeem
  },
  'example-project': {
    title: exampleProject
  }
};
