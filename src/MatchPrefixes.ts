import { createTrie, longestPrefixesInTrie, type Trie } from './Trie.js'


/**
 * Stores string prefixes and allows effitient
 * prefixes matching to arbitrary string.
 */
export class MatchPrefixes {
    #trie: Trie
    #prefixes: string[]

    /**
     * Creates effitient store for prefixes and 
     * prefixes matching operations.
     */
    constructor(
        /**
         * Prefixes to store.
         */
        prefixes: string[]
    ) {
        this.#trie = createTrie(prefixes)
        this.#prefixes = prefixes
    }

    /**
     * Returns all prefixes matching given string,
     * sorted from shortest to longest.
     */
    allPrefixesOf(
        string: string
    ): string[] {
        return longestPrefixesInTrie(this.#trie, string)
    }

    /**
     * Returns longest matching prefix or `undefined` if none found.
     */
    bestPrefixOf(
        string: string
    ): string | undefined {
        const matchingPrefixes = this.allPrefixesOf(string)
        return matchingPrefixes[matchingPrefixes.length - 1]
    }

    /**
     * Returns stored prefixes as provided in constructor.
     */
    allPrefixes(): string[] {
        return [...this.#prefixes]
    }
}