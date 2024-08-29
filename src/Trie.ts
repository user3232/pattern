

/**
 * Trie - multi-child tree storing in each node one character.
 * 
 * For example trie for words `'hellow', 'hell', 'help', ''`
 * would look like following:  
 * 
 * ```
 * ├── 
 * └── h
 *     └── e
 *         └── l
 *             ├── l
 *             |   └── o
 *             |       └── w
 *             └── p
 * 
 * ```
 */
export type Trie = {
    /**
     * Trie node children
     */
    characters: {[character in string]: Trie},
    /**
     * `true` if this trie node maches end of string in trie.
     */
    isEnd?: true,
}


/**
 * Creates trie containing strings.
 */
export function createTrie(
    /**
     * strings to put in trie
     */
    strings: string[]
): Trie {
    const trie: Trie = {characters: {}}
    for (const string of strings) {
        addStringToTrie(trie, string)
    }
    return trie
}


/**
 * Mutates trie by adding string
 */
export function addStringToTrie(
    /**
     * trie to mutate
     */
    trie: Trie,
    /**
     * string to add
     */
    string: string,
): Trie {
    let node = trie
    for (const character of [...string]) {
        if(!node.characters[character]) {
            node.characters[character] = {characters: {}}
        }
        node = node.characters[character]
    }
    node.isEnd = true
    return trie
}


/**
 * Enumerates all strings in trie.
 */
export function allStringsInTrie(
    /**
     * Trie to inspect
     */
    trie: Trie,
    /**
     * prefix to add to all strings in trie
     */
    prefix?: string,
): string[] {
    prefix = prefix ?? ''
    const strings: string[] = []
    if(trie.isEnd) {
        strings.push(prefix ?? '')
    }
    for (const [character, trieNode] of Object.entries(trie.characters)) {
        strings.push(...allStringsInTrie(trieNode, prefix + character))
    }
    return strings
}


/**
 * Checks if provided string is fully in trie.
 */
export function isStringInTrie(
    trie: Trie,
    string: string
): boolean {
    let maybeTrie
    for(const character of string) {
        maybeTrie = trie.characters[character]
        if(maybeTrie === undefined) {
            return false
        }
    }
    return maybeTrie !== undefined && maybeTrie.isEnd === true
}


/**
 * Enumerates all prefixes of string taken from trie.
 * Shortest prefix first.
 */
export function longestPrefixesInTrie(
    /**
     * Prefixes trie
     */
    prefixes: Trie,
    /**
     * string for which match prefixes
     */
    string: string,
): string[] {
    let matchingPrefix = ''
    const matchingPrefixes: string[] = []
    if(prefixes.isEnd) {
        matchingPrefixes.push(matchingPrefix)
    }

    for (const character of [...string]) {
        if(!prefixes.characters[character]) {
            break
        }

        matchingPrefix += character
        prefixes = prefixes.characters[character]

        if(prefixes.isEnd) {
            matchingPrefixes.push(matchingPrefix)
        }
    }

    return matchingPrefixes
}


/**
 * Returns longest prefix matchin given string or `undefined`
 * if no match.
 */
export function longestPrefixInTrie(
    /**
     * Prefixes in trie.
     */
    prefixes: Trie,
    /**
     * String for which match prefixes.
     */
    string: string,
): string | undefined {
    const longestPrefixes = longestPrefixesInTrie(prefixes, string)
    return longestPrefixes[longestPrefixes.length - 1]
}


