import assert from 'node:assert'
import test from 'node:test'
import { MatchPostfixes } from '../src/Postfixes.js'


test('Postfixes', async (t) => {

    const t1 = t.test('Finding postfixes matching string works', () => {

        const string = 'index.doc.html'
        const postfixes = [
            '.doc',
            '.doc.html',
            '.html',
            '',
        ]
        const expectedPrefixesOfString = [
            '.doc.html',
            '.html',
            '',
        ].sort((a, b) => a.length - b.length)

        const postfixesTrie = new MatchPostfixes(postfixes)
        const actualPostfixesOfString = postfixesTrie.allPostfixesOf(string)

        assert.deepStrictEqual(actualPostfixesOfString, expectedPrefixesOfString)
    })
    
    await Promise.all([t1])
})

