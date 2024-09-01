import { Prefixes } from './Prefixes.js';


/**
 * Directory patterns (ending with `/`) and exact patterns 
 * container with efficient (Trie) matching alghoritm.
 */
export class DirPatterns {
    #prefixes: Prefixes
    #exacts: Set<string>

    /**
     * Creates exact and directory (ending with `/`) patterns container.
     */
    constructor(
        /**
         * Patterns to add to container. Pattern may end with `/`, 
         * those will be threated as prefixes, other as exact.
         */
        patterns?: string[]
    ) {
        this.#prefixes = new Prefixes()
        this.#exacts = new Set()

        for(const pattern of patterns ?? []) {
            addPatternToPrefixPatterns({
                pattern,
                prefixes: this.#prefixes,
                exacts: this.#exacts,
            })
        }
    }

    /**
     * Adds pattern to container. Pattern may end with 
     * `/` character and is then matched as prefix. Others
     * are matched as exact.
     */
    add(
        /**
         * Pattern to add to container.
         */
        pattern: string
    ): void {
        addPatternToPrefixPatterns({
            pattern,
            prefixes: this.#prefixes,
            exacts: this.#exacts,
        })
    }

    /**
     * Returns exact or (if no exact) longest (ending with `/`) 
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

        return this.#prefixes.matchBestTo(string)
    }
}



function addPatternToPrefixPatterns({
    pattern, prefixes, exacts,
}: {
    pattern: string,
    prefixes: Prefixes,
    exacts: Set<string>,
}) {
    switch(patternToDirOrExact(pattern)) {
        case 'exact': 
            exacts.add(pattern)
            return
        case 'dir':
            prefixes.add(pattern)
            return
    }

}


function patternToDirOrExact(
    pattern: string
): 'dir' | 'exact' {
    if(pattern.endsWith('/')) {
        return 'dir' as const
    }
    else {
        return 'exact' as const
    }
}