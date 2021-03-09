const isNoteOfTypeWithScope = (title, type) => title.startsWith(`${type}(`)

const isNoteOfType = (title, type) =>
    title === type || isNoteOfTypeWithScope(title, type)

const getNoteScope = (title) => {
    const match = title.match(/\((.*)\)/)

    if (match) {
        const [, scope] = match
        return scope
    }

    return ''
}

const BREAKING_CHANGE = 'BREAKING CHANGE'

const EMPTY_SCOPE = '*'

module.exports = {
    BREAKING_CHANGE,
    EMPTY_SCOPE,
    getNoteScope,
    isNoteOfType,
    isNoteOfTypeWithScope,
}
