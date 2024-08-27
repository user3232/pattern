import assert from 'node:assert'
import test from 'node:test'
import { 
    allStringsInTrie, 
    createTrie, 
    longestPrefixesInTrie, 
    Trie 
} from '../src/Trie.js'



test('Trie', async (t) => { 

    const t1 =t.test('Adding/getting strings to trie works', () => {
        const strings = [
            'hellow',
            'hell',
            'help',
            '',
        ].sort()

        const trie: Trie = createTrie(strings)
        const actualStrings = allStringsInTrie(trie)

        assert.deepStrictEqual(actualStrings, strings)

    })

    const t2 =t.test('Finding all prefixes in trie matching string works', () => {
        const strings = [
            'hellow',
            'hell',
            'help',
            '',
        ]
        const trie: Trie = createTrie(strings)
        const string = 'hellow-you'
        const allPrefixesOfString = longestPrefixesInTrie(trie, string)
        const expectedPrefixesOfString = [
            'hellow',
            'hell',
            '',
        ].sort((a, b) => a.length - b.length)

        assert.deepStrictEqual(allPrefixesOfString, expectedPrefixesOfString)
    })

    await Promise.all([t1, t2])
})

