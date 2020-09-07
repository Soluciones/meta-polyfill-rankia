class ImageHandler {
  constructor (supportsWebP) {
    this.customElement = 'lazyload-image'
    this.supportsWebP = supportsWebP
  }

  element (element) {
    if (element.getAttribute('loading') === 'lazy') {
        element.setAttribute('data-src', element.getAttribute('src'))
        element.setAttribute('is', this.customElement)
        element.removeAttribute('loading')
        element.removeAttribute('src')
    } else if ((!element.hasAttribute('loading') || element.getAttribute('loading') === 'eager') && !element.hasAttribute('is')) {
      if (element.getAttribute('src').endsWith('.webp') && !this.supportsWebP) {
        element.setAttribute('is', 'webp-support')
      }
    }
  }
}

export default ImageHandler
