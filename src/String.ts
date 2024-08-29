

export function reverseString(string: string): string {
    return [...string].reverse().join('')
}


export function* reverse(string: string): Generator<string> {
    for(let i = string.length - 1; i >= 0; i--) {
        yield string[i]!
    }
}

