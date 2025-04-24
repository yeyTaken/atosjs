import type { MetaRecord } from 'nextra'
import { MdWidgets } from "react-icons/md";


const index = (
  <span style={{ display: 'flex', alignItems: 'center' }}>
    <MdWidgets style={{ marginRight: '0.5em' }} />
    Começar
  </span>
)

export default {
    index: index
} satisfies MetaRecord
