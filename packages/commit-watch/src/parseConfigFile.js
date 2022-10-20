import path from 'path'

export const parseConfigFile = configFileRelativePath => {
    const absolutePath = path.resolve(configFileRelativePath)
    return require(require.resolve(absolutePath))
}
