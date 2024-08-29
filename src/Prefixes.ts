import { 
    addValueToValuesTrie, 
    valuesOfAllValuesTriePrefixesMatchingString, 
    ValuesTrie, 
    valueOfBestValuesTriePrefixMatchingString, 
    createEmptyValuesTrie 
} from './ValuesTrie.js';


/**
 * Prefixes container with efficient (Trie) matching alghoritm.
 */
export class Prefixes {
    #trie: ValuesTrie<string>

    /**
     * Creates prefixes container.
     */
    constructor(
        /**
         * Prefixes to add to container.
         */
        prefixes?: string[]
    ) {
        this.#trie = createEmptyValuesTrie()
        for(const prefix of prefixes ?? []) {
            addValueToValuesTrie(this.#trie, prefix, prefix)
        }
    }

    /**
     * Adds prefix to container.
     */
    add(
        /**
         * Prefix to add to container.
         */
        prefix: string
    ) {
        addValueToValuesTrie(this.#trie, prefix, prefix)
    }

    /**
     * Returns all prefixes matching given string, from shortest to longest.
     */
    matchAllTo(
        /**
         * String to match prefixes to.
         */
        string: string
    ) {
        return valuesOfAllValuesTriePrefixesMatchingString(this.#trie, string)
    }

    /**
     * Returns longest prefix matching given string.
     */
    matchBestTo(
        /**
         * String to match prefixes to.
         */
        string: string
    ) {
        return valueOfBestValuesTriePrefixMatchingString(this.#trie, string)
    }
}