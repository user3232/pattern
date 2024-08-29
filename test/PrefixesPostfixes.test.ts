import assert from 'node:assert'
import test from 'node:test'
import { PrefixesPostfixes } from '../src/PrefixesPostfixes.js'


test('PrefixesPostfixes', async (t) => {
    const tests: Promise<void>[] = []
    tests.push(t.test('Finding best pattern matching string works', () => {

        const prefixesPostfixes = [
            {prefix: 'hel', postfix: ''},
            {prefix: 'hel', postfix: 'u'},
            {prefix: 'hel', postfix: 'you'},
            {prefix: 'hel', postfix: 'p'},
            {prefix: 'he',  postfix: 'w-you'},
            {prefix: '',    postfix: ''},
            {prefix: '',    postfix: '-you'},
        ]

        const patterns = new PrefixesPostfixes(prefixesPostfixes)

        assert.deepStrictEqual(patterns.matchBestTo('hellow-you'), {prefix: 'hel', postfix: 'you'})
        assert.deepStrictEqual(patterns.matchBestTo('asdfhellow-you'), {prefix: '',    postfix: '-you'})
        assert.deepStrictEqual(patterns.matchBestTo('asdfhellow-you3'), {prefix: '',    postfix: ''})
    }))

    await Promise.all(tests)
})

