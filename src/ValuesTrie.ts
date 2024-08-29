
/**
 * Trie - multi-child tree storing in each node one character
 * and if characters build key node also have value.
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
 * 
 * KVsTrie for every end node have associated key and value.
 */
export type ValuesTrie<T> = {
    /**
     * Trie node children
     */
    characters: {[character in string]: ValuesTrie<T>},
    /**
     * `false` or `undefined` if this trie node does not match any key.
     */
    isEnd?: false,
    value?: undefined,
} | {
    /**
     * `true` if this trie node maches key.
     */
    isEnd: true,
    characters: {[character in string]: ValuesTrie<T>},
    /**
     * If {@link ValuesTrie.isEnd} is `true` then matched key value.
     */
    value: T,
}



/**
 * Creates empty trie.
 */
export function createEmptyValuesTrie<T>(): ValuesTrie<T> {
    const trie: ValuesTrie<T> = {characters: {}}
    return trie
}



/**
 * Mutates trie by adding key
 */
export function addValueToValuesTrie<T = void>(
    /**
     * trie to mutate
     */
    trie: ValuesTrie<T>,
    /**
     * string to add
     */
    key: Iterable<string>,
    value: T,
): ValuesTrie<T> {
    let node = trie
    for (const character of key) {
        if(!node.characters[character]) {
            node.characters[character] = {characters: {}}
        }
        node = node.characters[character]
    }
    node.isEnd = true
    node.value = value
    return trie
}



/**
 * Enumerates all {key, value} in trie.
 */
export function allKVsInValuesTrie<T>(
    /**
     * Trie to inspect
     */
    trie: ValuesTrie<T>,
    /**
     * Prefix to add to all keys
     */
    prefix?: string
): {key: string, value: T}[] {

    prefix ??= ''
    const kvs: {key: string, value: T}[] = []

    if(trie.isEnd) {
        kvs.push({key: prefix, value: trie.value})
    }

    for (const [character, trieNode] of Object.entries(trie.characters)) {
        kvs.push(...allKVsInValuesTrie(trieNode, prefix + character))
    }

    return kvs
}

/**
 * Enumerates all values in trie.
 */
export function allValuesInValuesTrie<T>(
    /**
     * Trie to inspect
     */
    trie: ValuesTrie<T>,
): T[] {

    const vs: T[] = []

    if(trie.isEnd) {
        vs.push(trie.value)
    }

    for (const [_, trieNode] of Object.entries(trie.characters)) {
        vs.push(...allValuesInValuesTrie(trieNode))
    }

    return vs
}


/**
 * Checks if provided string is fully in trie.
 */
export function isKeyInValuesTrie<T>(
    trie: ValuesTrie<T>,
    key: Iterable<string>
): boolean {
    let maybeTrie: ValuesTrie<T> | undefined = trie
    for(const character of key) {
        maybeTrie = trie.characters[character]
        if(maybeTrie === undefined) {
            return false
        }
    }
    return maybeTrie.isEnd === true
}


/**
 * Matches key to trie. If key matched value associated
 * with key is returned, otherwise `undefined` is returned.
 */
export function tryGetValueFromValuesTrie<T>(
    trie: ValuesTrie<T>,
    key: Iterable<string>
): T | undefined {
    let maybeTrie: ValuesTrie<T> | undefined = trie
    for(const character of key) {
        maybeTrie = trie.characters[character]
        if(maybeTrie === undefined) {
            return undefined
        }
    }
    if(maybeTrie.isEnd !== true) {
        return undefined
    }
    return maybeTrie.value
}



/**
 * Matches all prefixes in trie to provided string.
 * Returns matching prefixes values sorted in order
 * from shortest prefix to longest.
 */
export function valuesOfAllValuesTriePrefixesMatchingString<T>(
    /**
     * Prefixes trie
     */
    prefixes: ValuesTrie<T>,
    /**
     * string for which match prefixes
     */
    string: Iterable<string>,
): T[] {
    const matchingPrefixesValues: T[] = []

    if(prefixes.isEnd) {
        matchingPrefixesValues.push(prefixes.value)
    }

    for (const character of string) {
        if(!prefixes.characters[character]) {
            break
        }

        prefixes = prefixes.characters[character]

        if(prefixes.isEnd) {
            matchingPrefixesValues.push(prefixes.value)
        }
    }

    return matchingPrefixesValues
}


/**
 * Returns longest prefix (of prefixes trie) value matchin given string or `undefined`
 * if no match.
 */
export function valueOfBestValuesTriePrefixMatchingString<T>(
    /**
     * Prefixes in trie.
     */
    prefixes: ValuesTrie<T>,
    /**
     * String for which match prefixes.
     */
    string: Iterable<string>,
): T | undefined {

    let bestPrefix: T | undefined = undefined

    if(prefixes.isEnd) {
        bestPrefix = prefixes.value
    }

    for (const character of string) {
        if(!prefixes.characters[character]) {
            break
        }

        prefixes = prefixes.characters[character]

        if(prefixes.isEnd) {
            bestPrefix = prefixes.value
        }
    }

    return bestPrefix
}


