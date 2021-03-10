/* eslint-disable sort-keys, no-param-reassign */

const util = require('util')
const fs = require('fs')
const path = require('path')

const compareFunc = require('compare-func')

const parserOpts = require('./parser-opts')
const { commitTypes, changelogCommitTypes } = require('./commitTypes')
const {
    isNoteOfType,
    isNoteOfTypeWithScope,
    getNoteScope,
    BREAKING_CHANGE,
    EMPTY_SCOPE,
} = require('./helpers')

const readFile = util.promisify(fs.readFile)

module.exports = Promise.all([
    readFile(path.join(__dirname, './templates/template.hbs'), 'utf-8'),
    readFile(path.join(__dirname, './templates/header.hbs'), 'utf-8'),
    readFile(path.join(__dirname, './templates/footer.hbs'), 'utf-8'),
]).then(([template, header, footer]) => {
    const writerOpts = getWriterOpts()

    writerOpts.mainTemplate = template
    writerOpts.headerPartial = header
    writerOpts.commitPartial = null
    writerOpts.footerPartial = footer

    return writerOpts
})

/* context looks like
 *{"commit":"commit","issue":"issues","date":"2018-06-19","version":"4.0.0","host":"https://github.com","owner":"tophatmonocle","repository":"fe-versioning-sandbox","repoUrl":"https://github.com/tophatmonocle/fe-versioning-sandbox","packageData":{"name":"@thm/test-package-2","version":"4.0.0","description":"FE versioning test package 2","main":"index.js","author":{"name":"Top Hat Monocle Corp."},"license":"UNLICENSED","publishConfig":{"registry":"https://thm.jfrog.io/thm/api/npm/npm-local/"},"dependencies":{"@thm/test-package-1":"^4.0.0"},"readme":"ERROR: No README data found!","_id":"@thm/test-package-2@4.0.0","repository":{"url":"git+ssh://git@github.com/tophatmonocle/fe-versioning-sandbox.git"},"bugs":{"url":"https://github.com/tophatmonocle/fe-versioning-sandbox/issues"},"homepage":"https://github.com/tophatmonocle/fe-versioning-sandbox#readme"},"gitSemverTags":[],"linkReferences":true}
 */

const shouldNoteGoInChangelog = (title) =>
    title === BREAKING_CHANGE ||
    title === 'Revert' ||
    changelogCommitTypes.some(({ prefix }) => isNoteOfType(title, prefix))

function getWriterOpts() {
    return {
        transform: (commit, context) => {
            let discard = true
            const issues = []

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
                    const match = note.text
                        .replace(/^"|"$/g, '')
                        .match(parserOpts.revertPattern)
                    if (match) {
                        const [, , header, hash] = match
                        note.text = header
                        note.revertHash = hash.substring(0, 7)
                    }
                } else {
                    for (const { prefix, groupTitle } of commitTypes) {
                        if (note.title === prefix) {
                            note.title = groupTitle
                            break
                        } else if (isNoteOfTypeWithScope(note.title, prefix)) {
                            const scope = getNoteScope(note.title)
                            if (scope && scope !== EMPTY_SCOPE) {
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
                    text: commit.subject,
                    scope: commit.scope,
                })
                discard = false
            } else if (commit.revert) {
                commit.notes.push({
                    title: 'Reverts',
                    text: commit.revert.header,
                    revertHash: commit.revert.hash.substring(0, 7),
                })
                discard = false
            }

            if (discard) {
                return
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
                if (issues.indexOf(reference.issue) === -1) {
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
        notesSort: compareFunc,
    }
}
