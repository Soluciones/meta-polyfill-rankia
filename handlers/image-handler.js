class ImageHandler {
  constructor () {
    this.customElement = 'lazyload-image'
  }

  element (element) {
    if (element.hasAttribute('loading')) {
      if (element.getAttribute('loading') === 'lazy') {
        element.setAttribute('data-src', element.getAttribute('src'))
        element.setAttribute('is', this.customElement)
        element.removeAttribute('loading')
        element.removeAttribute('src')
      }
    } else if (!element.hasAttribute('is')) {
      if (element.getAttribute('src').endsWith('.webp')) {
        element.setAttribute('is', 'webp-support')
      }
    }
  }
}

export default ImageHandler
