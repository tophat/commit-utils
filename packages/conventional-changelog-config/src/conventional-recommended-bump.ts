import { FEATURE_TYPES, PATCH_TYPES, STRATEGY } from './commitTypes'
import { BREAKING_CHANGE } from './helpers'
import parserOpts from './parser-opts'

import type { Commit } from 'conventional-commits-parser'

export type BumpOptions = {
    parserOpts: unknown
    whatBump: (commits: Commit[]) => { level: number | null; reason: string }
}

const recommendedBumpOpts: BumpOptions = {
    parserOpts,

    whatBump: (commits: Commit[]) => {
        const titlePattern = new RegExp('^(\\w+)(\\([^)]+\\))?$', 'g')
        const level = commits.reduce((level, commit) => {
            let intermediateLevel = level

            if (commit.header?.toUpperCase().startsWith(BREAKING_CHANGE)) {
                return STRATEGY.MAJOR
            }

            for (const note of commit.notes) {
                if (note.title.toUpperCase().startsWith(BREAKING_CHANGE)) {
                    return STRATEGY.MAJOR
                }

                const matches = [...note.title.matchAll(titlePattern)]?.[0]
                const type = matches?.[1]

                if (FEATURE_TYPES.includes(type)) {
                    intermediateLevel = Math.min(
                        intermediateLevel,
                        STRATEGY.MINOR,
                    )
                    continue
                }
                if (PATCH_TYPES.includes(type)) {
                    intermediateLevel = Math.min(
                        intermediateLevel,
                        STRATEGY.PATCH,
                    )
                    continue
                }
            }

            const commitType = commit.type
            if (commitType) {
                if (FEATURE_TYPES.includes(commitType)) {
                    intermediateLevel = Math.min(
                        intermediateLevel,
                        STRATEGY.MINOR,
                    )
                }
                if (PATCH_TYPES.includes(commitType)) {
                    intermediateLevel = Math.min(
                        intermediateLevel,
                        STRATEGY.PATCH,
                    )
                }
            }

            if (commit.revert) {
                intermediateLevel = Math.min(intermediateLevel, STRATEGY.PATCH)
            }

            return intermediateLevel
        }, STRATEGY.NONE)

        return {
            level: level === STRATEGY.NONE ? null : level,
            reason: '',
        }
    },
}

export default recommendedBumpOpts
