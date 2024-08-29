import assert from 'node:assert'
import test from 'node:test'
import { MatchPrefixes } from '../src/MatchPrefixes.js'


test('Prefixes', async (t) => {

    const t1 = t.test('Finding prefixes matching string works', () => {

        const string = 'hellow-you'
        const prefixes = [
            'hellow',
            'hell',
            'help',
            '',
        ]
        const expectedPrefixesOfString = [
            'hellow',
            'hell',
            '',
        ].sort((a, b) => a.length - b.length)

        const prefixesTrie = new MatchPrefixes(prefixes)
        const actualPrefixesOfString = prefixesTrie.allPrefixesOf(string)

        assert.deepStrictEqual(actualPrefixesOfString, expectedPrefixesOfString)
    })

    await Promise.all([t1])
})

