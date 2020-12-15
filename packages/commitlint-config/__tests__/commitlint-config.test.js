'use strict'
const { rules } = require('../src')

describe('commitlint-config', () => {
    it('config matches snapshot', () => {
        expect(rules).toMatchSnapshot()
    })
})
