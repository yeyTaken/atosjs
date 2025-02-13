import nextra from 'nextra'

const withNextra = nextra({
  latex: true,
  search: {
    codeblocks: false
  },
  contentDirBasePath: '/docs'
})

export default withNextra({
  // i18n: {
  //   locales: ['en', 'pt'],
  //   defaultLocale: 'en'
  // },
  reactStrictMode: true
})
