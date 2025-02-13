/* eslint-env node */
import { Footer, Layout, Navbar } from 'nextra-theme-docs';
import { Banner, Head } from 'nextra/components';
import { getPageMap } from 'nextra/page-map';
import 'nextra-theme-docs/style.css';

export const metadata = {
  metadataBase: new URL('https://nextra.site'),
  title: {
    template: '%s - AtosJS'
  },
  description: 'A melhor NPM que verá!',
  applicationName: 'AtosJS',
  generator: 'Next.js',
  appleWebApp: {
    title: 'AtosJS'
  },
  other: {
    'msapplication-TileImage': '/ms-icon-144x144.svg',
    'msapplication-TileColor': '#fff'
  },
  
}

export default async function RootLayout({ children }) {
  const navbar = (
    <Navbar
      logo={
        <>
          <svg fill="none" height="36" viewBox="0 0 32 32" width="36">
            <path
              clipRule="evenodd"
              d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z"
              fill="currentColor"
              fillRule="evenodd"
            />
          </svg>
          <span style={{ marginLeft: '.4em', fontWeight: 800 }}>
            AtosJS
          </span>
        </>
      }
      chatLink="https://atos.js.org/discord"
    />
  )
  const pageMap = await getPageMap()
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head faviconGlyph="✦" />
      <body>
        <Layout
          banner={
          <Banner storageKey="AtosJS">AtosJS v3</Banner>
        }

          navbar={navbar}

          footer={
          <Footer>MIT {new Date().getFullYear()} © AtosJS.</Footer>
        }
        
          editLink="Edit this page on GitHub"
          docsRepositoryBase="https://github.com/yeyTaken/atosjs/website/atosjs/docs"
          sidebar={{ defaultMenuCollapseLevel: 1 }}
          pageMap={pageMap}
        >
          {children}
        </Layout>
      </body>
    </html>
  )
}
