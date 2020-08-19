class IframeHandler {
  constructor () {
    this.customElement = 'lazyload-iframe'
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

export default IframeHandler
