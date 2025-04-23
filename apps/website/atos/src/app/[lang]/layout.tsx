import type { I18nLangAsyncProps, I18nLangKeys } from '@/i18n'

import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import { CustomFooter } from '@/components/CustomFooter'
import { useServerLocale } from '@/hooks'
// import LocaleToggle from '@/widgets/locale-toggle'
import ThemeToggle from '@/widgets/theme-toggle'
import { Footer, LastUpdated, Layout, Navbar } from 'nextra-theme-docs'
import { Banner, Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { getDictionary, getDirection } from '../_dictionaries/get-dictionary'

import { ThemeProvider } from './_components/ThemeProvider'
import './styles/index.css'

export const metadata = {
  metadataBase: new URL('https://atos.js.org/'),
  applicationName: 'AtosJS',
  appleWebApp: {
    title: 'AtosJS',
  },
  other: {
    'msapplication-TileImage': '/img/ms-icon-144x144.svg',
    'msapplication-TileColor': '#fff',
  },

} satisfies Metadata

const repo = 'https://github.com/yeyTaken/atosjs'

const CustomBanner = async ({ lang }: I18nLangAsyncProps) => {
  const { t } = await useServerLocale(lang)
  return (
    <Banner
      storageKey="starter-banner"
    >
      <div className="flex justify-center items-center gap-1">
        { t('banner.title') }
        {' '}
        <a
          className="max-sm:hidden text-blue-800 underline"
          target="_blank"
          href={repo}
        >
          {t('banner.more')}
        </a>
      </div>
    </Banner>
  )
}


const CustomNavbar = async ({ lang }: I18nLangAsyncProps) => {
  const { t } = await useServerLocale(lang)
  return (
    <Navbar
      logo={(
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
      )}
      logoLink={`/${lang}`}
      projectLink={repo}
    >
      <>
        {/* <LocaleToggle className="max-md:hidden" /> */}
        <ThemeToggle className="max-md:hidden" />
      </>

    </Navbar>
  )
}

interface Props {
  children: ReactNode
  params: Promise<{ lang: I18nLangKeys }>
}

export default async function RootLayout({ children, params }: Props) {
  const { lang } = await params
  const dictionary = await getDictionary(lang)
  const pageMap = await getPageMap(lang)

  const title = 'AtosJS'
  const description = 'A best NPM'

  const { t } = await useServerLocale(lang)

  return (
    <html
      // Not required, but good for SEO
      lang={lang}
      // Required to be set
      // dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      dir={getDirection(lang)}
      suppressHydrationWarning
    >
      <Head
      // ... Your additional head options
      >
        {/* <title>{asPath !== '/' ? `${normalizePagesResult.title} - ${title}` : title}</title> */}
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <link rel="canonical" href={repo} />
      </Head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="starter-theme-provider"
          disableTransitionOnChange
        >
          <Layout
            // banner={
            //   <CustomBanner lang={lang} />
            // }
            navbar={
              <CustomNavbar lang={lang} />
            }
            lastUpdated={(
              <LastUpdated>
                { t('lastUpdated') }
              </LastUpdated>
            )}
            editLink={null}
            docsRepositoryBase="https://github.com/yeyTaken/atosjs"
            footer={(
              <Footer className="bg-background py-5!">
                <CustomFooter />
              </Footer>
            )}
            search={<Search />}
            i18n={[
              { locale: 'pt', name: 'Portuguese' },
              { locale: 'en', name: 'English' },
            ]}
            pageMap={pageMap}
            feedback={{ content: '' }}
          // ... Your additional layout options
          >
            {children}
          </Layout>
        </ThemeProvider>
      </body>
    </html>
  )
}
