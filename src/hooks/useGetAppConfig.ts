import { theme } from '../theme'
import { useRouter } from 'next/router'
import { Theme } from 'theme-ui'

export const useGetAppConfig = (initialColorMode: string, config: any): [Theme, boolean] => {
  // Logic used to hide components on iframes
  const router = useRouter()
  const show = router.pathname !== '/bond-widget'

  //Modify theme to keep SSR and CSR consistent. Also fetches URL configs to customize styles on iframes
  if (typeof window !== 'undefined' && window.self === window.top) {
    if (!window?.localStorage?.getItem('theme-ui-color-mode')) {
      window?.localStorage?.setItem('theme-ui-color-mode', initialColorMode)
    }
  }

  //TODO: make this pretty :)
  const parsedTheme = theme
  if (parsedTheme) {
    parsedTheme.initialColorModeName = initialColorMode
    if (config?.styles) {
      if (parsedTheme?.colors?.yellow && config?.styles?.primary) {
        parsedTheme.colors.yellow = config.styles.primary
      }
      if (parsedTheme?.colors?.background && config?.styles?.background) {
        parsedTheme.colors.background = config.styles.background
      }
      if (parsedTheme?.colors?.white2 && config?.styles?.background2) {
        parsedTheme.colors.white2 = config.styles.background2
      }
      if (parsedTheme?.colors?.white3 && config?.styles?.background3) {
        parsedTheme.colors.white3 = config.styles.background3
      }
      if (parsedTheme?.colors?.navbar && config?.styles?.background3) {
        parsedTheme.colors.navbar = config.styles.background3
      }
      if (parsedTheme?.colors?.lvl1 && config?.styles?.background3) {
        parsedTheme.colors.lvl1 = config.styles.background3
      }
      if (parsedTheme?.colors?.white4 && config?.styles?.background4) {
        parsedTheme.colors.white4 = config.styles.background4
      }
    }
  }

  return [parsedTheme, show]
}
