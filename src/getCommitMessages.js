import read from '@commitlint/read'

const getCommitMessages = async () =>
    read({ from: 'origin/master', to: 'HEAD' })

export default getCommitMessages
