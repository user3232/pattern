import { Postfixes } from './Postfixes.js'
import { Prefixes } from './Prefixes.js'



/**
 * Wildcard (`*`) patterns container with efficient (Trie) matching alghoritm.
 */
export class WildcardPatterns {
    #db: Record<string, Record<string, string>>
    #exacts: Set<string>
    #prefixes: Prefixes
    #prefixToPostfixes: Record<string, Postfixes>

    /**
     * Creates exact and wildcard (containing one `*`) patterns container.
     */
    constructor(
        /**
         * Patterns to add to container. Pattern may have at most one 
         * wildcard (`*`) character.
         */
        patterns?: string[]
    ) {
        this.#db = {}
        this.#exacts = new Set()
        this.#prefixes = new Prefixes()
        this.#prefixToPostfixes = {}

        for(const pattern of patterns ?? []) {
            addPatternToWildcardPatternsStructure({
                pattern,
                prefixes:                   this.#prefixes,
                prefixToPostfixes:          this.#prefixToPostfixes,
                prefixToPostfixesToPattern: this.#db,
                exacts:                     this.#exacts,
            })
        }
    }

    /**
     * Adds pattern to container. Pattern may have at most one 
     * wildcard (`*`) character.
     */
    add(
        /**
         * Pattern to add to container.
         */
        pattern: string
    ): void {
        addPatternToWildcardPatternsStructure({
            pattern,
            prefixes:                   this.#prefixes,
            prefixToPostfixes:          this.#prefixToPostfixes,
            prefixToPostfixesToPattern: this.#db,
            exacts:                     this.#exacts,
        })
    }


    /**
     * Returns exact or (if no exact) longest (containing `*`) 
     * pattern matching given string.
     * 
     * Returns `undefined` when no pattern matches.
     */
    matchBestTo(
        /**
         * String to match patterns to.
         */
        string: string
    ): string | undefined {

        if(this.#exacts.has(string)) {
            return string
        }
    
        let bestPattern: string | undefined = undefined
        for(const matchingPrefix of this.#prefixes.matchAllTo(string)) {
            const matchingPostfix = this.#prefixToPostfixes[matchingPrefix]!.matchBestTo(string)
            if(matchingPostfix !== undefined) {
                bestPattern = this.#db[matchingPrefix]![matchingPostfix]!
            }
        }
    
        return bestPattern
    }

    /**
     * Returns exact or (if no exact) longest (containing `*`) 
     * pattern matching given string. For exact match `prefix` is
     * provided `string`, `postfix` and `matched` are empty strings.
     * 
     * Returns `undefined` when no pattern matches.
     */
    matchBestToEx(
        /**
         * String to match patterns to.
         */
        string: string
    ): {
        pattern: string,
        prefix: string,
        postfix: string,
        matched: string,
    } | undefined {

        if(this.#exacts.has(string)) {
            return {
                pattern: string,
                prefix: string,
                postfix: '',
                matched: '',
            }
        }
    
        let lastBestPattern: {
            pattern: string,
            prefix: string,
            postfix: string,
            matched: string,
        } | undefined = undefined
        
        for(const matchingPrefix of this.#prefixes.matchAllTo(string)) {
            const matchingPostfix = this.#prefixToPostfixes[matchingPrefix]!.matchBestTo(string)
            if(matchingPostfix !== undefined) {
                lastBestPattern = {
                    pattern: this.#db[matchingPrefix]![matchingPostfix]!,
                    prefix: matchingPrefix,
                    postfix: matchingPostfix,
                    matched: string.substring(matchingPrefix.length, string.length - matchingPostfix.length)
                }
            }
        }
    
        return lastBestPattern
    }
}




/**
 * Adds pattern to WildcardPatternsStructure by mutating it.
 * 
 * WildcardPatternsStructure look like:
 * 
 * ```ts
 * 
 * // patterns (wild and exact):
 * const patterns = [
 *     // wild:
 *     'node_modules/react-dom/*',
 *     'node_modules/react-dom/*.js',
 *     'node_modules/react-dom/*js',
 *     // exact:
 *     'node_modules/react-dom/index.js',
 *     'node_modules/react-dom/',
 *     'node_modules/react-dom',
 * ]
 * // wild patterns:
 * // prefixToPostfixesToPattern:
 * const db = {
 *     'node_modules/react-dom/': {
 *         '': 'node_modules/react-dom/*',
 *         '.js': 'node_modules/react-dom/*.js',
 *         'js': 'node_modules/react-dom/*js',
 *     }
 * }
 * // exact patterns:
 * const exacts = new Set([
 *     'node_modules/react-dom/index.js',
 *     'node_modules/react-dom/',
 *     'node_modules/react-dom',
 * ])
 * 
 * ```
 */
function addPatternToWildcardPatternsStructure({
    pattern,
    prefixToPostfixesToPattern,
    exacts,
    prefixes,
    prefixToPostfixes,
}:{
    /**
     * Pattern to add to container.
     */
    pattern: string,
    /**
     * prefix -> Postfixes -> pattern
     */
    prefixToPostfixesToPattern: Record<string, Record<string, string>>,
    /**
     * Set of patterns without `*`.
     */
    exacts: Set<string>,
    /**
     * Prefixes of wildcard (containing `*`) patterns
     */
    prefixes: Prefixes,
    /**
     * wildcard patterns common prefix to postfixes 
     */
    prefixToPostfixes: Record<string, Postfixes>,
}) {
    const {type, exact, prefix, postfix} = patternToWildOrExact(pattern)
    if(type === 'wild') {
        if(!prefixToPostfixesToPattern[prefix]) {
            prefixToPostfixesToPattern[prefix] = {[postfix]: pattern}
        }
        else {
            prefixToPostfixesToPattern[prefix][postfix] = pattern
        }

        prefixes.add(prefix)
        
        if(!prefixToPostfixes[prefix]) {
            prefixToPostfixes[prefix] = new Postfixes([postfix])
        }
        else {
            prefixToPostfixes[prefix].add(postfix)
        }
    }
    if(type === 'exact') {
        exacts.add(exact)
    }
}




/**
 * Returns:
 * * type `exact` and pattern if pattern have no wildcards,
 * * type `wild` with prefix and postfix if pattern have one wildcard
 * 
 * Throws error otherwise.
 */
function patternToWildOrExact(
    pattern: string, 
    wildcardChar?: string
) {
    wildcardChar ??= '*'
    const wildcardIndex = pattern.indexOf(wildcardChar)
    if(wildcardIndex === -1) {
        return {
            type: 'exact' as const,
            exact: pattern,
        }
    }
    if(pattern.indexOf(wildcardChar, wildcardIndex + wildcardChar.length) !== -1) {
        throw new Error('Not a wildcard string, too many *', {
            cause: {pattern}
        })
    }
    const prefix = pattern.substring(0, wildcardIndex)
    const postfix = pattern.substring(wildcardIndex + wildcardChar.length)

    return {
        type: 'wild' as const,
        prefix,
        postfix,
    }
}


