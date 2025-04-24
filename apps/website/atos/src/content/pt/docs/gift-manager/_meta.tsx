import type { MetaRecord } from 'nextra'
import { FaEye, FaGift, FaMagic, FaProjectDiagram } from 'react-icons/fa'

const generate = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <FaMagic style={{ marginRight: '0.5em' }} />
    Generate
  </span>
)

const view = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <FaEye style={{ marginRight: '0.5em' }} />
    View
  </span>
)

const redeem = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <FaGift style={{ marginRight: '0.5em' }} />
    Redeem
  </span>
)

const exampleProject = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <FaProjectDiagram style={{ marginRight: '0.5em' }} />
    Exemplo de uso
  </span>
)

export default {
  index: generate,
  view: view,
  redeem: redeem,
  'example-project': exampleProject
} satisfies MetaRecord
