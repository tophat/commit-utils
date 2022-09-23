export const isNoteOfTypeWithScope = (title: string, type: string) =>
    title.startsWith(`${type}(`)

export const isNoteOfType = (title: string, type: string) =>
    title === type || isNoteOfTypeWithScope(title, type)

export const getNoteScope = (title: string): string => {
    const match = title.match(/\((.*)\)/)

    if (match) {
        const [, scope] = match
        return scope
    }

    return ''
}

export const BREAKING_CHANGE = 'BREAKING CHANGE'

export const EMPTY_SCOPE = '*'
