/**
 * Directory patterns (ending with `/`) and exact patterns
 * container with efficient (Trie) matching alghoritm.
 */
export declare class DirPatterns {
    #private;
    /**
     * Creates exact and directory (ending with `/`) patterns container.
     */
    constructor(
    /**
     * Patterns to add to container. Pattern may end with `/`,
     * those will be threated as prefixes, other as exact.
     */
    patterns?: string[]);
    /**
     * Adds pattern to container. Pattern may end with
     * `/` character and is then matched as prefix. Others
     * are matched as exact.
     */
    add(
    /**
     * Pattern to add to container.
     */
    pattern: string): void;
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
    string: string): string | undefined;
}
