import Bowser from 'bowser'
import ImageHandler from './handlers/image-handler.js'
import IframeHandler from './handlers/iframe-handler.js'

async function handleRequest(request) {
  const response = await fetch(request)
  const userAgent = request.headers.get('User-Agent') || ''
  const browser = Bowser.getParser(userAgent)
  const rewriter = new HTMLRewriter()
  const supportsLazyLoadIframe = browser.satisfies({
    chrome: '>85',
    firefox: '>82'
  })

  if (!supportsLazyLoadIframe) {
    rewriter.on('iframe[loading=lazy]', new IframeHandler())

    const supportsLazyLoadImage = browser.satisfies({
      chrome: '>76',
      firefox: '>75',
      edge: '>80',
      mobile: {
        chrome: '>80'
      }
    })

    const supportsWebP = browser.satisfies({
      chrome: '>85',
      firefox: '>79',
      safari: '>14'
    })

    if (!supportsLazyLoadImage) {
      rewriter.on('img', new ImageHandler(supportsWebP))
    }
  }

  return rewriter.transform(response)
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
