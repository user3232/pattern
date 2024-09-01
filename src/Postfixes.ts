import { 
    addValueToValuesTrie, 
    valuesOfAllValuesTriePrefixesMatchingString, 
    ValuesTrie, 
    valueOfBestValuesTriePrefixMatchingString, 
    createEmptyValuesTrie 
} from './ValuesTrie.js';
import { reverse } from './String.js';


/**
 * Postfixes container with efficient (Trie) matching alghoritm.
 */
export class Postfixes {
    #reversedTrie: ValuesTrie<string>

    /**
     * Creates postfixes container.
     */
    constructor(
        /**
         * Postfixes to add to container.
         */
        postfixes?: string[]
    ) {
        this.#reversedTrie = createEmptyValuesTrie()
        for(const postfix of postfixes ?? []) {
            addValueToValuesTrie(this.#reversedTrie, reverse(postfix), postfix)
        }
    }

    /**
     * Adds postfix to container.
     */
    add(
        /**
         * Postfix to add to container.
         */
        postfix: string
    ): void {
        addValueToValuesTrie(this.#reversedTrie, reverse(postfix), postfix)
    }

    /**
     * Returns all postfixes matching given string, from shortest to longest.
     */
    matchAllTo(
        /**
         * String to match postfixes to.
         */
        string: string
    ): string[] {
        return valuesOfAllValuesTriePrefixesMatchingString(this.#reversedTrie, reverse(string))
    }

    /**
     * Returns longest postfix matching given string.
     */
    matchBestTo(
        /**
         * String to match postfixes to.
         */
        string: string
    ): string | undefined {
        return valueOfBestValuesTriePrefixMatchingString(this.#reversedTrie, reverse(string))
    }
}