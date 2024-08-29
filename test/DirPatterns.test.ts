import assert from 'node:assert'
import test from 'node:test'
import { DirPatterns } from '../src/DirPatterns.js'


test('WildcardPatterns', async (t) => {
    const tests: Promise<void>[] = []
    tests.push(t.test('Finding best pattern matching string works', () => {

        const prefixes = [
            'hel/',
            'hel/go',
            '/',
            '/as',
            'h/',
            'hel/g/',
        ]

        const patterns = new DirPatterns(prefixes)

        assert.deepStrictEqual(patterns.matchBestTo('hel/gow'), 'hel/')
        assert.deepStrictEqual(patterns.matchBestTo('hel/go'), 'hel/go')
        assert.deepStrictEqual(patterns.matchBestTo('/asdfhellow-you'), '/')
    }))

    await Promise.all(tests)
})

