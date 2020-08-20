import assert from 'assert'
import basichtml from 'basichtml'
import ImageHandler from './../handlers/image-handler.js'

describe('ImageHandler', function () {
  describe('#element', function () {
    context('When loading=lazy is not supported', function () {
      const imageHandler = new ImageHandler()
      const {document} = basichtml.init({})

      it('loading=eager should be preserved if used', function () {
        const image = document.createElement('img')
        image.setAttribute('loading', 'eager')
        image.setAttribute('src', 'https://www.rankia.com/images/rankia_logo.png')

        imageHandler.element(image)

        assert.equal(image.hasAttribute('loading'), true)
        assert.equal(image.hasAttribute('is'), false)
        assert.equal(image.hasAttribute('src'), true)
        assert.equal(image.hasAttribute('data-src'), false)
      })

      it('loading=lazy and src attributes should be replaced with is=lazyload-image and data-src', function () {
        const image = document.createElement('image')
        image.setAttribute('loading', 'lazy')
        image.setAttribute('src', 'https://www.rankia.com/images/rankia_logo.png')

        imageHandler.element(image)

        assert.equal(image.hasAttribute('loading'), false)
        assert.equal(image.getAttribute('is'), 'lazyload-image')
        assert.equal(image.hasAttribute('src'), false)
        assert.equal(image.hasAttribute('data-src'), true)
      })

      it('is=lazyload-image should be preserved if used', function () {
        const image = document.createElement('image')
        image.setAttribute('is', 'lazyload-image')
        image.setAttribute('data-src', 'https://www.rankia.com/images/rankia_logo.png')

        imageHandler.element(image)

        assert.equal(image.hasAttribute('loading'), false)
        assert.equal(image.getAttribute('is'), 'lazyload-image')
        assert.equal(image.hasAttribute('src'), false)
        assert.equal(image.hasAttribute('data-src'), true)
      })
    })
  })
})
