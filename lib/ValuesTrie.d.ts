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
    characters: {
        [character in string]: ValuesTrie<T>;
    };
    /**
     * `false` or `undefined` if this trie node does not match any key.
     */
    isEnd?: false;
    value?: undefined;
} | {
    /**
     * `true` if this trie node maches key.
     */
    isEnd: true;
    characters: {
        [character in string]: ValuesTrie<T>;
    };
    /**
     * If {@link ValuesTrie.isEnd} is `true` then matched key value.
     */
    value: T;
};
/**
 * Creates empty trie.
 */
export declare function createEmptyValuesTrie<T>(): ValuesTrie<T>;
/**
 * Mutates trie by adding key
 */
export declare function addValueToValuesTrie<T = void>(
/**
 * trie to mutate
 */
trie: ValuesTrie<T>, 
/**
 * string to add
 */
key: Iterable<string>, value: T): ValuesTrie<T>;
/**
 * Enumerates all {key, value} in trie.
 */
export declare function allKVsInValuesTrie<T>(
/**
 * Trie to inspect
 */
trie: ValuesTrie<T>, 
/**
 * Prefix to add to all keys
 */
prefix?: string): {
    key: string;
    value: T;
}[];
/**
 * Enumerates all values in trie.
 */
export declare function allValuesInValuesTrie<T>(
/**
 * Trie to inspect
 */
trie: ValuesTrie<T>): T[];
/**
 * Checks if provided string is fully in trie.
 */
export declare function isKeyInValuesTrie<T>(trie: ValuesTrie<T>, key: Iterable<string>): boolean;
/**
 * Matches key to trie. If key matched value associated
 * with key is returned, otherwise `undefined` is returned.
 */
export declare function tryGetValueFromValuesTrie<T>(trie: ValuesTrie<T>, key: Iterable<string>): T | undefined;
/**
 * Matches all prefixes in trie to provided string.
 * Returns matching prefixes values sorted in order
 * from shortest prefix to longest.
 */
export declare function valuesOfAllValuesTriePrefixesMatchingString<T>(
/**
 * Prefixes trie
 */
prefixes: ValuesTrie<T>, 
/**
 * string for which match prefixes
 */
string: Iterable<string>): T[];
/**
 * Returns longest prefix (of prefixes trie) value matchin given string or `undefined`
 * if no match.
 */
export declare function valueOfBestValuesTriePrefixMatchingString<T>(
/**
 * Prefixes in trie.
 */
prefixes: ValuesTrie<T>, 
/**
 * String for which match prefixes.
 */
string: Iterable<string>): T | undefined;
