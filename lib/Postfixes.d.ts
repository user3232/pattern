/**
 * Postfixes container with efficient (Trie) matching alghoritm.
 */
export declare class Postfixes {
    #private;
    /**
     * Creates postfixes container.
     */
    constructor(
    /**
     * Postfixes to add to container.
     */
    postfixes?: string[]);
    /**
     * Adds postfix to container.
     */
    add(
    /**
     * Postfix to add to container.
     */
    postfix: string): void;
    /**
     * Returns all postfixes matching given string, from shortest to longest.
     */
    matchAllTo(
    /**
     * String to match postfixes to.
     */
    string: string): string[];
    /**
     * Returns longest postfix matching given string.
     */
    matchBestTo(
    /**
     * String to match postfixes to.
     */
    string: string): string | undefined;
}
