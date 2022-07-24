import globalApi from '/@/stores/global'
type ThemeTypes = 'default' | 'dark'

declare global {
  type ThemeHelper = {
    themes: typeof themes
    init(): void
    get(): string
    set(theme: string): void
    update(): void
  }

  interface Window {
    $theme: ThemeHelper
    $global: typeof globalApi
  }
}
