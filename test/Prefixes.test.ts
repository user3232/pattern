import assert from 'node:assert'
import test from 'node:test'
import { Prefixes } from '../src/Prefixes.js'


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

        const prefixesTrie = new Prefixes(prefixes)
        const actualPrefixesOfString = prefixesTrie.matchAllTo(string)

        assert.deepStrictEqual(actualPrefixesOfString, expectedPrefixesOfString)
        assert.deepStrictEqual(prefixesTrie.matchBestTo(string), 'hellow')
    })

    await Promise.all([t1])
})

