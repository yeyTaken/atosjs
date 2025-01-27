import { withLocales } from 'nextra/locales'
 
export const middleware = withLocales(request => {
    matcher: ['/', '/(pt/en)/:path*']
})