import Bowser from 'bowser'
import ImageHandler from './handlers/image-handler.js'
import IframeHandler from './handlers/iframe-handler.js'

async function handleRequest(request) {
  const response = await fetch(request)
  const userAgent = request.headers.get('User-Agent') || ''
  const browser = Bowser.getParser(userAgent)
  const rewriter = new HTMLRewriter()

  const os = browser.parseOS()
  const osName = os.name.toLowerCase()
  const osVersion = os.version

  // iOS < 14 is problematic and need special treatment
  if (osName === 'ios' && !isNaN(osVersion) && parseFloat(osVersion) < 14) {
    const iframeHandler = new IframeHandler()
    const imageHandler = new ImageHandler(false)
    rewriter.on('iframe[loading=lazy]', iframeHandler)
    rewriter.on('img', imageHandler)
  } else {
    const supportsLazyLoadIframe = browser.satisfies({
      chrome: '>85',
      firefox: '>84'
    })

    if (!supportsLazyLoadIframe) {
      const iframeHandler = new IframeHandler()
      rewriter.on('iframe[loading=lazy]', iframeHandler)

      const supportsLazyLoadImage = browser.satisfies({
        chrome: '>84',
        firefox: '>75',
        edge: '>80',
        mobile: {
          chrome: '>84'
        }
      })

      if (!supportsLazyLoadImage) {
        const supportsWebP = browser.satisfies({
          chrome: '>32',
          firefox: '>65',
          safari: '>15',
          edge: '>18',
          mobile: {
            firefox: '>68'
          }
        })

        const imageHandler = new ImageHandler(supportsWebP)
        rewriter.on('img', imageHandler)
      }
    }
  }

  return rewriter.transform(response)
}

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
