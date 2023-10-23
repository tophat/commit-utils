import fs from 'fs'
import path from 'path'

import compareFunc from 'compare-func'

import { changelogCommitTypes, commitTypes } from './commitTypes'
import {
    BREAKING_CHANGE,
    EMPTY_SCOPE,
    getNoteScope,
    isNoteOfType,
    isNoteOfTypeWithScope,
} from './helpers'
import parserOpts from './parser-opts'

import type { Context, Options } from 'conventional-changelog-writer'
import type { Commit } from 'conventional-commits-parser'

const shouldNoteGoInChangelog = (title: string) =>
    title === BREAKING_CHANGE ||
    title === 'Revert' ||
    changelogCommitTypes.some(({ prefix }) => isNoteOfType(title, prefix))

async function generateConfig(): Promise<Options> {
    const template = await fs.promises.readFile(
        path.join(__dirname, '../templates/template.hbs'),
        'utf-8',
    )
    const header = await fs.promises.readFile(
        path.join(__dirname, '../templates/header.hbs'),
        'utf-8',
    )
    const footer = await fs.promises.readFile(
        path.join(__dirname, '../templates/footer.hbs'),
        'utf-8',
    )

    return {
        transform: (commit: Commit, context: Context): Commit | false => {
            let discard = true
            const issues: string[] = []

            commit.notes = commit.notes.filter(({ title }) =>
                shouldNoteGoInChangelog(title),
            )

            if (commit.notes.length > 0) {
                discard = false
            }

            commit.notes.forEach((note) => {
                if (note.title === BREAKING_CHANGE) {
                    note.title = 'Breaking Changes'
                } else if (note.title === 'Revert') {
                    note.title = 'Reverts'
                    if (parserOpts.revertPattern) {
                        const match = note.text
                            .replace(/^"|"$/g, '')
                            .match(parserOpts.revertPattern)
                        if (match) {
                            const [, , header, hash] = match
                            note.text = header
                            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                            // @ts-expect-error it looks like revert hash should be on the commit, not the note?
                            note.revertHash = hash.substring(0, 7)
                        }
                    }
                } else {
                    for (const { prefix, groupTitle } of commitTypes) {
                        if (note.title === prefix) {
                            note.title = groupTitle
                            break
                        } else if (isNoteOfTypeWithScope(note.title, prefix)) {
                            const scope = getNoteScope(note.title)
                            if (scope && scope !== EMPTY_SCOPE) {
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-expect-error there's no scope on note
                                note.scope = scope
                            }
                            note.title = groupTitle
                            break
                        }
                    }
                }
            })

            const commitType = changelogCommitTypes.find(
                ({ prefix }) => commit.type && commit.type === prefix,
            )

            if (commitType) {
                commit.notes.push({
                    title: commitType.groupTitle,
                    text: commit.subject ?? '',
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error There's no scope on Note?
                    scope: commit.scope,
                })
                discard = false
            } else if (commit.revert) {
                commit.notes.push({
                    title: 'Reverts',
                    text: commit.revert.header ?? '',
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error There's no revertHash on Note?
                    revertHash: commit.revert.hash.substring(0, 7),
                })
                discard = false
            }

            if (discard) {
                return false
            }

            if (commit.scope === EMPTY_SCOPE) {
                commit.scope = ''
            }

            if (typeof commit.hash === 'string') {
                commit.hash = commit.hash.substring(0, 7)
            }

            if (typeof commit.subject === 'string') {
                let url = context.repository
                    ? `${context.host}/${context.owner}/${context.repository}`
                    : context.repoUrl
                if (url) {
                    url = `${url}/issues/`
                    // Issue URLs.
                    commit.subject = commit.subject.replace(
                        /#([0-9]+)/g,
                        (_, issue) => {
                            issues.push(issue)
                            return `[#${issue}](${url}${issue})`
                        },
                    )
                }
                if (context.host) {
                    // User URLs.
                    commit.subject = commit.subject.replace(
                        /\B@([a-z0-9](?:-?[a-z0-9]){0,38})/g,
                        `[@$1](${context.host}/$1)`,
                    )
                }
            }

            // remove references that already appear in the subject
            commit.references = commit.references.filter((reference) => {
                if (!issues.includes(reference.issue)) {
                    return true
                }

                return false
            })

            return commit
        },
        groupBy: 'type',
        commitGroupsSort: 'title',
        commitsSort: ['scope', 'subject'],
        noteGroupsSort: 'title',

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error Maybe we can drop the external package?
        notesSort: compareFunc,

        mainTemplate: template,
        headerPartial: header,
        commitPartial: undefined,
        footerPartial: footer,
    }
}

export default generateConfig()
