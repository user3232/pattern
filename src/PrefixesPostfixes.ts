import { Postfixes } from './Postfixes.js'
import { Prefixes } from './Prefixes.js'


/**
 * Pattern: heaving prefix and postfix to match.
 */
export type PrefixPostfix = {
    /**
     * Pattern prefix to match.
     */
    prefix: string, 
    /**
     * Pattern postfix to match.
     */
    postfix: string,
}

/**
 * Prefixes/Postfixes container with efficient (Trie) matching alghoritm.
 */
export class PrefixesPostfixes {
    #prefixes: Prefixes
    #prefixToPostfixes: Record<string, Postfixes>

    /**
     * Creates prefix/postfix patterns container.
     */
    constructor(
        /**
         * Patterns to add to container. 
         */
        patterns?: PrefixPostfix[]
    ) {
        this.#prefixes = new Prefixes()
        this.#prefixToPostfixes = {}

        for(const {prefix, postfix} of patterns ?? []) {
            addPatternToPrefixesPostfixesStructure({
                prefix, 
                postfix,
                prefixes:                   this.#prefixes,
                prefixToPostfixes:          this.#prefixToPostfixes,
            })
        }
    }

    /**
     * Adds pattern (prefix/postfix) to container. 
     */
    add(
        /**
         * Pattern to add to container.
         */
        pattern: PrefixPostfix
    ): void {
        addPatternToPrefixesPostfixesStructure({
            prefix:                     pattern.prefix,
            postfix:                    pattern.postfix,
            prefixes:                   this.#prefixes,
            prefixToPostfixes:          this.#prefixToPostfixes,
        })
    }


    /**
     * Returns longest (longest prefix then longest postfix)
     * pattern matching given string.
     * 
     * Returns `undefined` when no pattern matches.
     */
    matchBestTo(
        /**
         * String to match patterns to.
         */
        string: string
    ): undefined | PrefixPostfix {
    
        let bestPattern: PrefixPostfix | undefined = undefined
        for(const matchingPrefix of this.#prefixes.matchAllTo(string)) {
            const matchingPostfix = this.#prefixToPostfixes[matchingPrefix]!.matchBestTo(string)
            if(matchingPostfix !== undefined) {
                bestPattern = {
                    prefix: matchingPrefix,
                    postfix: matchingPostfix,
                }
            }
        }
    
        return bestPattern
    }
}




/**
 * Adds pattern to PrefixesPostfixes by mutating it.
 * 
 * PrefixesPostfixes internal structure look like:
 * 
 * ```ts
 * 
 * const prefixesPostfixes = [
 *     { prefix: 'node_modules/react-dom/', postfix: ''},
 *     { prefix: 'node_modules/react-dom/', postfix: '.js'},
 *     { prefix: 'node_modules/react-dom/', postfix: 'js'},
 * ]
 * const prefixToPostfixes = {
 *     'node_modules/react-dom/': new Postfixes([
 *         { prefix: 'node_modules/react-dom/', postfix: ''},
 *         { prefix: 'node_modules/react-dom/', postfix: '.js'},
 *         { prefix: 'node_modules/react-dom/', postfix: 'js'},
 *     ])
 * }
 * const prefixes = new Prefixes([
 *     'node_modules/react-dom/',
 * ])
 * 
 * ```
 */
function addPatternToPrefixesPostfixesStructure({
    prefix,
    postfix,
    prefixes,
    prefixToPostfixes,
}:{
    /**
     * Pattern prefix to add to container.
     */
    prefix: string,
    /**
     * Pattern postfix to add to container.
     */
    postfix: string,
    /**
     * Patterns prefixes.
     */
    prefixes: Prefixes,
    /**
     * Pattern prefix to postfixes map.
     */
    prefixToPostfixes: Record<string, Postfixes>,
}) {
        prefixes.add(prefix)
        
        if(!prefixToPostfixes[prefix]) {
            prefixToPostfixes[prefix] = new Postfixes([postfix])
        }
        else {
            prefixToPostfixes[prefix].add(postfix)
        }
    
}


