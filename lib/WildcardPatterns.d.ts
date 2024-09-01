/**
 * Wildcard (`*`) patterns container with efficient (Trie) matching alghoritm.
 */
export declare class WildcardPatterns {
    #private;
    /**
     * Creates exact and wildcard (containing one `*`) patterns container.
     */
    constructor(
    /**
     * Patterns to add to container. Pattern may have at most one
     * wildcard (`*`) character.
     */
    patterns?: string[]);
    /**
     * Adds pattern to container. Pattern may have at most one
     * wildcard (`*`) character.
     */
    add(
    /**
     * Pattern to add to container.
     */
    pattern: string): void;
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
    string: string): string | undefined;
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
    string: string): {
        pattern: string;
        prefix: string;
        postfix: string;
        matched: string;
    } | undefined;
}
