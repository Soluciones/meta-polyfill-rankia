class ImageHandler {
  constructor (supportsWebP) {
    this.customElement = 'lazyload-image'
    this.supportsWebP = supportsWebP
  }

  element (element) {
    const loading = element.getAttribute('loading')
    if (loading === 'lazy') {
        element.setAttribute('data-src', element.getAttribute('src'))
        element.setAttribute('is', this.customElement)
        element.removeAttribute('loading')
        element.removeAttribute('src')
    } else if ((!element.hasAttribute('loading') || loading === 'eager') && !element.hasAttribute('is')) {
      if (element.getAttribute('src').endsWith('.webp') && !this.supportsWebP) {
        element.setAttribute('is', 'webp-support')
      }
    }
  }
}

export default ImageHandler
