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
    }
  }
}

export default ImageHandler
