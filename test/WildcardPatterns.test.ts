import assert from 'node:assert'
import test from 'node:test'
import { WildcardPatterns } from '../src/WildcardPatterns.js'


test('WildcardPatterns', async (t) => {
    const tests: Promise<void>[] = []
    tests.push(t.test('Finding best pattern matching string works', () => {

        const patternsList = [
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

        const patterns = new WildcardPatterns(patternsList)

        assert.deepStrictEqual(patterns.matchBestTo('hellow-you'), 'hel*you')
        assert.deepStrictEqual(patterns.matchBestTo('asdfhellow-you'), '*-you')
        assert.deepStrictEqual(patterns.matchBestTo('asdfhellow-you3'), '*')
        assert.deepStrictEqual(patterns.matchBestTo('help'), 'help')

        assert.deepStrictEqual(
            patterns.matchBestToEx('hellow-you'), 
            {
                pattern: 'hel*you',
                prefix: 'hel',
                postfix: 'you',
                matched: 'low-'
            }
        )

        assert.deepStrictEqual(
            patterns.matchBestToEx(''), 
            {
                pattern: '',
                prefix: '',
                postfix: '',
                matched: ''
            }
        )

        assert.deepStrictEqual(
            patterns.matchBestToEx('help'), 
            {
                pattern: 'help',
                prefix: 'help',
                postfix: '',
                matched: ''
            }
        )
    }))

    await Promise.all(tests)
})

