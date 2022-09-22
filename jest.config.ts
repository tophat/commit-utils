import type { Config } from 'jest'

const CI = process.env.CI === '1'
const ARTIFACT_DIR = process.env.ARTIFACT_DIR || 'artifacts'

const config: Config = {
    ...(CI && {
        reporters: [
            'default',
            [
                'jest-junit',
                {
                    suiteName: 'Jest Tests',
                    outputDirectory: `${ARTIFACT_DIR}/test_results/jest/`,
                    outputName: 'jest.junit.xml',
                },
            ],
        ],
        coverageReporters: ['lcov'],
        collectCoverage: true,
        coverageDirectory: `${ARTIFACT_DIR}/test_results/jest/`,
        collectCoverageFrom: [
            'packages/**/src/**/*.js',
            '!packages/**/src/**/*.test.js',
        ],
    }),
}

export default config
