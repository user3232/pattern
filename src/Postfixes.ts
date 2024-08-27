import { reverseString } from './String.js'
import { createTrie, longestPrefixesInTrie, type Trie } from './Trie.js'


/**
 * Stores string postfixes and allows effitient
 * postfixes matching to arbitrary string.
 */
export class MatchPostfixes {
    #reversedTrie: Trie
    #reversedPrefixes: string[]

    /**
     * Creates effitient store for postfixes and 
     * postfixes matching operations.
     */
    constructor(
        /**
         * Prefixes to store.
         */
        prefixes: string[]
    ) {
        this.#reversedPrefixes = prefixes.map(reverseString)
        this.#reversedTrie = createTrie(this.#reversedPrefixes)
    }

    /**
     * Returns all postfixes matching given string,
     * sorted from shortest to longest.
     */
    allPostfixesOf(string: string) {
        return longestPrefixesInTrie(
            this.#reversedTrie, 
            reverseString(string),
        ).map(reverseString)
    }

    /**
     * Returns longest matching postfix or `undefined` if none found.
     */
    bestPostfixOf(string: string): string | undefined {
        const matchingPrefixes = this.allPostfixesOf(string)
        return matchingPrefixes[matchingPrefixes.length - 1]
    }

    /**
     * Returns stored postfixes as provided in constructor.
     */
    allPostfixes() {
        return this.#reversedPrefixes.map(reverseString)
    }
}

