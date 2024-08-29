/**
 * Stores string prefixes and allows effitient
 * prefixes matching to arbitrary string.
 */
export declare class MatchPrefixes {
    #private;
    /**
     * Creates effitient store for prefixes and
     * prefixes matching operations.
     */
    constructor(
    /**
     * Prefixes to store.
     */
    prefixes: string[]);
    /**
     * Returns all prefixes matching given string,
     * sorted from shortest to longest.
     */
    allPrefixesOf(string: string): string[];
    /**
     * Returns longest matching prefix or `undefined` if none found.
     */
    bestPrefixOf(string: string): string | undefined;
    /**
     * Returns stored prefixes as provided in constructor.
     */
    allPrefixes(): string[];
}
