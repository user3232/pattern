import assert from 'node:assert'
import test from 'node:test'
import { WildcardPatterns } from '../src/WildcardPatterns.js'


test('WildcardPatterns', async (t) => {
    const tests: Promise<void>[] = []
    tests.push(t.test('Finding best pattern matching string works', () => {

        const prefixes = [
            'hel*',
            'hel*u',
            'hel*you',
            'hel*p',
            'he*w-you',
            '',
            '*',
            '*-you',
            'help'
        ]

        const patterns = new WildcardPatterns(prefixes)

        assert.deepStrictEqual(patterns.matchBestTo('hellow-you'), 'hel*you')
        assert.deepStrictEqual(patterns.matchBestTo('asdfhellow-you'), '*-you')
        assert.deepStrictEqual(patterns.matchBestTo('asdfhellow-you3'), '*')
        assert.deepStrictEqual(patterns.matchBestTo('help'), 'help')
    }))

    await Promise.all(tests)
})

