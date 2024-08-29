import assert from 'node:assert'
import test from 'node:test'
import { pathFullExtension } from '../src/Path.js'


test('Path operations', async (t) => {
    const parallelTests: Promise<void>[] = []

    parallelTests.push(t.test('Finding full extension for "index.doc.html" works', () => {

        const path = 'index.doc.html'
        const expectedFullExtension = '.doc.html'
        const actualFullExtension = pathFullExtension(path)

        assert.deepStrictEqual(actualFullExtension, expectedFullExtension)
    }))

    parallelTests.push(t.test('Finding full extension for "/src/.del/index.doc.html" works', () => {

        const path = '/src/.del/index.doc.html'
        const expectedFullExtension = '.doc.html'
        const actualFullExtension = pathFullExtension(path)

        assert.deepStrictEqual(actualFullExtension, expectedFullExtension)
    }))

    parallelTests.push(t.test('Finding full extension for "/src/.del/index.html" works', () => {

        const path = '/src/.del/index.html'
        const expectedFullExtension = '.html'
        const actualFullExtension = pathFullExtension(path)

        assert.deepStrictEqual(actualFullExtension, expectedFullExtension)
    }))

    parallelTests.push(t.test('Finding full extension for "/src/.del/index." works', () => {

        const path = '/src/.del/index.'
        const expectedFullExtension = '.'
        const actualFullExtension = pathFullExtension(path)

        assert.deepStrictEqual(actualFullExtension, expectedFullExtension)
    }))

    parallelTests.push(t.test('Finding full extension for "/src/.del/index" works', () => {

        const path = '/src/.del/index'
        const expectedFullExtension = ''
        const actualFullExtension = pathFullExtension(path)

        assert.deepStrictEqual(actualFullExtension, expectedFullExtension)
    }))

    parallelTests.push(t.test('Finding full extension for "index" works', () => {

        const path = 'index'
        const expectedFullExtension = ''
        const actualFullExtension = pathFullExtension(path)

        assert.deepStrictEqual(actualFullExtension, expectedFullExtension)
    }))
    
    await Promise.all(parallelTests)
})

