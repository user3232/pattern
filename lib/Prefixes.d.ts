/**
 * Prefixes container with efficient (Trie) matching alghoritm.
 */
export declare class Prefixes {
    #private;
    /**
     * Creates prefixes container.
     */
    constructor(
    /**
     * Prefixes to add to container.
     */
    prefixes?: string[]);
    /**
     * Adds prefix to container.
     */
    add(
    /**
     * Prefix to add to container.
     */
    prefix: string): void;
    /**
     * Returns all prefixes matching given string, from shortest to longest.
     */
    matchAllTo(
    /**
     * String to match prefixes to.
     */
    string: string): string[];
    /**
     * Returns longest prefix matching given string.
     */
    matchBestTo(
    /**
     * String to match prefixes to.
     */
    string: string): string | undefined;
}
