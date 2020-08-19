import assert from 'assert'
import basichtml from 'basichtml'
import IframeHandler from './../handlers/iframe-handler.js'

describe('IframeHandler', function () {
  describe('#element', function () {
    context('When loading=lazy is not supported', function () {
      const iframeHandler = new IframeHandler()
      const {document} = basichtml.init({})

      it('loading=eager should be preserved if used', function () {
        const iframe = document.createElement('iframe')
        iframe.setAttribute('loading', 'eager')
        iframe.setAttribute('src', 'https://placeimg.com/640/480/any')

        iframeHandler.element(iframe)

        assert.equal(iframe.hasAttribute('loading'), true)
        assert.equal(iframe.hasAttribute('is'), false)
        assert.equal(iframe.hasAttribute('src'), true)
        assert.equal(iframe.hasAttribute('data-src'), false)
      })

      it('loading=lazy and src attributes should be replaced with is=lazyload-iframe and data-src', function () {
        const iframe = document.createElement('iframe')
        iframe.setAttribute('loading', 'lazy')
        iframe.setAttribute('src', 'https://placeimg.com/640/480/any')

        iframeHandler.element(iframe)

        assert.equal(iframe.hasAttribute('loading'), false)
        assert.equal(iframe.hasAttribute('is'), true)
        assert.equal(iframe.hasAttribute('src'), false)
        assert.equal(iframe.hasAttribute('data-src'), true)
      })

      it('is=lazyload-iframe should be preserved if used', function () {
        const iframe = document.createElement('iframe')
        iframe.setAttribute('is', 'lazyload-iframe')
        iframe.setAttribute('data-src', 'https://placeimg.com/640/480/any')

        iframeHandler.element(iframe)

        assert.equal(iframe.hasAttribute('loading'), false)
        assert.equal(iframe.hasAttribute('is'), true)
        assert.equal(iframe.hasAttribute('src'), false)
        assert.equal(iframe.hasAttribute('data-src'), true)
      })
    })
  })
})
