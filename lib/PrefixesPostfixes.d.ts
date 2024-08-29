/**
 * Pattern: heaving prefix and postfix to match.
 */
export type PrefixPostfix = {
    /**
     * Pattern prefix to match.
     */
    prefix: string;
    /**
     * Pattern postfix to match.
     */
    postfix: string;
};
/**
 * Prefixes/Postfixes container with efficient (Trie) matching alghoritm.
 */
export declare class PrefixesPostfixes {
    #private;
    /**
     * Creates prefix/postfix patterns container.
     */
    constructor(
    /**
     * Patterns to add to container.
     */
    patterns?: PrefixPostfix[]);
    /**
     * Adds pattern (prefix/postfix) to container.
     */
    add(
    /**
     * Pattern to add to container.
     */
    pattern: PrefixPostfix): void;
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
    string: string): undefined | PrefixPostfix;
}
