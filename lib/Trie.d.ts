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
    characters: {
        [character in string]: Trie;
    };
    /**
     * `true` if this trie node maches end of string in trie.
     */
    isEnd?: true;
};
/**
 * Creates trie containing strings.
 */
export declare function createTrie(
/**
 * strings to put in trie
 */
strings: string[]): Trie;
/**
 * Mutates trie by adding string
 */
export declare function addStringToTrie(
/**
 * trie to mutate
 */
trie: Trie, 
/**
 * string to add
 */
string: string): Trie;
/**
 * Enumerates all strings in trie.
 */
export declare function allStringsInTrie(
/**
 * Trie to inspect
 */
trie: Trie, 
/**
 * prefix to add to all strings in trie
 */
prefix?: string): string[];
/**
 * Enumerates all prefixes of string taken from trie.
 * Shortest prefix first.
 */
export declare function longestPrefixesInTrie(
/**
 * Prefixes trie
 */
prefixes: Trie, 
/**
 * string for which match prefixes
 */
string: string): string[];
/**
 * Returns longest prefix matchin given string or `undefined`
 * if no match.
 */
export declare function longestPrefixInTrie(
/**
 * Prefixes in trie.
 */
prefixes: Trie, 
/**
 * String for which match prefixes.
 */
string: string): string | undefined;
