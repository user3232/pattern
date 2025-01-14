import assert from 'node:assert'
import test from 'node:test'
import { Postfixes } from '../src/Postfixes.js'


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

        const postfixesTrie = new Postfixes(postfixes)
        const actualPostfixesOfString = postfixesTrie.matchAllTo(string)

        assert.deepStrictEqual(actualPostfixesOfString, expectedPrefixesOfString)
        assert.deepStrictEqual(postfixesTrie.matchBestTo(string), '.doc.html')
    })
    
    await Promise.all([t1])
})

