import appConfig from '../stores/config'

const themes = [
  { name: '蓝色', value: '', type: 'light', variable: '--skin-blue' },
  { name: '黑暗', value: 'dark', type: 'dark', variable: '--skin-dark' }
]

const themeHelper: ThemeHelper = {
  themes,
  init(): void {
    this.update()
  },
  get(): string {
    return appConfig.theme
  },
  set(theme: string): void {
    appConfig.theme = theme
    this.update()
  },
  update() {
    document.body.setAttribute('arco-theme', appConfig.theme)
  }
}

export default themeHelper
